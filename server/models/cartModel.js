// 'use strict';
var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;

var CartModel = thinky.createModel("carts", {
    username: type.string(),
    products: [{
            productId: type.string(),
            quantity: type.number()
        }],
    created: type.date(), // When the cart was created
    modified: type.date() // When the cart was modified
});

var CartItemModel = thinky.createModel("carts_items", {
    cartId: type.string(),
    productId: type.string(),
    created: type.date(),
    modified: type.date()
});

var Cart = {
    save: function (data) {
        return new Promise(function (resolve, reject) {
            var cart = new CartModel(data);
            cart.saveAll({products: true})
                    .then(function (result) {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(Error("It broke."));
                        }
                    }, function (err) {
                        console.log(err);
                        reject(Error("It broke."));
                    });
        });
    },
    get: function (username) {
        return new Promise(function (resolve, reject) {
            console.log(username);
            CartModel.getAll(username, {index: "username"}).getJoin({products: {
                            _apply: function(seq) {
                                    return seq.getJoin({product: true});
                            }
			}
                    }).run()
                    .then(function (result) {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(Error("It broke."));
                        }
                    }, function (err) {
                        console.log(err);
                        reject(Error(err));
                    });
        });
    },
    update: function (data) {

    }
};

module.exports.cartModel = CartModel;
module.exports.cart = Cart;
module.exports.cartItemModel = CartItemModel;