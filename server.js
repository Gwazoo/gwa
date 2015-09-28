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


// MIDDLEWARE

app.use('/', Express.static(__dirname + '/public'));

app.all('/*', function(req, res, next) {
    res.sendFile('index.html', { root: __dirname + "/public"});
});

app.listen(8080);

// app.use(BodyParser.json());
// app.use(Session({secret: 'gwazooTeam', saveUninitialized: true, resave: true}));
// app.use(passport.initialize());
// app.use(passport.session());


// AUTHENTICATION


// ENDPOINTS


// CONNECTIONS