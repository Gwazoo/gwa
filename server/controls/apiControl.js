var util = require('../util/thinky')
var thinky = require('thinky')(util.config);
var r = require('rethinkdb');
// var r = thinky.r;

module.exports = {
	getAll : function(req, res) {
		r.connect(thinky._config, function(err, connection) {
			if (err) throw err;
			var test = r.table('users').run(connection, function (err, cursor){
				if (err) throw err;
				cursor.toArray(function (err, result) {
					if (err) throw err;
					res.send(JSON.stringify(result, null, 2));
				});
			});
		});
	}
};