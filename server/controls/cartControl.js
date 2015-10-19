var thinky = require('../util/thinky');
var r = require('rethinkdb');
var bcrypt = require('bcrypt-nodejs');
var Cart = require('./../models/cartModel.js');
var Product = require('./../models/productModel.js');

// Model relationships
Cart.cartModel.hasMany(Cart.cartItemModel, 'products', 'username', 'username');
Cart.cartItemModel.belongsTo(Cart.cartModel, 'cart', 'username', 'username');
Cart.cartItemModel.belongsTo(Product.productModel, 'product', 'productId', 'id');

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
        Cart.cart.get(req.body.username)
        .then(function (cart){
            cart = mergeCarts(req.body.products, cart);
            Cart.cart.update(cart).then(function (cart) {
                res.json(cart);
            }, function (err) {
                res.status(500).json({
                    message: "Database error: " + err
                });
            });
        }, function (err) {
            Cart.cart.save(req.body)
            .then(function(cart){
                    res.json(cart);
            }, function (err) {
                    res.status(500).json({
                            message: "Database error. " + err
                    });
            });
        });
    },
    update: function (req, res) {
        cart = req.body;
        cart.username = req.user.username;
        Cart.cart.replace(cart).then(function (cart) {
            res.json(cart);
        }, function (err) {
            res.status(500).json({
                message: "Database error: " + err
            });
        });
    },
    get: function (req, res) {
        Cart.cart.get(req.params.username)
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
    localProducts.forEach(function (localProduct) {
        var index = dbCart.products.map(function(dbProduct) {
            return dbProduct.id;
        }).indexOf(localProduct.productId);
        if (index === -1) {
            dbCart.products.push(localProduct);
        } else {
            dbCart.products[index].quantity += localProduct.quantity;
        }
    });
    return dbCart;
}
