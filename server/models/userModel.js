'use strict';
var thinky = require('./../util/thinky.js'),
	type = Thinky.type;

var User = thinky.createModel('User', {
	id: type.string(),
	name: type.string(),

})
	BCrypt = require('bcrypt-nodejs')

