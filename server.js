'use strict';
var Express        = require('express');
var	Passport       = require('passport');
var	LocalStrategy  = require('passport-local').Strategy;

var UserApi        = require('./server/routers/userApiRouter');
var CartApi        = require('./server/routers/cartApiRouter');
var CategoryApi    = require('./server/routers/categoryApiRouter');
var ProductApi     = require('./server/routers/productApiRouter');

var Account        = require('./server/routers/accountRouter');
var Category       = require('./server/routers/categoryRouter');

var app = Express();

// Bootstrap app and passport config
require('./server/util/express.js')(app, Passport);
require('./server/util/passport.js')(Passport, LocalStrategy);

// API ROUTERS ==========================================
app.use('/api/user', UserApi);  // Router at PATH ./server/routes/userApiRouter.js
app.use('/api/cart', CartApi);  // Router at PATH ./server/routes/cartApiRouter.js
app.use('/api/category', CategoryApi); // Router at PATH ./server/routes/categoryApiRouter.js
app.use('/api/product', ProductApi);  // Router at PATH ./server/routes/productApiRouter.js

// ROUTERS ==============================================
app.use('/account', Account);  // Router at PATH ./server/routes/accountRouter.js
app.use('/category', Category);  // Router at PATH ./server/routes/categoryRouter.js

// app.post('/api/register', User.create);
// app.put('/api/profile/:id', isAuthed, userControl.profile);
// app.delete('/api/profile/:id', isAuthed, userControl.profile);

//app.get('/api/category/:slug'/*, categoryControl*/);
app.get('/api/product/:sku'/*, productControl*/);
app.post('/api/flowtest', function(req, res) {
	res.send("Test");
});
// VENDOR ACCESS
// app.post('/api/category/:slug', Api.isAuthed, Api.categoryControl);
// app.post('/api/product', Api.product);

// CATCH-ALL REDIRECT ====================================
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + "/public"});
});

// CONNECTIONS ===========================================
var port = process.env.PORT || 1337;
app.listen(port);
console.log('listening on ' + port + '!');

