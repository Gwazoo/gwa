'use strict';
var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;

// Product Model
var ProductModel = thinky.createModel("products", {
    id: type.string(),
    vendor: type.string(), // Vendor's username
    name: type.string().required(),
    description: type.string().required(), // Full description
    shortDescription: type.string().max(50), // Short description for display on search pages
    price: type.string().required(), // The price we pay for it
    salePrice: type.string().required(), // The price we sell the product for
    smallImages: [{ // Array of Image objects
            url: type.string().required() // URL to image
        }],
    images: [{
            url: type.string().required(), // URL to image
            isPrimary: type.boolean()	 			// Display order of images
        }]
});

var Product = {
    create: function (data) {
        return new Promise(function (resolve, reject) {
            var categories = data.categories;
            data.categories = null;
            var product = new ProductModel(data);
            product.categories = categories;
            product.validate();
            product.saveAll({categories: true})
            .then(function (result) {
                console.log("Product: ", result);
                resolve(result);
            }, function (err) {
                reject(Error("Error saving product: " + err));
            });
        });
    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            ProductModel.get(id).getJoin({categories: {
                _apply: function (sequence) {
                    return sequence.pluck("id", "name");
                }
            }}).run()
            .then(function (result) {
                resolve(result);
            }, function (err) {
                reject(Error("Error retrieving product: " + err));
            });
        });
    },
    getAll: function () {
        return new Promise(function (resolve, reject) {
            ProductModel.getJoin({categories: {
                _apply: function (sequence) {
                    return sequence.pluck("id", "name");
                }
            }}).run()
            .then(function (result) {
                resolve(result);
            }, function (err) {
                reject(Error("Error retrieving products: " + err));
            });
        });
    },
    update: function (data) {
        return new Promise(function (resolve, reject) {
            ProductModel.get(data.id).run()
            .then(function (product) {
                product.merge(data).save()
                .then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(Error("Error updated product: " + err));
                });
            });
        });
    }
};

module.exports.product = Product;
module.exports.productModel = ProductModel;