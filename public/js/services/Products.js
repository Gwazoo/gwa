'use strict';
angular.module('gwazoo.services')

.service('Products', function ($q, $http, $rootScope) {
    this.addProduct = function (productInfo) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/product/create',
            data: productInfo
        }).success(function (res) {
            console.log('product Added:', res);
            deferred.resolve(res);
        });
        return deferred.promise;
    };
    
    this.getCategories = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/category'
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (err) {
            console.log('Services Err:', err);
            deferred.reject(err);
        });
        return deferred.promise;
    };
    
    this.getProduct = function(id) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/product/' + id
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (err) {
            console.log('Services Err:', err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getProducts = function() {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/product'
        }).success(function (res) {
            deferred.resolve(res.data);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getProductItem = function (param) {
        // console.log(param);
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/product/' + param
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (err) {
            console.log('Services Err:', err);
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
    this.updateProduct = function (productObj) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/product/update',
            data: productObj
        }).success(function (res) {
            deferred.resolve(res.data);
        }).error(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getCategoryProducts = function (param) {
        console.log(param);
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/category/' + param
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (err) {
            console.log('Services Err:', err);
            deferred.reject(err);
        });
        return deferred.promise;
    };
    
    this.getProductOptions = function (allOptions, selectedOptions, product) {
        //allOptions is the optionSet object (all options with their variations) 
        //selectedOptions is an object containing all the currently selected options
        //product is the parent product object
        var deferred = $q.defer();
        var filteredOptions = [];  //holds all the options (after disabling where appropriate)
        var optionCount = 0;  //overall option loop control
        var itemObj = {};  //initialized object to hold new SKU (aka 'item')
        allOptions.forEach(function (option) {  //loop through each option in the optionSet
            var variations = [];  //initialized array for holding all variations (subsets of options, ie "small", "medium", "large")
            if(optionCount !== 0) {  //for every option other than the first
                option.variations.forEach(function (variation) {  //loop through each variation
                    variation.disabled = true;  //disable every variation by default
                    selectedOptions.forEach(function (selectedOption) {  //loop through the selected options
                        if(selectedOption !== null) {  //check to make sure the option is valid
                            product.items.forEach(function (item) {  //loop through each item (SKU) attached to the parent product
                                if (item.options[selectedOption.name].toLowerCase() === selectedOption.value.toLowerCase() 
                                    && item.options[selectedOption.name].toLowerCase() !== item.options[option.name].toLowerCase() 
                                    && variation.value.toLowerCase() === item.options[option.name].toLowerCase()) {
                                    //if the item's (SKU) attribute matches the selected option (ie if the SKU is white and the user chose white)
                                    //Shortcircuit AND (fails if above is false)
                                    //
                                    variation.disabled = false;  //enable the option
                                    itemObj = overrideProductInfo(product, item);
                                }
                            });
                        }
                    });
                    variations.push(variation);
                });
                filteredOptions[optionCount] = { 
                    name: option.name, 
                    type: option.type,
                    variations: variations
                };
            } else {  //Add first option to array
                filteredOptions[optionCount] = option;
            }
            optionCount++;
        });
        console.log(filteredOptions);
        deferred.resolve({options: filteredOptions, item: itemObj});
        return deferred.promise;
    };
    
    this.initMerge = function (cart) {
        var mergedCart = [];
        cart.forEach(function (item) {
            for (var attrname in item.product.product) { 
                if (item.product[attrname] === undefined) {
                    item.product[attrname] = item.product.product[attrname]; 
                }
            }
            console.log(item);
            mergedCart.push(item);
        });
        console.log('Merged', mergedCart);
        return mergedCart;
    };
    
    this.qtyRange = function (min, max) {
        var input = [];
        if (min === 0 || min === undefined) min = 1;
        if (max === 0 || max === undefined) max = 15;
        for (var i = min; i <= max; i++) input.push(i);
        return input;
    };
});

function overrideProductInfo(product, item) {
    
    for (var attrname in item) { product[attrname] = item[attrname]; }
    return product;
}
