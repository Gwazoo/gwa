'use strict';
var thinky = require('./../util/thinky');
// var thinky = require('thinky')(util.config);
var r = thinky.r;
var type = thinky.type;

var CategoryModel = thinky.createModel("categories", {
		id: type.string(),
		parentId: type.string(), // Self referential ID.
		name: type.string().required(), // Category name
		slug: type.string().regex('[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])').min(5).max(25).required(), // URL friendly slug. Alphanumeric with dashes
		isActive: type.boolean() // So we can disable categories
	});
	
CategoryModel.hasMany(CategoryModel, "children", "id", "parentId");
CategoryModel.belongsTo(CategoryModel, "parent", "parentId", "id");

// Categories Model
var Category = {
	create: function (data) {
		return new Promise(function (resolve, reject) {
			if (data.hasOwnProperty('isActive') === false) // Set the default value of isActive to true if it's not set
				data.isActive = true;
			var category = new CategoryModel(data);
			category.saveAll({parent: true})
			.then(function (result) {
				resolve(result);
			}, function (err) {
				reject(Error("Error saving Category: " + err));
			});
		});
	},
	getAll: function(cb) {
		CategoryModel.filter(r.row.hasFields("parentId").not()).getJoin({
			children: {
				_apply: function(seq) {
					return seq.getJoin({children: true})
				}
			},
			products: false
		}).run()
		.then(function(result) {
			cb(null, result);
		})
	},
	getProducts: function(id) {
		return new Promise(function (resolve, reject) {
			CategoryModel.get(id).getJoin({products: true}).run()
			.then(function (result) {
				resolve(result);
			}, function (err) {
				console.log(err);
				reject(Error("Error retrieving product: " + err));
			});
		});
	}
};

module.exports.category = Category;
module.exports.categoryModel = CategoryModel;

var product = require('./productModel.js');

product.productModel.hasAndBelongsToMany(CategoryModel, 'categories', 'id', 'id');