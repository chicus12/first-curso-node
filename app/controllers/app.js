var appController = function (server, users) {
	
	var isntLoggedIn = function (req, res, next) {
		if (!req.session.passport.user) {
			res.redirect('/');
			return;
		}

		next();
	};

	server.get("/app", isntLoggedIn, function (req, res) {
		res.render("app", {user: req.session.passport.user, clients: global.users});
	});
};

module.exports = appController;