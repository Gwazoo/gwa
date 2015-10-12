var thinky 		= require('../util/thinky');
//var thinky 		= require('thinky')(util.config);
var r 			= require('rethinkdb');
var product 	= require('./../models/productModel.js');

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
		product.productModel.create(req.body, function (err, data) {
			console.log("Data:", data);	
			res.json(data);
		});
	}
};