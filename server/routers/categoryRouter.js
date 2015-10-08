var Express        = require('express');
var	CategoryApi    = require('../controls/categoryControl');
var categoryRouter = Express.Router();
var Root           = require('../util/config');



categoryRouter.get('/', CategoryApi.getAll);

module.exports = categoryRouter;