var User = require('./../models/userModel');

module.exports = {
	create: function(req, res, next) {
		var user = new User(req.body);
		user.save().then(function(result) {
			res.send(JSON.stringify(result));
		}).error(handleError(res));
	}
};