'use strict';
var Express = require('express'),
	Session = require('express-session'),
	BodyParser = require('body-parser'),
	Passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	// Bcrypt = require('bcrypt'),
	Connect = require('connect'),
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
app.use('/', Express.static(__dirname + '/public'));
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + "/public"});
});
app.use(BodyParser.json());
app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));

app.use(Passport.initialize());
app.use(Passport.session());


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

// ALL USERS
app.get('/api/currentUser', function(req, res) {
	res.status(200).json(req.user);
});

app.get('/api/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/api/category/:slug'/*, categoryControl*/);
app.get('/api/product/:sku'/*, productControl*/);

// VENDOR ACCESS
app.post('/api/category/:slug', isAuthed/*, categoryControl*/);
app.post('/api/product/:sku', isAuthed/*, productControl*/);

// MEMBER ACCESS
app.get('/api/profile', isAuthed/*, userControl.profile*/);
app.post('/api/updateUser', isAuthed/*, userControl.profile*/);


// CONNECTIONS ===========================================
var port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on ' + port + '!');

