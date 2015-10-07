var Express        = require('express');
var	Api            = require('../controls/userControl');

var productRouter = Express.Router();

//path => /api/product
// productRouter.post('/', Api.prodCreate);
// productRouter.delete('/', Api.prodDelete);

module.exports = productRouter;
