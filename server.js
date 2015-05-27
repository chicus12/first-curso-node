var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	serveStatic = require('serve-static'),
	_       = require('underscore'),
	swig    = require('swig');

var server = express();

var serverIO = require('http').Server(server);

var io = require('socket.io').listen(serverIO);

// Configuracion para renderear vistas
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', './app/views');

//Agregamos post, cookies y sessiones
server.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'bobcatZ7545' }));
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(serveStatic(__dirname + '/public'))

var users = [];

var isntLoggedIn = function (req, res, next) {
	if (!req.session.user) {
		res.redirect('/');
		return;
	}

	next();
};

var isLoggedIn = function (req, res, next) {
	if (req.session.user) {
		res.redirect('/app');
		return;
	}

	next();
};

server.get("/", isLoggedIn, function (req, res) {
	res.render("home");
});

server.get("/app", isntLoggedIn, function (req, res) {
	res.render("app", {user: req.session.user, clients: users});
});

server.get("/log-out", function (req, res) {
	users = _.without(users, req.session.user);
	req.session.destroy();
	res.redirect('/');
});

server.post("/log-in", function (req, res) {
	req.session.user = req.body.username;
	users.push(req.session.user);
	io.sockets.emit("log-in", {username: req.session.user});
	res.redirect('/app');

});

io.on('connection', function (socket) {
	socket.on('hello?', function (data) {
		socket.emit('saludo', { message: 'hello, estamos en contacto!' });
	});
});

serverIO.listen(3000);