'use strict';
angular.module('gwazoo.services')

.service('Cookies', function ($q, $http, localStorageService) {
    this.getSession = function () {
        return localStorageService.get("Session");
    };

    this.getCartCount = function () {
        var cart = this.getCart();
        if (cart === null || Object.keys(cart).length === 0) {
            cart = this.newCart();
        }

        var quantity = cart.products.map(function (product) {
            return product.quantity;
        });

        return quantity.reduce(function (pv, cv) {
            return pv + cv;
        }, 0);
    };

    this.getCart = function () {
        return localStorageService.get("Cart");
    };

    this.getDbCart = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/api/cart/db'
        }).success(function (res) {
            deferred.resolve(res);
        }).error(function (err) {
            console.log(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.newCart = function () {
        var cart = {
            username: "",
            products: []
        };
        return setCart(cart);
    };

    this.clear = function () {
        var cart = this.getCart();

        if (cart !== null) {
            cart.products = [];
            updateDb(cart).then(function (newCart) {
                cart = newCart;
            });
            return setCart(cart);
        }
    };

    this.add = function (product) {
        var deferred = $q.defer();
        var cart = this.getCart();

        if (cart === null)
            cart = this.newCart();

        if (typeof cart.products[0] === undefined) {
            cart = pushToCart(cart, product);
        } else {
            var index = getProductIndex(cart.products, product.id);
            if (index === -1) {
                cart = pushToCart(cart, product);
            } else {
                cart.products[index].quantity += product.quantity;
                cart.products[index].modified = new Date();
            }
        }
        updateDb(cart).then(function (newCart) {
            cart.products = newCart;
            setCart(cart);
            deferred.resolve(setCart(cart));
        });
        return deferred.promise;
    };

    this.update = function (item) {
        var deferred = $q.defer();
        var cart = this.getCart();

        updateDb(cart).then(function (newCart) {
            cart.products = newCart;
            setCart(cart);
            deferred.resolve(setCart(cart));
        });
        return deferred.promise;
    };

    this.remove = function (productId) {
        var cart = this.getCart();

        var index = getProductIndex(cart.products, productId);
        cart.products.splice(index, 1);
        updateDb(cart).then(function (newCart) {
            cart = newCart;
        });
        return setCart(cart);
    };
    
    this.setCart = function (cart) {
        return setCart(cart);
    };



    this.save = function (username) {
        var deferred = $q.defer();
        var cart = this.getCart();
        cart.username = username;
        $http({
            method: 'POST',
            url: '/api/cart/save', // MAKE SURE THIS IS THE RIGHT ENDPOINT!
            data: cart
        }).success(function (cart) {  // Merged Cart
            deferred.resolve(cart);
        }).error(function (err) {
            console.log(err);
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.createSession = function (sessionData) {
        localStorageService.set("Session", sessionData);
    };

    this.clearAllCookies = function () {
        localStorageService.clearAll();
    };

    this.removeCookie = function (cookieId) {
        localStorageService.remove(cookieId);
    };


    // HELPER FUNCTIONS /////////////////////////////
    function setCart(cart) {
        localStorageService.set("Cart", cart);

        return cart;
    };

    function getProductIndex(products, value) {
        return products.map(function (product) {
            return product.productId;
        }).indexOf(value);
    };

    function pushToCart(cart, product) {
        var newProduct = {};
        newProduct.product = product;
        newProduct.productId = product.id;
        newProduct.quantity = product.quantity;
        newProduct.modified = new Date();
        delete newProduct.product.quantity;
        cart.products.push(newProduct);
        return cart;
    };

    function updateDb(cart) {
        var deferred = $q.defer();
        if (cart.username !== "") {
            console.log("Sending update...");
            $http({
                method: 'POST',
                url: '/api/cart/update', // MAKE SURE THIS IS THE RIGHT ENDPOINT!
                data: cart.products
            }).success(function (res) {
                console.log("Update completed");
                deferred.resolve(res);
            }).error(function (err) {
                console.log(err);
                deferred.reject(err);
            });
        } else {
            deferred.resolve(cart.products);
        }
        return deferred.promise;
    };
});

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


