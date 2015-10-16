var thinky = require('../util/thinky');
//var thinky 		= require('thinky')(util.config);
var r = require('rethinkdb');
var bcrypt = require('bcrypt-nodejs');
var cart = require('./../models/cartModel.js');
var product = require('./../models/productModel.js');

// Model relationships
cart.cartModel.hasMany(cart.cartItemModel, 'products', 'id', 'cartId');
cart.cartItemModel.belongsTo(cart.cartModel, 'cart', 'cartId', 'id');
cart.cartItemModel.belongsTo(product.productModel, 'product', 'productId', 'id');

module.exports = {
    cart: function (req, res) {
        var sessionData = {
            username: req.user.username,
            products: req.body.products
        };

        // //How to use getCart using callback
        // getCart(req, res, sessionData.username, function(err, cart){
        // 	if (err) {
        // 		return res.status(500).send("Error: DB connection error.");
        // 	}
        // 	//TODO: Manipulate cart data i.e. call other function and pass cart
        // 	//res.json(cart);
        // });

        // //How to use addToCart using callback
        // var product = req.body.product;
        // addToCart(req, res, sessionData.username, product, function(err, result){
        // 	if (err) {
        // 		return res.status(500).send("Error: DB connection error.");
        // 	}
        // 	//TODO: Handle result obj i.e. res.send(...)
        // });

        checkSession(req, res, sessionData);
    },
    save: function (req, res) {
        req.body.createdDate = Date.now();
        cart.cart.save(req.body)
        .then(function(result){
                res.json(result);
        }, function (err) {
                res.status(500).json({
                        message: "Database error. " + err
                });
        });
    },
    get: function (req, res) {
        cart.cart.get(req.params.id)
        .then(function(result){
            res.json(result);
        }, function (err) {
            res.status(500).json({
                message: "Database error: " + err
            });
        });
    }
};



////////////////////////////////////////
//HELPER FUNCTIONS

function checkSession(req, res, sessionData) {
    r.connect(thinky._config, function (err, connection) {  //connect to db
        if (err) {
            return res.status(500).send("Error: DB connection error.");
        }
        //check if session exists
        r.table('sessions').get(sessionData.username)
        .run(connection, function (err, result) {
            if (err) {
                return res.status(500).send("Error: DB connection error.");
            } else if (result) {  //username was found (so don't add new session)
                mergeCarts(req, res, sessionData.username, sessionData.products);
            } else {
                saveSession(req, res, sessionData);
            }
        });
    });
}

function getCart(req, res, username, callback) {
    console.log("Getting Cart...");
    r.connect(thinky._config, function (err, connection) {  //connect to db
        if (err) {
            return res.status(500).send("Error: DB connection error.");
        }
        r.table('sessions').get(username)
        .run(connection, function (err, result) {
            if (err) {
                return callback(err);
            } else {
                callback(null, result);
            }
        });
    });
}

function addToCart(req, res, username, product, callback) {
    console.log("Adding To Cart...");
    r.connect(thinky._config, function (err, connection) {  //connect to db
        if (err) {
            return res.status(500).send("Error: DB connection error.");
        }
        r.table('sessions').get(username)('products').append(product)
                .run(connection, function (err, result) {
                    if (err) {
                        return callback(err);
                    } else {
                        callback(null, result);
                    }
                });
    });
}

function mergeCarts(req, res, username, productsArray) {
    console.log("Merging Carts...");
    r.connect(thinky._config, function (err, connection) {  //connect to db
        if (err)
            throw err;
        r.table('sessions').get(username).update({
            products: r.table('sessions').get(username)('products').setUnion(productsArray)
        }, {
            nonAtomic: true
        })
                .run(connection, function (err, result) {
                    if (err)
                        res.status(500).send("Error: Database failed to connect.");
                    else {
                        console.log("result:", result);
                        return res.json({//success
                            added: false,
                            message: "Successfully merged carts.",
                            result: result
                        });
                    }
                });
    });
}

function saveSession(req, res, sessionData) {
    r.connect(thinky._config, function (err, connection) {  //connect to db
        if (err)
            throw err;
        r.table('sessions').insert(sessionData)
                .run(connection, function (err, result) {
                    if (err) {
                        return res.status(500).send("Error: Session not created.");
                    } else if (result.inserted) {
                        return res.json({//success
                            added: true,
                            message: "Session was added to the database.",
                            result: result
                        });
                    }
                });
    });
}

function updateCart(req, res, username, cart) {
    r.connect(thinky._config, function (err, connection) {  //connect to db
        r.table('sessions').get(username).update({
            products: r.table('sessions').get(username)('products').setUnion(cart)
        }, {
            nonAtomic: true
        })
                .run(connection, function (err, result) {
                    console.log("result:", result);
                });
    });
}

