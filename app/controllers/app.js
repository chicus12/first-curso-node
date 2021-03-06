var User = require('../models/user'),
	Post = require('../models/post'),
	_    = require('underscore');

var appController = function (server, io) {
	
	var isntLoggedIn = function (req, res, next) {
		if (!req.session.passport.user) {
			res.redirect('/');
			return;
		}

		next();
	};

	var getUser = function (req, res, next) {
		
		var userReq = req.body.user || req.session.passport.user.username;
		
		User.findOne({username: userReq}, function (err, user) {
			if (err) {
				res.send(500, err);
				return;
			}
			req.user = user;

			next();
		});
	};

	server.get("/app", isntLoggedIn, function (req, res) {
		Post.find({})
		.populate('user')
		.exec(function (err, posts) {
			var postsAsJson = _.map(posts, function (post) {
				return post.toJSON();
			});

			res.render("app", {user: req.session.passport.user, clients: global.users, posts: postsAsJson});
		});
	});

	server.post("/api/posts", getUser, function (req, res) {
		
		var post = new Post({
			message: req.body.content,
			user: req.user
		});

		post.save(function (err) {
			if (err) {
				res.send(500, err)
			}

			res
				.status(200)
				.json({
					content : post.message,
					user : req.user.username 
				});
		});
	});

	server.post("/app/posts", isntLoggedIn, getUser, function (req, res) {
		
		var post = new Post({
			message: req.body.content,
			user: req.user
		});

		post.save(function (err) {
			if (err) {
				res.send(500, err)
			}

			io.sockets.emit("post", {
				message : post.message,
				user : req.user.toJSON() 
			});

			res.redirect('/app')
		});
	});
};

module.exports = appController;