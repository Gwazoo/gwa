var orderModel = require('./../models/orderModel.js').orderModel;
var order = require('./../models/orderModel.js').order;
var orderItemModel = require('./../models/orderItemModel.js').orderItemModel;

orderModel.hasMany(orderItemModel, 'items', 'id', 'orderId');

module.exports = {
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with status message.
	*/
	create : function (req, res) {
		order.create(req.body)
		.then(function(result){
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. Order not created."
			});
		});
	},
	getAll : function (req, res) {
		order.getAll()
		.then(function(result){
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. Orders not retrieved."
			});
		});
	},
	get : function (req, res) {
		order.get(req.params.id)
		.then(function (result) {
			res.json(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error." + err
			});
		});
	},
	getMemberOrders : function (req, res) {
		
	},
	getVendorOrders : function (req, res) {

	}
};

