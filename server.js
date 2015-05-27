var express = require('express');
var server = express();

var messages = [];

server.get("/", function (req, res) {
	res.send("Hello World!");
});

server.get("/messages", function (req, res) {
	res.send(messages);
});

server.get("/messages/:message", function (req, res) {
	messages.push(req.params.message);
	res.send("tu mensaje es: " + req.params.message);
});

server.listen(3000);