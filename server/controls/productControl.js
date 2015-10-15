var thinky 			= require('../util/thinky');
var r 				= require('rethinkdb');
var productModel = require('./../models/productModel.js').productModel;
var product = require('./../models/productModel.js').product;
var categoryModel = require('./../models/categoryModel.js').categoryModel;
var cartModel = require('./../models/cartModel.js').cartModel;

productModel.hasAndBelongsToMany(categoryModel, 'categories', 'id', 'id');

module.exports = {
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with status message.
	*/
	prodCreate : function (req, res) {
		product.create(req.body)
		.then(function(result){
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
				message: "Database error." + err
			})
		});
	},
	update : function (req, res) {
		product.update(req.body)
		.then( function (result) {
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error: " + err
			})
		});
	},
        getByTag : function (req, res) {
            product.getByTag(req.params.tag)
            .then(function (result) {
                res.json(result);
            }, function (err) {
                res.status(500).json({
                    message: "Database error: " + err
                })
            });
        }
};