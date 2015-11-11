var productModel = require('./../models/productModel.js').productModel;
var product = require('./../models/productModel.js').product;
var categoryModel = require('./../models/categoryModel.js').categoryModel;
var category = require('./../models/categoryModel.js').category;
var optionSetModel = require('./../models/optionModel.js').optionSetModel;
var optionSet = require('./../models/optionModel.js').optionSet;

// optionSetModel.hasMany(productModel, "products", "id", "optionSetId");



module.exports = {
    /*
     * @param {Obj} req
     *	Express request object
     * @param {Obj} res
     *	Express reponse object
     * @returns {Obj} JSON with status message.
     */
    prodCreate: function (req, res) {
        // optionSet.create(req.body.options)
        //         .then(function (result) {
        //             req.body.motherProduct.optionSetId = result.optionSetId;
        //             product.create(req.body.motherProduct)
        //                     .then(function (result) {
        //                         res.json(result);
        //                     }, function (err) {
        //                         res.status(500).json({
        //                             message: "Database error. Product not created."
        //                         });
        //                     });
        //         }) 
        product.create(req.body.motherProduct)
                .then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.status(500).json({
                        message: "Database error. Product not created."
                    });
                });
    },
    getAll: function (req, res) {
        product.getAll()
                .then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.status(500).json({
                        message: "Database error. Products not retrieved."
                    });
                });
    },
    get: function (req, res) {
        product.getProduct(req.params.id)
                .then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.status(500).json({
                        message: "Database error." + err
                    });
                });
    },
    update: function (req, res) {
        product.update(req.body)
                .then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.status(500).json({
                        message: "Database error: " + err
                    });
                });
    },
    getByTag: function (req, res) {
        product.getByTag(req.params.tag)
                .then(function (result) {
                    res.json(result);
                }, function (err) {
                    res.status(500).json({
                        message: "Database error: " + err
                    });
                });
    }
};