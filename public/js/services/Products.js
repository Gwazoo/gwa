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
        var deferred = $q.defer();
        var filteredOptions = [];
        var optionCount = 0;
        var productCount = 0;
        var itemObj = {};
        allOptions.forEach(function (option) {
            var variations = [];
            if(optionCount !== 0) {
                option.variations.forEach(function (variation) {
                    variation.disabled = true;
                    selectedOptions.forEach(function (selectedOption) {
                        if(selectedOption !== null) {
                            product.items.forEach(function (item) {
                                if (item.options[selectedOption.name].toLowerCase() === selectedOption.value.toLowerCase() && item.options[selectedOption.name].toLowerCase() !== item.options[option.name].toLowerCase() && variation.value.toLowerCase() === item.options[option.name].toLowerCase()) {
                                    variation.disabled = false;
                                    itemObj = overrideProductInfo(product, item);
                                    productCount++;
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
            } else {
                filteredOptions[optionCount] = option;
            }
            optionCount++;
        });
        //console.log(filteredOptions);
        deferred.resolve({options: filteredOptions, item: itemObj});
        return deferred.promise;
    };
    
    this.getProductItemByOptions = function (product, options) {
        
    };
});

function overrideProductInfo(product, item) {
    var productObj = {};
    if (item.description !== null)
        productObj.description = item.description;
    if (item.id !== null)
        productObj.id = item.id;
    if (item.images !== null) {
        productObj.images = item.images;
    }
    return productObj;
}
