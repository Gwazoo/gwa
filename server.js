'use strict';
var Express = require('express'),
	Session = require('express-session'),
	BodyParser = require('body-parser'),
	Passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	Connect = require('connect'),
	Api = require('./server/controls/apiControl'),
	R = require('rethinkdb');

var Thinky = require('./server/util/thinky'),
	Api = require('./server/controls/apiControl'),
	User = require('./server/controls/userControl');

var app = Express();

// MIDDLEWARE ============================================
app.use(BodyParser.urlencoded({extended:true}));

app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));
app.use(Passport.initialize());
app.use(Passport.session());
// app.use('/api/authorize',Api.createConnection);
app.get('/api', Api.isAuthed, Api.findAll);  //debug
app.post('/api/create', Api.isAuthed, Api.create);
app.get('/api/read', Api.isAuthed, Api.read);
app.delete('/api/delete', Api.isAuthed, Api.delete);
// app.post('/api/authorize', Api.authorize);
// app.use('/api/authorize', Api.closeConnection);

// app.use(BodyParser.json());

// AUTHENTICATION ========================================
Passport.use(new  LocalStrategy(
	function(username, password, cb) {
		Api.authorize(username, password, cb);
	}));
Passport.serializeUser(function(user, done) {
	done(null, user.id);
});
Passport.deserializeUser(function(id, done) {
	Api.read(id, done);
});

// ENDPOINTS =============================================
// AUTHENTICATION
app.post('/api/auth', Passport.authenticate('local'), function(req, res) {
	return res.status(200).send(JSON.stringify({status: 'User Authenticated!'}));
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

app.use('/', Express.static(__dirname + '/public'));
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + "/public"});
});

// CONNECTIONS ===========================================
var port = process.env.PORT || 1337;
app.listen(port);
console.log('listening on ' + port + '!');

