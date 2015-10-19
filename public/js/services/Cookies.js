'use strict';
angular.module('gwazoo.services')

.service('Cookies', function ($q, $http, localStorageService) {
    this.getSession = function () {
        return localStorageService.cookie.get("Session");
    };

    this.getCartCount = function () {
        var cart = this.getCart();

        var quantity = cart.products.map(function (product) {
            return product.quantity;
        });

        return quantity.reduce(function(pv, cv) { return pv + cv; }, 0);
    }

    this.getCart = function () {
        return localStorageService.cookie.get("Cart");
    };

    this.newCart = function () {
        console.log("Creating cart...");
        var newCart = {
            member: false,
            products: []
        };
        return this.setCart(newCart);
    };

    this.clear = function () {
        var cart = this.getCart();

        if (cart != null) {
            cart.products = [];
            updateDb(cart);
            return this.setCart(cart);
        }
    };

    this.add = function (productId) {
        var cart = this.getCart();

        if (cart == null) cart = this.newCart();

        if (typeof cart.products[0] === undefined) {
            pushToCart(cart, productId);
        } else {
            var index = getProductIndex(cart.products, productId);
            if (index === -1) {
                pushToCart(cart, productId);
            } else {
                cart.products[index].quantity += 1;
                cart.products[index].modified = new Date();
            }
        }
        // updateDb(cart);
        return this.setCart(cart);
    };

    this.remove = function (productId) {
        var cart = this.getCart();

        var index = getProductIndex(cart.products, productId);
        cart.products.splice(index, 1);
        return this.setCart(cart);
    };

    // this.increment = function (productId) {
    //     var cart = this.getCart();

    //     var index = getProductIndex(cart.products, productId);  
    //     cart.products[index].quantity += 1;
    //     cart.products[index].modified = new Date();
    //     return this.setCart(cart);
    // };

    // this.decrement = function (productId) {
    //     var cart = this.getCart();

    //     var index = getProductIndex(cart.products, productId);  
    //     if (cart.products[index].quantity > 1) {
    //         cart.products[index].quantity -= 1;   
    //         cart.products[index].modified = new Date();      
    //     } else {
    //         cart.products.splice(index, 1);
    //     }
    //     return this.setCart(cart);
    // };

    this.setCart = function (cart) {
        localStorageService.cookie.set("Cart", cart, 30);
        return cart;
    };

    this.save = function (products, username) {
        var deferred = $q.defer();
        var data = {
            username: username,
            products: products
        };
        $http({
            method: 'POST',
            url: '/api/cart/save',  // MAKE SURE THIS IS THE RIGHT ENDPOINT!
            data: data
        }).success(function(cart) {  // Merged Cart
            deferred.resolve(cart);
        }).error(function(err) {
            console.log(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.createSession = function (sessionData) {
        localStorageService.cookie.set("Session", sessionData);
    };

    this.clearAllCookies = function () {
        localStorageService.cookie.clearAll();
    };

    this.removeCookie = function (cookieId) {
        localStorageService.cookie.remove(cookieId);
    };

    // HELPER FUNCTIONS /////////////////////////////
    function getProductIndex(products, value) {
        return products.map(function(product) { return product.productId; }).indexOf(value);
    }

    function pushToCart (cart, productId) {
        cart.products.push({
            productId: productId,
            quantity: 1,
            modified: new Date()
        });
    }
    function updateDb (cart) {
        var deferred = $q.defer();
        if (cart.member) {
            $http({
                method: 'POST',
                url: '/api/cart/update',  // MAKE SURE THIS IS THE RIGHT ENDPOINT!
                data: cart.products
            }).success(function(res) {
                deferred.resolve(res);
            }).error(function(err) {
                console.log(err);
                deferred.reject(err);
            });         
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }
});


