var Express        = require('express');
var	CheckoutApi    = require('../controls/checkoutControl');
var checkoutRouter = Express.Router();
// var Root           = require('../util/config');


//path => /api/checkout
checkoutRouter.post('/', CheckoutApi.makePayment);

module.exports = checkoutRouter;