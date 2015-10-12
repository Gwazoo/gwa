var thinky 			= require('../util/thinky');
//var thinky 			= require('thinky')(util.config);
var r 				= require('rethinkdb');
var category 	= require('./../models/categoryModel.js');

module.exports = {
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with all of the categories from the categories table. Formatted with children nested in parents.
	*/
	getAll : function (req, res) {   
		category.category.getAll(function (err, data) {
			console.log("Data:", data);	
			res.json(data);
		});
	}
};
