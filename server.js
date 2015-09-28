'use strict';
var Express = require('express'),
	Session = require('express-session'),
	BodyParser = require('body-parser'),
	Passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	// Bcrypt = require('bcrypt'),
	Connect = require('connect'),
	Rewrite = require('express-rewrite'),
	Q = require('q');//,
	// R = require('rethink');

// var userControl = require('./server/controls/userControl'),
// 	productControl = require('./server/controls/productControl'),
// 	categoryControl = require('./server/controls/categoryControl');

var app = Express();

var isAuthed = function(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
};


// MIDDLEWARE ============================================
app.use(Express.static(__dirname + '/public'));
app.use(BodyParser.json());
app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));

app.use(Passport.initialize());
app.use(Passport.session());

app.use(function(req, res, next){
	var err = req.session.error,
		msg = req.session.notice,
		success = req.session.success;

	delete req.session.error;
	delete req.session.success;
	delete req.session.notice;

	if (err) res.locals.error = err;
	if (msg) res.locals.notice = msg;
	if (success) res.locals.success = success;

	next();
});


// AUTHENTICATION ========================================
Passport.use(new  LocalStrategy({
	usernameField: 'userName',
	emailField: 'email',
	passwordField: 'password'
}, function(email, password, done) {
	User.findOne({ email: email }).exec().then(function(user) {
		if(!user) {
			return done(null, false);
		}
		user.comparePassword(password).then(function(isMatch) {
			if(!isMatch) {
				return done(null, false);
			}
			return done(null, user);
		});
	});
}));
Passport.serializeUser(function(user, done) {
	done(null, user);
});
Passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


// ENDPOINTS =============================================
// AUTHENTICATION
app.post('/api/auth', Passport.authenticate('local'), function(req, res) {
	return res.status(200).end();
});
app.post('/api/register', function(req, res) {
	var newUser = new User(req.body);
	newUser.save(function(err, user) {
		if(err) {
			return res.status(500).end();
		}
		return res.json(user);
	});
});

// app.get('/api/profile', userControl.profile);

app.get('/api/currentUser', function(req, res) {
	res.status(200).json(req.user);
});

app.get('/api/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// VENDOR ACCESS


// MEMBER ACCESS



// CONNECTIONS ===========================================
var port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on ' + port + '!');

