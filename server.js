'use strict';
var Express        = require('express');
var Passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

var UserApi        = require('./server/routers/userApiRouter');
var CartApi        = require('./server/routers/cartApiRouter');
var CategoryApi    = require('./server/routers/categoryApiRouter');
var ProductApi     = require('./server/routers/productApiRouter');
var CheckoutApi     = require('./server/routers/checkoutApiRouter');

var Account        = require('./server/routers/accountRouter');
var Category       = require('./server/routers/categoryRouter');

var app = Express();

// var authenticate = JSON.stringify({
//   "authenticateTestRequest": {
//         "merchantAuthentication": {
//             "name": "54De7e2uX7BL",
//             "transactionKey": "6yzfD9wKJ89k4y38"
//         }
//     }  
// });
// var transaction = JSON.stringify({
//     "createTransactionRequest": {
//         "merchantAuthentication": {
//             "name": "54De7e2uX7BL",
//             "transactionKey": "6yzfD9wKJ89k4y38"
//         },
//         "refId": "123456",
//         "transactionRequest": {
//             "transactionType": "authCaptureTransaction",
//             "amount": "5",
//             "payment": {
//                 "creditCard": {
//                     "cardNumber": "4007000000027", 
//                     // Mastercard 5424000000000015
// 					// Visa 4007000000027
// 					// AmEx 370000000000002 (needs 4 digit cardCode)
//                     "expirationDate": "1220",
//                     "cardCode": "999"
//                 }
//             },
//             "lineItems": {
//                 "lineItem": {
//                     "itemId": "1",
//                     "name": "vase",
//                     "description": "Cannes logo",
//                     "quantity": "18",
//                     "unitPrice": "45.00"
//                 }
//             },
//             "tax": {
//                 "amount": "4.26",
//                 "name": "level2 tax name",
//                 "description": "level2 tax"
//             },
//             "duty": {
//                 "amount": "8.55",
//                 "name": "duty name",
//                 "description": "duty description"
//             },
//             "shipping": {
//                 "amount": "4.26",
//                 "name": "level2 tax name",
//                 "description": "level2 tax"
//             },
//             "poNumber": "456654",
//             "customer": {
//                 "id": "99999456654"
//             },
//             "billTo": {
//                 "firstName": "Ellen",
//                 "lastName": "Johnson",
//                 "company": "Souveniropolis",
//                 "address": "14 Main Street",
//                 "city": "Pecan Springs",
//                 "state": "TX",
//                 "zip": "44628",
//                 "country": "USA"
//             },
//             "shipTo": {
//                 "firstName": "China",
//                 "lastName": "Bayles",
//                 "company": "Thyme for Tea",
//                 "address": "12 Main Street",
//                 "city": "Pecan Springs",
//                 "state": "TX",
//                 "zip": "44628",
//                 "country": "USA"
//             },
//             "customerIP": "192.168.1.1",
//             "transactionSettings": {
//                 "setting": {
//                     "settingName": "testRequest",
//                     "settingValue": "false"
//                 }
//             },
//             "userFields": {
//                 "userField": [
//                     {
//                         "name": "MerchantDefinedFieldName1",
//                         "value": "MerchantDefinedFieldValue1"
//                     },
//                     {
//                         "name": "favorite_color",
//                         "value": "blue"
//                     }
//                 ]
//             }
//         }
//     }
// });
// Request.post({
//   headers: {'content-type' : 'application/json'},
//   url:     'https://apitest.authorize.net/xml/v1/request.api',
//   body:    transaction
// }, function(error, response, body){
//   console.log(body);
// });

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
app.all('/*', function(req, res, next) {
	res.sendFile('index.html', { root: __dirname + "/public"});
});

// Bootstrap passport config
require('./server/util/passport.js')(Passport, LocalStrategy);

// CONNECTIONS ===========================================
var port = process.env.PORT || 1337;
app.listen(port);
console.log('listening on ' + port + '!');

