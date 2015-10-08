'use strict';
var Express        = require('express');
var	Passport       = require('passport');
var	LocalStrategy  = require('passport-local').Strategy;

var Cart           = require('./server/routers/cartRouter');
var Account        = require('./server/routers/accountRouter');
var Product        = require('./server/routers/productRouter');
var User           = require('./server/routers/userRouter');

var app = Express();

// Bootstrap app and passport config
require('./server/util/express.js')(app, Passport);
require('./server/util/passport.js')(Passport, LocalStrategy);

// ROUTERS ==============================================
app.use('/api/user', User);  // Router at PATH ./server/routes/user.js
app.use('/api/cart', Cart);  // Router at PATH ./server/routes/cart.js
app.use('/api/product', Product);  // Router at PATH ./server/routes/product.js
app.use('/account', Account);  // Router at PATH ./server/routes/account.js

// app.post('/api/register', User.create);
// app.put('/api/profile/:id', isAuthed, userControl.profile);
// app.delete('/api/profile/:id', isAuthed, userControl.profile);

app.get('/api/category/:slug'/*, categoryControl*/);
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

