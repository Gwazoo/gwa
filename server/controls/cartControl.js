var thinky = require('../util/thinky');
var r = require('rethinkdb');
var bcrypt = require('bcrypt-nodejs');
var CartItem = require('./../models/cartModel.js').cartItem;
var CartItemModel = require('./../models/cartModel.js').cartItemModel;
var UserModel = require('./../models/userModel.js').user;
var User = require('./../models/userModel.js').userModel;
var ProductModel = require('./../models/productModel.js').productModel;

// Model relationships
CartItemModel.belongsTo(UserModel, "user", "username", "username");
CartItemModel.belongsTo(ProductModel, "product", "productId", "id");

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
        CartItem.get(req.body.username)
        .then(function (cart){
            mergedCart = mergeCarts(req.body, cart);
            CartItem.update(req.body.username, mergedCart).then(function (cart) {
                res.json(cart);
            }, function (err) {
                res.status(500).json({
                    message: "Database error: " + err
                });
            });
        }, function () {
            CartItem.save(req.body)
            .then(function(cart){
                console.log("Created Cart");
                res.json(cart);     
            }, function (err) {
                res.status(500).json({
                        message: "Database error. " + err
                });
            });
        });
    },
    update: function (req, res) {
        CartItem.cleanup(req.user.username).then(function () {
            User.updateCart(req.user.username, req.body).then(function (cart) {
                res.json(cart);
            }, function (err) {
                res.status(500).json({
                    message: "Database error: " + err
                });
            });
        });
    },
    get: function (req, res) {
        CartItem.get(req.user.username)
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

function mergeCarts (localProducts, dbCart) {
    localProducts.products.forEach(function (localProduct) {
        var index = dbCart.map(function(dbProduct) {
            return dbProduct.productId;
        }).indexOf(localProduct.productId);
        if (index === -1) {
            localProduct.username = localProducts.username;
            dbCart.push(localProduct);
        } else {
            dbCart[index].quantity += localProduct.quantity;
        }
    });
    return dbCart;
}
