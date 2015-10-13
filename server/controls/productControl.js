var thinky 			= require('../util/thinky');
var r 				= require('rethinkdb');
var productModel 	= require('./../models/productModel.js');
var product 		= productModel.product;

module.exports = {
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with status message.
	*/
	prodCreate : function (req, res) {
        console.log("Control req.body:", req.body);
		product.create(req.body)
		.then(function(result){
			console.log("Data:", result);	
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. Product not created."
			});
		});
	},
	getAll : function (req, res) {
		product.getAll()
		.then(function(result){
			console.log("Data:", result);
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. Products not retrieved."
			});
		});
	},
	get : function (req, res) {
		product.get(req.params.id)
		.then(function (result) {
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. Product not retrieved."
			});
		});
	},
	update : function (req, res) {
		console.log("Update Test:", req.body);
		product.update(req.body)
		.then( function (result) {
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. Product not updated."
			});
		});
	}
};