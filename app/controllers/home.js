var _ = require('underscore');

var homeController = function (server, io) {
	
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

	server.get("/log-out", function (req, res) {
		global.users = _.without(global.users, req.session.user);
		req.session.destroy();
		res.redirect('/');
	});

	server.post("/log-in", function (req, res) {
		req.session.user = req.body.username;
		global.users.push(req.session.user);
		io.sockets.emit("log-in", {username: req.session.user});
		res.redirect('/app');
	});
};

module.exports = homeController;