var r = require('rethinkdb');

module.exports = {
	getAll : function(req, res) {
		r.connect({host: 'localhost', port: 28015, auth_key: ''}, function(err, connection) {
		   if (err) throw err;
		   var test = r.db('gwazoo').table('users').run(connection, function (err, cursor){
		   	if (err) {
		   		throw err;
		   	} else {
		   		cursor.toArray(function (err, result) {
		   			if (err) throw err;
		   			res.send(JSON.stringify(result, null, 2));
		   		});
		   	}
		   });
		});
	}
};