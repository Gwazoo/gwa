'use strict';
var util = require('./../util/thinky'),
	thinky = require('thinky')(util.config),
	r = thinky.r,
	type = thinky.type;

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
	// getAll: function(cb) {
	// 	CategoryModel.filter(r.row.hasFields("parentId").not()).getJoin({
	// 		children: {
	// 			_apply: function(seq) {
	// 				return seq.getJoin({children: _apply: function(seq) {
	// 					return seq.getJoin({children: true});
	// 				}})
	// 			}
	// 		}
	// 	}).run()
	// 	.then(function(result) {
	// 		cb(null, result);
	// 	})
	// }
}

module.exports = Category;