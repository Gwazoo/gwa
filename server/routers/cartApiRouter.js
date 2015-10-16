var Express = require('express');
var Api = require('../controls/cartControl');

var cartRouter = Express.Router();

//path => /api/cart
cartRouter.post('/', Api.cart);

cartRouter.post('/save', Api.save);

cartRouter.get('/:id', Api.get);

module.exports = cartRouter;