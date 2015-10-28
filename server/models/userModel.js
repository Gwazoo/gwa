'use strict';
var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;
var bcrypt = require('bcrypt-nodejs');

// User model
var User = thinky.createModel("users", {
    username: type.string().regex('[A-Za-z0-9](?:[A-Za-z0-9\-]{0,61}[A-Za-z0-9])').min(5).max(25).required(), // Username needs to begin and end with an alphanumeric character, but can contain dashes
    email: type.string().email().required(),
    password: type.string().required(), // Salted hashed password
    firstName: type.string(),
    lastName: type.string(),
    addresses: [{// Array of address objects
            name: type.string(),
            address1: type.string(),
            address2: type.string(),
            postalCode: type.number(),
            state: type.string(),
            country: type.string()
        }],
    type: type.string().default('member'), // This is probably going to be an ID to a user types table
    isActive: type.boolean().default(true), // So we can disable users
    created: type.date().default(r.now()), // When the account was created
    modified: type.date().default(r.now()), // When the account was modified
    lastActivity: type.date().default(r.now()) // Last time they logged in
}, {
    pk: 'username'
});

var PasswordReset = thinky.createModel("resetQueue", {
    username: type.string(),
    tokenHash: type.string(),
    expiration: type.date(),
    isUsed: type.boolean().default(false)
});

var PasswordResetModel = {
    create: function (username, token) {
        return new Promise(function (resolve, reject) {
            var salt = bcrypt.genSaltSync(10);
            bcrypt.hash(token, salt, null, function (err, hash) {
                var expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 2);
                var newReset = new PasswordReset({
                    username: username,
                    tokenHash: hash,
                    expiration: expirationDate
                });
                
                newReset.save().then(function () {
                    resolve();
                }, function (err) {
                    reject(err);
                });
            });
        });
    }
};

var UserModel = {
    create: function (userObj) {
        return new Promise(function (resolve, reject) {
            var salt = bcrypt.genSaltSync(12);
            bcrypt.hash(userObj.password, salt, null, function (err, hash) {
                userObj.password = hash;
                var newUser = new User(userObj);

                newUser.saveAll({cart: true})
                .then(function (user) {
                    // console.log("UserModel Result:", user);
                    if (user) {
                        delete user.password;
                        resolve(user);
                    } else {
                        reject(Error("It broke."));
                    }
                }, function (err) {
                    console.log(err);
                    reject(Error("It broke."));
                });
            });
        });
    },
    updateCart: function (username, products) {
        return new Promise(function (resolve, reject) {
            User.get(username).getJoin({cart: true}).run()
            .then(function (user){
                user.cart = products;
                user.saveAll({cart: true})
                .then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(Error(err));
                });
            }, function (err) {
                reject(Error(err));
            });
        });
    }
};

module.exports.userModel = UserModel;
module.exports.user = User;