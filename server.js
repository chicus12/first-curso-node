var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	_       = require('underscore'),
	swig    = require('swig');

var server = express();

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
	res.redirect('/app');
});

server.listen(3000);