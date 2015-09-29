'use strict';
var BCrypt = require('bcrypt-nodejs'),
	thinky = require('./server/util/thinky');

var type = thinky.type;

var User = thinky.createModel('User', {
	id: type.string(),
	name: [{
		first: type.string(),
		last: type.string()
	}],
	userName: type.string().min(5).required(),
	email: type.string().email().required(),
	password: type.string().alphanum().min(6).required()
})

module.exports = User;