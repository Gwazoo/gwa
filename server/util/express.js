var CookieParser   = require('cookie-parser');
var	BodyParser     = require('body-parser');
var Express        = require('express');
var Session        = require('express-session');
var	Passport       = require('passport');
var Root           = require('./config');

module.exports = function(app, Passport){

	// MIDDLEWARE ============================================
	app.use(CookieParser());
	app.use(BodyParser.json());
	app.use(BodyParser.urlencoded({extended:true}));
	app.use('/', Express.static(Root + '/public'));

	// // AUTHENTICATION ========================================
	app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));
	app.use(Passport.initialize());
	app.use(Passport.session()); 
};