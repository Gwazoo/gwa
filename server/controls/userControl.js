var thinky 		= require('./../util/thinky');
//var thinky 		= require('thinky')(util.config);
var r 			= require('rethinkdb');
var bcrypt 		= require('bcrypt-nodejs');
var userModel 	= require('./../models/userModel.js').userModel;
var user = require('./../models/userModel.js').user;
var cartItem = require('./../models/cartModel.js').cartItemModel;

// Relationships
user.hasMany(cartItem, "cart", "username", "username");

module.exports = {
    /*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @param {Function}
	*	Calls next middleware
	* @returns If success, next(). If failure, redirects to index.
	*/
	isAuthed : function (req, res, next) {
		console.log("Authenicating...");
	    if (req.isAuthenticated()) {
	    	console.log("Authed!");
	        return next();
	    }
	    console.log("Declined!");
	    res.redirect('/');
	},
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with all of the users from the users table. Debug method only.
	*/
	getAll : function (req, res) {   //DEBUG METHOD ONLY
		r.connect(thinky._config, function (err, connection) {
			if (err) throw err;
			r.table('users').run(connection, function (err, cursor){
			   	if (err) throw err;
		   		cursor.toArray(function (err, result) {
		   			if (err) throw err;
		   			// res.send(JSON.stringify(result, null, 2));
		   			res.json(result)
		   		});
			});
		});
	},
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with status message.
	*/
	create : function (req, res) {
		userModel.create(req.body)
		.then(function (result) {
			res.send(result);
		}, function (err) {
			res.status(500).json({
				message: "Database error. User not created."
			});
		});
	},
	/*
	* @param {String} username
	*	username passed in from Passport user object
	* @param {Function} done
	*	Passport callback
	* @returns {Function} Passport callback with user object
	*/
	read : function (username, done) {
		console.log("Deserializing...");
		r.connect(thinky._config, function (err, connection) {  //connect to db
			if (err) throw err;
			r.table('users').get(username)  //check if user exists by getting with username
			.run(connection, function(err, user) {
				if (err) { return done(err); }
				delete user.password;
				{ return done(null, user); }  //is success, return callback with user object
		 	});
		});
	},
	/*
	* @param {Obj} req
	*	Express request object with username attached
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} res with availability message
	*/
	username : function (req, res) {
		console.log("Checking username...", req.body.username);
	    r.connect(thinky._config, function (err, connection) {  //connect to db
	     	if (err) throw err;
		    r.table('users').get(req.body.username)  //check if user exists by getting with username
			.run(connection, function(err, result) {
				if (err) { return done(err); }
				else if (result == null) {
					console.log("Username available");
					return res.status(200).send("Username is available!");
				} else {
					console.log("Username taken");
					return res.status(200).send("Username is already taken!");
				}
		 	});
		});
	},
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Function} Logout and redirect to index
	*/
	delete : function (req, res) {
	    r.connect(thinky._config, function (err, connection) {  //connect to db
	    	if (err) throw err;
		    r.table('users').get(req.user.username).delete()  //delete user by PASSPORT USER USERNAME
		    .run(connection, function(err, result) {
				if (err) throw err;
				console.log('User Deleted');
				req.logout();
				res.redirect('/');
			});
		});
	},
	/*
	* @param {Obj} username
	*	Username passed in from Sign In page through Passport
	* @param {Obj} password
	*	Password passed in from Sign In page through Passport
	* @param {Function} done
	*	Passport callback that accepts (success) a user object or (failure) err/false
	* @returns {Function} Passport callback
	*/
	authorize : function (username, password, done) {
		console.log("Serializing...");

		r.connect(thinky._config, function (err, connection) {  //connect to db
	    	if (err) throw err;
		    r.table('users').get(username).run(connection, function (err, result) {
				if (err) { return done(err); }
				if (result != null) {  //if unique username is found
					bcrypt.compare(password, result.password, function (err, isMatch){
						//compare user-submitted password with hash, returns boolean isMatch
						if (isMatch) {
							console.log("Authenticated!");
							var user = result;
							delete user.password;
							console.log(user);
							{ return done(null, user); }  //Success! Return user object
						} else {
							console.log("Incorrect Password!");
							{ return done(null, false, {message: 'ERROR: Password Did Not Match!'}); }
						}
					});
				} else {
					console.log("No User Found!");
					{ return done(null, false, {message: 'ERROR: No User Found!'}); }
				}
			});
		});
	}
};