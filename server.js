'use strict';
var Express        = require('express');
var Session        = require('express-session');
var	BodyParser     = require('body-parser');
var	Passport       = require('passport');
var	LocalStrategy  = require('passport-local').Strategy;
var	Connect        = require('connect');
var	Api            = require('./server/controls/apiControl');
var	R              = require('rethinkdb');
var Thinky         = require('./server/util/thinky');
var	Api            = require('./server/controls/apiControl');
var	User           = require('./server/controls/userControl');

var app = Express();

// MIDDLEWARE ============================================
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended:true}));

// AUTHENTICATION ========================================
app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));
app.use(Passport.initialize());
app.use(Passport.session());
Passport.use(new  LocalStrategy(
	function(username, password, done) {
		Api.authorize(username, password, done);
	}));
Passport.serializeUser(function(user, done) {
	done(null, user.id);
});
Passport.deserializeUser(function(id, done) {
	Api.read(id, done);
});

// ENDPOINTS =============================================
// AUTHENTICATION
app.post('/api/auth', Passport.authenticate('local'), function(req, res) {  //signup url
	return res.status(200).json({status: 'User Authenticated!'});
});

// USER API
app.get('/api', /*Api.isAuthed,*/ Api.getAll);  //DEBUG METHOD ONLY
app.post('/api/create', Api.create);
app.get('/api/read', Api.isAuthed, Api.read);
app.delete('/api/delete', Api.isAuthed, Api.delete);
app.get('/api/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// app.post('/api/register', User.create);
// app.put('/api/profile/:id', isAuthed, userControl.profile);
// app.delete('/api/profile/:id', isAuthed, userControl.profile);

app.get('/api/currentUser', function(req, res) {
	res.status(200).json(req.user);
});

app.get('/api/category/:slug'/*, categoryControl*/);
app.get('/api/product/:sku'/*, productControl*/);

// VENDOR ACCESS
// app.post('/api/category/:slug', isAuthed, categoryControl);
// app.post('/api/product/:sku', isAuthed, productControl);

app.use('/', Express.static(__dirname + '/public'));
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + "/public"});
});

// CONNECTIONS ===========================================
var port = process.env.PORT || 1337;
app.listen(port);
console.log('listening on ' + port + '!');

