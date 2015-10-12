'use strict';
var thinky = require('./../util/thinky');
// var thinky = require('thinky')(util.config);
var r = thinky.r;
var type = thinky.type;

// Product Model
var ProductModel = thinky.createModel("products", {
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

var Product = {
	create: function(data) {
		var product = new ProductModel(data);
		product.validate();
		product.save();
	}
};

module.exports = Product;