'use strict';
var Express = require('express'),
	Session = require('express-session'),
	BodyParser = require('body-parser'),
	Passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Bcrypt = require('bcrypt-nodejs'),
	Connect = require('connect');

var Thinky = require('./server/util/thinky'),
	Api = require('./server/controls/apiControl'),
	User = require('./server/controls/userControl');

// var User = {

// }
var app = Express();

var isAuthed = function(req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
};

// MIDDLEWARE ============================================
app.get('/api/test'/*, Api.getAll*/);

app.use('/', Express.static(__dirname + '/public'));
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + "/public"});
});

app.use(BodyParser.json());
app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));

app.use(Passport.initialize());
app.use(Passport.session());

// AUTHENTICATION ========================================
Passport.use(new  LocalStrategy(
	function(username, password, cb) {
		R.users.findByUsername(username, function(err, user) {
			if(err) {
				return cb(err);
			}
			if(!user) {
				return cb(null, false);
			}
			if(user.password != password) {
				return cb(null, user);
			}
			return cb(null, user);
		});
	}));
Passport.serializeUser(function(user, done) {
	done(null, user.id);
});
Passport.deserializeUser(function(id, done) {
	R.users.findById(id, function(err, user) {
		if(err) {
			return done(err);
		}
		done(null, user);
	});
});

// ENDPOINTS =============================================
// AUTHENTICATION
app.post('/api/auth', Passport.authenticate('local'), function(req, res) {
	return res.status(200).end();
});

// ALL USERS
app.post('/api/register', User.create);

// app.put('/api/profile/:id', isAuthed, userControl.profile);
// app.delete('/api/profile/:id', isAuthed, userControl.profile);

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
// app.post('/api/category/:slug', isAuthed, categoryControl);
// app.post('/api/product/:sku', isAuthed, productControl);


// CONNECTIONS ===========================================
var port = process.env.PORT || 1337;
app.listen(port);
console.log('listening on ' + port + '!');

