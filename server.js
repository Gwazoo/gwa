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


// MIDDLEWARE ============================================
app.use(Express.static(__dirname + '/public'));
app.use(BodyParser.json());
app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));

app.use(Passport.initialize());
app.use(Passport.session());


// AUTHENTICATION ========================================
Passport.use(new  LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, function(username, password, done) {
	User.findOne({ email: username }).exec().then(function(user) {
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


