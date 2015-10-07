var	Api = require('../controls/userControl');

module.exports = function(Passport, LocalStrategy){
	
	Passport.use(new  LocalStrategy(
		function(username, password, done) {
			Api.authorize(username, password, done);
		}));


	Passport.serializeUser(function(user, done) {
		done(null, user.username);
	});


	Passport.deserializeUser(function(username, done) {
		Api.read(username, done);
	});

};