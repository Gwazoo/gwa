var util = require('../util/thinky')
var thinky = require('thinky')(util.config);
var r = require('rethinkdb');
var bcrypt = require('bcrypt');

function handleError(res) {
	return function (error) {
		res.send(500, {error: error.message});
	}
}

module.exports = {
	createConnection : function (req, res, next) {
		r.connect(thinky._config).then(function (conn) {
			console.log('Opening');
			req._rdbConn = conn;
			next();
		}).error(handleError(res));
	},
	closeConnection : function (req, res, next) {
		req._rdbConn.close();
		console.log("Closing");
		next();
	},
	isAuthed : function (req, res, next) {
	console.log("Authenicating...");
    if (req.isAuthenticated()) {
    	console.log("Authed!");
        return next();
    }
    console.log("Declined!");
    res.redirect('/');

	},
	findAll : function (req, res) {
		r.connect(thinky._config, function (err, connection) {
			if (err) throw err;
			r.table('users').run(connection, function (err, cursor){
			   	if (err) throw err;
		   		cursor.toArray(function (err, result) {
		   			if (err) throw err;
		   			res.send(JSON.stringify(result, null, 2));
		   		});
			});
		});
	},
	create : function (req, res) {
	    console.log("DEBUG req.body:", JSON.stringify(req.body));  //debug
	    var formData = req.body;

	    r.connect(thinky._config, function (err, connection) {
	    	if (err) throw err;
	    	bcrypt.hash(formData.password, 12, function (err, hash) {
	    		if (err) throw err;
	    		formData.password = hash;
    		    r.table('users').insert(formData)
    			.run(connection, function(err, result) {
    				if (err) throw err;
    				res.send(JSON.stringify({status: 'User Added', user: formData}));
    			});
	    	});
		});
	},
	read : function (id, cb) {
		console.log("Deserializing...");
	    var userID = id;

	    r.connect(thinky._config, function (err, connection) {
	     	if (err) throw err;
		    r.table('users').get(userID)
			.run(connection, function(err, result) {
				if (err) { return cb(err); }
				var user = result;
				// res.send(JSON.stringify({status: 'User Found', user: result}));
				cb(null, user)
		 	});
		});
	},
	delete : function (req, res) {
	    console.log("req.body", JSON.stringify(req.body.id));  //debug
	    var userId = req.body.id;

	    r.connect(thinky._config, function (err, connection) {
	    	if (err) throw err;
		    r.table('users').get(userId).delete()
		    .run(connection, function(err, result) {
				if (err) throw err;
				if (result.deleted == 1){
					res.send(JSON.stringify({status: 'User Deleted'}));
				} else {
					res.send(JSON.stringify({status: 'Error: User NOT Deleted'}));
				}
			});
		});
	},
	authorize : function (username, password, cb)/*(req, res)*/ {
		// console.log("DEBUG req.body:", JSON.stringify(req.body));  //debug
		// var username = req.body.username;
		// var password = req.body.password;
		console.log("Serializing...");

		r.connect(thinky._config, function (err, connection) {
	    	if (err) throw err;
		    r.table('users').filter({
		    	username : username
		    }).run(connection, function (err, cursor) {
				if (err) throw err;
				cursor.toArray(function (err, result) {
					if (err) { return cb(err); }
					if (result.length == 1) {
						var hash = result[0].password;
						bcrypt.compare(password, hash, function (err, isMatch){
							if (isMatch) {
								// res.send(JSON.stringify({status: 'Password Matched!', user: result}));
								var user = result[0];
								{ return cb(null, user); }
							} else {
								// res.send(JSON.stringify({status: 'ERROR: Password Did Not Match!'}));
								{ return cb(null, false, {message: 'ERROR: Password Did Not Match!'}); }
							}
						});
					} else {
						// res.send(JSON.stringify({status: 'ERROR: No User Found!'}))
						{ return cb(null, false, {message: 'ERROR: No User Found!'}); }
					}
				});
			});
		});
	}
	// authorize : function (req, res, next) {
	// 	console.log("DEBUG req.body:", JSON.stringify(req.body));  //debug
	// 	r.table('users').filter({
	// 	    	username : req.body.username
	// 	    }).run(req._rdbConn).then(function (cursor) {
	// 		return cursor.toArray();
	// 	}).then(function (result) {	
	// 		if (result.length == 1) {
	// 			var hash =  result[0].password;
	// 			bcrypt.compare(req.body.password, hash, function (err, isMatch){
	// 				if (isMatch) {
	// 					console.log('Found match');
	// 					res.send(JSON.stringify({status: 'Password Matched!', user: result}));
	// 					next();
	// 				} else {
	// 					res.send(JSON.stringify({status: 'ERROR: Password Did Not Match!'}));
	// 				}
	// 			});
	// 		} else {
	// 			res.send(JSON.stringify({status: 'ERROR: No User Found!'}))
	// 		}
	// 	}).error(handleError(res));
	// }
};