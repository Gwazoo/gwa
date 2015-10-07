var Express        = require('express');
var	Api            = require('../controls/apiControl');

var cartRouter = Express.Router();

//path => /api/cart
cartRouter.post('/', Api.cart);

module.exports = cartRouter;