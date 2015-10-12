'use strict';
var thinky = require('./../util/thinky');
// var thinky = require('thinky')(util.config);
var r = thinky.r;
var type = thinky.type;

// User model
var User = thinky.createModel("users", {
	username: type.string().regex('[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])').min(5).max(25).required(), // Username needs to begin and end with an alphanumeric character, but can contain dashes
	email: type.string().email().required(),
	password: type.string().min(8).required(), // Salted hashed password
	salt: type.string(), // User salt
	firstName: type.string(),
	lastName: type.string(),
	addresses: [{ // Array of address objects
		address1: type.string(),
		address2: type.string(),
		postalCode: type.string(),
		state: type.string(),
		country: type.string()
	}],
	type: type.string(), // This is probably going to be an ID to a user types table
	isActive: type.boolean(), // So we can disable users
	createdDate: type.date(), // When the account was created
	modifiedDate: type.date(), // When the account was modified
	lastActivityDate: type.date() // Last time they logged in
});

var UserModel = {
	create: function(userObj) {
		return new Promise(function (resolve, reject) {
			User.get('SkylerTest').run()
			.then(function(success) {
				if (success) {
					resolve(success);
				} else {
					reject(Error("It broke."));
			}
			}, function (err) {
				reject(Error("It broke."));
			});
		});
	}
}

module.exports = UserModel;