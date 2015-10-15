'use strict';
angular.module('gwazoo.services')

.service('Cookies', function ($q, $http, localStorageService) {
    var count = 0;
    // var cart = {
    //  products: []
    // };

    // function getCart () {
    //  var cart = localStorageService.cookie.get("Cart");
    //  if (cart == null) {
    //      console.log("Creating cart...");

    //  }

    // }

    // function setCart (cart) {
    //  return localStorageService.cookie.set("Cart", cart);
    // }

    // function createCart () {
    //  return {
    //      member: false,
    //      username: null, 
    //      products: []
    //  };
    // }

    this.getCart = function () {
        return localStorageService.cookie.get("Cart");
    }

    this.createSession = function (sessionData) {
        localStorageService.cookie.set("Session", sessionData);
    }

    this.addToCart = function () {
        var cart = getCart();
        var item = {};
        item.id = count;
        item.quantity = Math.floor(Math.random() * 10)  
        cart.products.push(item);
        JSON.stringify(cart);
        console.log("Add To Cart:", cart);
        localStorageService.cookie.set("Cart", cart, 30);
        count++;
    }

    this.clearAllCookies = function () {
        localStorageService.cookie.clearAll();
        cart.products = [];
        console.log("Clear Cart:", cart)
    }

    this.removeCookie = function (cookieId) {
        localStorageService.cookie.remove(cookieId);
    }

    this.getSession = function () {
        console.log("Session:", localStorageService.cookie.get("Session"));
        return localStorageService.cookie.get("Session");
    }

    // this.getCart = function () {
    //  console.log("Cart:", localStorageService.cookie.get("Cart"));
    //  return localStorageService.cookie.get("Cart");
    // }

    this.saveCartToDb = function(cartData) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/cart', 
            data: cartData
        }).success(function(resObj) {
            // {
            //  added: false,
            //  message: "Previous session found.",
            //  result: result
            // }
            console.log("Saved Cart:", resObj);
            deferred.resolve(resObj);
        }).error(function(err) {
            console.log(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };
});


