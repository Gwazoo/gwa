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
        })
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

    this.getProduct = function (param) {
        console.log(param);
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
        // console.log(param);
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
    }
});


