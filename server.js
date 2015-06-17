var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	serveStatic = require('serve-static'),
	passport = require('passport'),
	swig    = require('swig');

var server = module.exports = express();

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

server.use(passport.initialize());
server.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

global.users = [];

//controllers
var homeController = require('./app/controllers/home');
var appController = require('./app/controllers/app');

homeController(server, io);
appController(server, io);

//connections
var twitterConnection = require('./app/connections/twitter');

twitterConnection(server);

//socket io test connection
io.on('connection', function (socket) {
	socket.on('hello?', function (data) {
		socket.emit('saludo', { message: 'hello, estamos en contacto!' });
	});
});

if (!module.parent) {
	serverIO.listen(3000);
}