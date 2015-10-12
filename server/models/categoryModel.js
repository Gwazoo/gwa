'use strict';
var thinky = require('./../util/thinky');
// var thinky = require('thinky')(util.config);
var r = thinky.r;
var type = thinky.type;

var CategoryModel = thinky.createModel("categories", {
		id: type.string(),
		parentId: type.string(), // Self referential ID.
		name: type.string(), // Category name
		isActive: type.boolean() // So we can disable categories
	});
	
CategoryModel.hasMany(CategoryModel, "children", "id", "parentId");
CategoryModel.belongsTo(CategoryModel, "parent", "parentId", "id");

// Categories Model
var Category = {
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
	}
};

module.exports.category = Category;
module.exports.categoryModel = CategoryModel;

var product = require('./productModel.js');

product.productModel.hasAndBelongsToMany(CategoryModel, 'categories', 'id', 'id');