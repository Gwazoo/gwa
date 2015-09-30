var util = require('../util/thinky')
var thinky = require('thinky')(util.config);
var r = require('rethinkdb');
// var r = thinky.r;

function handleError (err, connection) {
	throw err;
}

module.exports = {
	findAll : function (req, res) {
		r.connect(thinky._config, function (err, connection) {
			if (err) handleError(err, connection);
			r.table('users').run(connection, function (err, cursor){
				if (err) handleError(err, connection);
				cursor.toArray(function (err, result) {
					if (err) handleError(err, connection);
					res.send(JSON.stringify(result, null, 2));
				});
			});
		});
	},
	create : function(req, res) {
		console.log("req.body", JSON.stringify(req.body));  //debug
		var formData = req.body;

		r.connect(thinky._config, function (err, connection) {
			if (err) handleError(err, connection);
			r.table('users').insert(formData)
			.run(connection, function(err, result) {
				if (err) handleError(err, connection);
				res.send(JSON.stringify({status: 'User Added'}));
			});
		});
	},
	read : function(req, res) {
		console.log("req.body", JSON.stringify(req.body));  //debug
	 //    var formData = req.body;

	 //    r.connect(thinky._config, function (err, connection) {
	 //     	if (err) handleError(err, connection);
		//     r.table('users').insert(formData)
		// 	.run(connection, function(err, result) {
		// 		if (err) handleError(err, connection);
		// 		res.send(JSON.stringify({status: 'User Added'}));
		//  	});
		// });
	},
	delete : function(req, res) {
		console.log("req.body", JSON.stringify(req.body.id));  //debug
		var userId = req.body.id;

		r.connect(thinky._config, function (err, connection) {
			if (err) handleError(err, connection);
			r.table('users').get(userId).delete()
			.run(connection, function(err, result) {
				if (err) handleError(err, connection);
				if (result.deleted == 1){
					res.send(JSON.stringify({status: 'User Deleted'}));
				} else {
					res.send(JSON.stringify({status: 'Error: User NOT Deleted'}));
				}
			});
		});
	}
};