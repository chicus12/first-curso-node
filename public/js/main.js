$(document).ready(function() {
	window.io = io.connect();

	io.on('connect', function(socket) {
		console.log("me conecte al cliente! El server me escuchara?");
		io.emit('hello?');
	});

	io.on('saludo', function (data) {
		console.log(data);
	});

	io.on('log-in', function (data) {
		$("#users").append('<li>' + data.username + '</li>')
	});

	io.on('log-out', function (data) {
		console.log(data);
	});

	io.on('post', function (data) {
		$("#posts").append('<p>' + data.user.username + ' - ' + data.message +'</p>')
	});
});