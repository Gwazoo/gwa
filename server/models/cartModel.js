// 'use strict';
var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;

var CartItemModel = thinky.createModel("carts_items", {
    username: type.string(),
    productId: type.string(),
    created: type.date(),
    modified: type.date()
});

var CartItem = {
    save: function (data) {
        return new Promise(function (resolve, reject) {
            CartItemModel.save(data).then(function(result){
                resolve(result);
            }, function (err) {
                reject(Error(err));
            });
        });
    },
    get: function (username) {
        return new Promise(function (resolve, reject) {
            CartItemModel.getAll(username, {index: "username"}).getJoin({product: true}).run()
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
    update: function (username, products) {
        return new Promise(function (resolve, reject) {
            CartItemModel.getAll(username, {index: "username"}).delete()
            .then(function (){
                CartItemModel.save(products).then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(Error(err));
                });
            }, function (err) {
                reject(Error(err));
            });
        });
    },
    cleanup: function (username) {
        return new Promise(function (resolve, reject) {
            CartItemModel.filter(r.row("username").eq(username)).delete()
            .then(function (){
                resolve();
            }, function (err) {
                reject(Error(err));
            });
        });
    }
};

module.exports.cartItem = CartItem;
module.exports.cartItemModel = CartItemModel;