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
    created: type.date().default(r.now()), // When the cart was created
    modified: type.date().default(r.now()) // When the cart was modified
}, {
    pk: 'username'
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
                    .then(function (cart) {
                        if (cart) {
                            resolve(cart);
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
            CartModel.get(username).getJoin({products: {
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
        return new Promise(function (resolve, reject) {
            CartModel.get(data.username).run()
                    .then(function (cart){
                        cart.merge(data).save().then(function (result) {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(Error("It broke."));
                            }
                        }, function (err) {
                            console.log(err);
                            reject(Error(err));
                        });
            }, function (err) {
                console.log(err);
                reject(Error(err));
            });
        });
    }
};

module.exports.cartModel = CartModel;
module.exports.cart = Cart;
module.exports.cartItemModel = CartItemModel;