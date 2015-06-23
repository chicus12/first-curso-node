var passport        = require('passport'),
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy;

var twitterConnection = function (server) {
	passport.use(new TwitterStrategy({
		consumerKey: "xxxxx",
	    consumerSecret: "yyyy",
	    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"	
	}, function (token, tokenSecret, profile, done) {
		done(null, profile);
	}));
	
	server.get('/auth/twitter', passport.authenticate('twitter'));

	server.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/?error=algo-fallo'}), function (req, res) {
		res.redirect('/app');
	});
};

module.exports = twitterConnection;