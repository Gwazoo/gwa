var Express        = require('express');
var	CheckoutApi    = require('../controls/checkoutControl');
var checkoutRouter = Express.Router();
// var Root           = require('../util/config');


//path => /api/checkout
// checkoutRouter.post('/', CheckoutApi.makePayment);

checkoutRouter.post('/', CheckoutApi.authPayment);


checkoutRouter.post('/charge', CheckoutApi.chargePayment);



module.exports = checkoutRouter;