'use strict';
var util = require('./../util/thinky'),
	thinky = require('thinky')(util.config),
	r = thinky.r,
	type = thinky.type;

// Product Model
var Product = thinky.createModel("products", {
	id: type.string(),
	vendor: type.string().required(), // Vendor's username
	name: type.string().required(),
	description: type.string().required(), // Full description
	salePrice: type.string().required(), // The price we sell the product for
	smallImages: [{ // Array of Image objects
		url: type.string(), // URL to image
		sortOrder: type.number().integer() // Display order of images
	}],
	largeImages: [{
		url: type.string(), // URL to image
		sortOrder: type.number().integer() // Display order of images
	}]
});

module.exports = Product;