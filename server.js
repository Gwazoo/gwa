'use strict';
var Express        = require('express');
var Passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

var UserApi        = require('./server/routers/userApiRouter');
var CartApi        = require('./server/routers/cartApiRouter');
var CategoryApi    = require('./server/routers/categoryApiRouter');
var ProductApi     = require('./server/routers/productApiRouter');
var CheckoutApi    = require('./server/routers/checkoutApiRouter');

var Account        = require('./server/routers/accountRouter');
var Category       = require('./server/routers/categoryRouter');

var app = Express();

// Bootstrap app config
require('./server/util/express.js')(app, Passport);

// API ROUTERS ==========================================
app.use('/api/user', UserApi);  
app.use('/api/cart', CartApi);  
app.use('/api/category', CategoryApi); 
app.use('/api/product', ProductApi);  
app.use('/api/checkout', CheckoutApi);

// ROUTERS ==============================================
app.use('/account', Account);  
app.use('/category', Category);  

// CATCH-ALL REDIRECT ====================================
// app.all('/account', function(req, res) {
//     res.sendFile('index.html', { root: __dirname + '/public/templates/admin'});
// });
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + '/public'});
});

// Bootstrap passport config
require('./server/util/passport.js')(Passport, LocalStrategy);

// CONNECTIONS ===========================================
var port = process.env.PORT || 1337;
app.listen(port);
console.log('listening on ' + port + '!');

