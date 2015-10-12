var thinky			= require('../util/thinky');
var r 				= require('rethinkdb');
var categoryModel 	= require('./../models/categoryModel.js');
var category 		= categoryModel.category;

module.exports = {
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with all of the categories from the categories table. Formatted with children nested in parents.
	*/
	getAll : function (req, res) {   
		category.getAll(function (err, data) {
			console.log("Data:", data);	
			res.json(data);
		});
	},
	getProducts : function (req, res) {
		category.getProducts(req.params.id)
		.then(function(result){
			console.log("Data:", result);
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. Products not retrieved."
			});
		});
	}
};
