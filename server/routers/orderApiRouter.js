var Express = require('express');
var Passport = require('passport');
var OrderApi = require('../controls/orderControl');

var orderRouter = Express.Router();

//path => /api/order
orderRouter.get('/member', OrderApi.getMemberOrders);


orderRouter.get('/vendor', OrderApi.getVendorOrders);


module.exports = orderRouter;