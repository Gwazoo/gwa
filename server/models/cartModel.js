// 'use strict';
var util = require('./../util/thinky'),
	thinky = require('thinky')(util.config),
	r = thinky.r,
	type = thinky.type;

var Cart = thinky.createModel("Cart", {
	username: type.string().regex('[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])').required(), // Username needs to begin and end with an alphanumeric character, but can contain dashes
	products: type.array().required(),
	createdDate: type.date(), // When the cart was created
	modifiedDate: type.date(), // When the cart was modified
	lastActivityDate: type.date() // Last time they logged in
});

module.exports = Cart;