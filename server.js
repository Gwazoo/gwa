'use strict';
var Express        = require('express');
var	Passport       = require('passport');
var	LocalStrategy  = require('passport-local').Strategy;
var	Connect        = require('connect');
var	Api            = require('./server/controls/apiControl');
var	R              = require('rethinkdb');
var Thinky         = require('./server/util/thinky');
var	Api            = require('./server/controls/apiControl');
var	User           = require('./server/controls/userControl');
var Cart           = require('./server/routes/cart');
var Account        = require('./server/routes/account');
var User        = require('./server/routes/user');

var app = Express();

// Bootstrap app and passport config
require('./server/util/express.js')(app, Passport);
require('./server/util/passport.js')(Passport, LocalStrategy);

// ROUTERS ==============================================
app.use('/api/user', User);  // Router at PATH ./server/routes/user.js
app.use('/api/cart', Cart);  // Router at PATH ./server/routes/cart.js
app.use('/account', Account);  // Router at PATH ./server/routes/account.js

// app.post('/api/register', User.create);
// app.put('/api/profile/:id', isAuthed, userControl.profile);
// app.delete('/api/profile/:id', isAuthed, userControl.profile);

app.get('/api/category/:slug'/*, categoryControl*/);
app.get('/api/product/:sku'/*, productControl*/);

// VENDOR ACCESS
// app.post('/api/category/:slug', isAuthed, categoryControl);
// app.post('/api/product/:sku', isAuthed, productControl);

// CATCH-ALL REDIRECT ====================================
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + "/public"});
});

// CONNECTIONS ===========================================
var port = process.env.PORT || 1337;
app.listen(port);
console.log('listening on ' + port + '!');

