var express = require('express'),
	_       = require('underscore'),
	swig    = require('swig');

var server = express();

// Configuracion para renderear vistas
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', './app/views');

server.get("/", function (req, res) {
	res.render("home");
});

server.listen(3000);