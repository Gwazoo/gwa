var User = require('./../models/userModel');

module.exports = {
	create: function(req, res, next) {
		var user = new User({
			userName: 'userName',
			email: 'email',
			password: ''
		})
	}
};