var passport        = require('passport'),
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy,
	User            = require('../models/user');;

var twitterConnection = function (server) {
	passport.use(new TwitterStrategy({
		consumerKey: "xxxxxx",
	    consumerSecret: "yyyyyy",
	    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"	
	}, function (token, tokenSecret, profile, done) {
		
		var user = new User({
			username : profile.username,
			twitter  : profile //se puede refinar
		});

		user.save(function (err) {
			if (err) {
				done(err, null);
				return;
			}

			done(null, profile);
		});
	}));
	
	server.get('/auth/twitter', passport.authenticate('twitter'));

	server.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/?error=algo-fallo'}), function (req, res) {
		res.redirect('/app');
	});
};

module.exports = twitterConnection;