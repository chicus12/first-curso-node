var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	serveStatic = require('serve-static'),
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

global.users = [];

var homeController = require('./app/controllers/home');

homeController(server, io);

var appController = require('./app/controllers/app');

appController(server);


io.on('connection', function (socket) {
	socket.on('hello?', function (data) {
		socket.emit('saludo', { message: 'hello, estamos en contacto!' });
	});
});

serverIO.listen(3000);