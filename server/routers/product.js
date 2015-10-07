var Express        = require('express');
var	Api            = require('../controls/apiControl');

var productRouter = Express.Router();

//path => /api/product
// productRouter.post('/', Api.prodCreate);
// productRouter.delete('/', Api.prodDelete);

module.exports = productRouter;
