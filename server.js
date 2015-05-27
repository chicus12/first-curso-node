var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
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
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get("/", function (req, res) {
	res.render("home");
});

server.get("/app", function (req, res) {
	res.render("app", {user: req.session.user});
});

server.post("/log-in", function (req, res) {
	req.session.user = req.body.username;
	res.redirect('/app');
});

server.listen(3000);