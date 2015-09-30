'use strict';
var util = require('./../util/thinky'),
	thinky = require('thinky')(util.config),
	type = thinky.type;


var User = thinky.createModel('users', {
	id: type.string(),
	firstName: type.string(),
	lastName: type.string(),
	userName: type.string().min(5).max(25).required(),
	email: type.string().email().required(),
	password: type.string().alphanum().min(6).required()
});

// var user = new User({
// 	userName: 'userName',
// 	email: 'email',
// 	password: ''
// });

module.exports = User;