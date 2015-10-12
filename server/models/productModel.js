'use strict';
var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;
var category = require('./categoryModel.js');

// Product Model
var ProductModel = thinky.createModel("products", {
	id: type.string(),
	vendor: type.string(), // Vendor's username
	name: type.string().required(),
	description: type.string().required(), // Full description
	shortDescription: type.string().max(50), // Short description for display on search pages
	price: type.string().required(), // The price we pay for it
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
		return new Promise(function (resolve, reject) {
			var categories = data.categories;
			data.categories = null;
			var product = new ProductModel(data);
			product.categories = categories;
			product.validate();
			product.saveAll({categories: true})
			.then(function(result){
				console.log("Product: ",result);
				resolve(result);
			}, function (err) {
				reject(Error("Error saving product: " + err));
			});
		});
	},
	getAll: function() {
		return new Promise(function (resolve, reject) {
			ProductModel.getJoin({categories: true}).run()
			.then(function(result){
				resolve(result);
			}, function (err) {
				reject(Error("Error retrieving product: " + err));
			});
		});
	},
	update: function(data) {
		return new Promise(function (resolve, reject) {
			ProductModel.get(data.id).run()
			.then(function (product) {
				product.merge(data).save()
				.then(function (result) {
					resolve(result);
				}, function (err) {
					reject(Error("Error updated product: " + err));
				});
			});
		});
	}
};

module.exports.product = Product;
module.exports.productModel = ProductModel;

category.categoryModel.hasAndBelongsToMany(ProductModel, 'products', 'id', 'id');