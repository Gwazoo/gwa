'use strict';
var thinky = require('./../util/thinky');
var categoryModel = require('./categoryModel.js').categoryModel;
var optionSetModel = require('./optionModel.js').optionSetModel;
var r = thinky.r;
var type = thinky.type;

// Product Model
var ProductModel = thinky.createModel("products", {
    id: type.string(),
    vendor: type.string(), // Vendor's username
    name: type.string(),
    description: type.string(), // Full description
    shortDescription: type.string().max(50), // Short description for display on search pages
    supplyPrice: type.string(), // The price we pay for it
    retailPrice: type.string(), // The price we sell the product for
    shippingPrice: type.string(), // Flat rate shipping price
    shippingType: type.string(), // Free Shipping, Flat Rate Shipping, Calculated Shipping
    msrp: type.string(), // Suggested Retail Price
    stockQuantity: type.number(), // Amount of product in stock
    minQuantity: type.number(), // Minimum quantity to add to cart
    maxQuantity: type.number(), // Maximum quantity to add to cart
    sku: type.string(), // Vendor's SKU for the product
    parentId: type.string(), // Vendor's SKU for the product's parent product
    optionSetId: type.string(),
    images: [{
            small: {
                url: type.string(),
                isPrimary: type.boolean().default(false)
            },
            large: {
                url: type.string(),
                isPrimary: type.boolean().default(false)
            }
    }],
    options: type.object(), // K:V pairs. IE - {"color":"blue", "size":"medium"}
    additionalInfo: [{ // Array of Objects that contain key and value
            name: type.string(), // Additional Info Key
            value: type.string() // Additional Info Value
    }],
    isActive: type.boolean().default(false),
    created: type.date().default(r.now()),
    modified: type.date().default(r.now())
});

ProductModel.hasMany(ProductModel, "items", "id", "parentId");
ProductModel.belongsTo(ProductModel, "motherProduct", "parentId", "id");
ProductModel.hasAndBelongsToMany(categoryModel, 'categories', 'id', 'id');
ProductModel.belongsTo(optionSetModel, "optionSets", "optionSetId", "id");

var Product = {
    create: function (data) {
        return new Promise(function (resolve, reject) {
            var product = new ProductModel(data.motherProduct);
            product.validate();
            product.categories = data.categories;
            product.optionSetId = data.optionSet;

            
            product.saveAll({items: true, motherProduct: true, categories: true})
                    .then(function (result) {
                        console.log('succeed');
                        resolve(result);
                    }, function (err) {
                        console.log(err);
                        reject(Error("Error saving product: " + err));
                    });

        });
    },
    getProduct: function (id) {
        return new Promise(function (resolve, reject) {
            ProductModel.get(id).getJoin({
                categories: {
                    _apply: function (sequence) {
                        return sequence.pluck("id", "name");
                    }
                }, 
                items: true, 
                optionSets: {
                    _apply: function (seq) {
                        return seq.getJoin({options: true});
                    }
                }
            }).run()
            .then(function (result) {
                resolve(result);
            }, function (err) {
                reject(Error("Error retrieving product: " + err));
            });
        });
    },
    getItem: function (id) {
        return new Promise(function (resolve, reject) {
            ProductModel.get(id).getJoin({
                product: {
                    _apply: function (sequence) {
                        return sequence.getJoin({
                            categories: {
                                _apply: function (seq) {
                                    return seq.pluck("id", "name");
                                }
                            }
                        });
                    }
                }
            }).run()
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
    getByTag: function (data) {
        return new Promise(function (resolve, reject) {
            ProductModel.filter({tag: data}).run()
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