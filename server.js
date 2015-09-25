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


// MIDDLEWARE
app.use(Rewrite);
// app.use(server.router);
app.use('/', Express.static(__dirname + '/public'));

app.get('/#/*', Rewrite.rewrite('/*'));

// app.use(BodyParser.json());
// app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));
// app.use(passport.initialize());
// app.use(passport.session());


// AUTHENTICATION


// ENDPOINTS


// CONNECTIONS