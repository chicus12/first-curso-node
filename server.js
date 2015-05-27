var express = require('express'),
	_       = require('underscore');

var server = express();

var messages = [];

server.get("/", function (req, res) {
	res.send("Hello World!");
});

server.get("/messages", function (req, res) {
	if (req.query.find && messages.length) {
		var result = _.filter(messages, function(message){ return message == req.query.find; });
		if (!result.length) {
			res.send("No se encontro ningun mensaje " + req.query.find + " guardado.");
		} else {
			res.send(result);
		}
	} else {
		var responseClient = messages.length ? messages : "Aun no has ingresado ningun mensaje";
		res.send(responseClient);
	}
});

server.get("/messages/:message", function (req, res) {
	messages.push(req.params.message);
	res.send("tu mensaje es: " + req.params.message);
});

server.listen(3000);