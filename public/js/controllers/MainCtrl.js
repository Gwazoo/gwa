'use strict';
angular.module('gwazoo.controllers')

.controller('MainCtrl', ['$scope', '$location', '$uibModal', '$templateCache', 'Account', 'Cookies', 'Products', function($scope, $location, $uibModal, $templateCache, Account, Cookies, Products) {
    $scope.date = new Date();

    //Check session and initialize cart
    $scope.session = Cookies.getSession();
    $scope.cartCount = Cookies.getCartCount();

    $scope.logout = function() {
        Cookies.clearAllCookies();
        $scope.session = null;
        $scope.cartCount = 0;
        Account.logout()
        .then(function () {
            $scope.user = null;
            $location.path('/').replace();
        })
        .catch(function (err) {
            console.log("There was an error logging out.");
        });
    };

    // MODAL HELPERS
    $scope.loginModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl : 'templates/loginModal.html',
            controller : 'MainCtrl.Modal',
            scope : $scope
        });

        modalInstance.result.then(function(cartCount) {
            $scope.session = Cookies.getSession();
            $scope.cartCount = cartCount;
        }, function() {
        });
    };

    // CART HELPERS
    $scope.add = function (productId) {
        Cookies.add(productId);
        $scope.cartCount = Cookies.getCartCount();
    };
    $scope.remove = function (productId) {
        Cookies.remove(productId);
        $scope.cartCount = Cookies.getCartCount();
    };
    $scope.clear = function () {
        Cookies.clear();
    };
    $scope.get = function () {
        console.log(Cookies.getCart());
    };

    // NAVIGATION
    Products.getCategories()
    .then(function (result) {
        $scope.categories = result;
    });
}])

.controller('MainCtrl.Modal', function($scope, $modalInstance, $location, Cookies, Account, Products) {
    $scope.login = function(userLogin) {
        Account.login(userLogin)
        .then(function (user) {
            var cart = Cookies.getCart();
            var cartCount;
            if (cart == null || cart.length == 0) {
                cartCount = Cookies.getDbCart()
                .then(function (cart) {
                    var newCart = {};
                    newCart.products = cart;
                    newCart.username = user.username;
                    newCart.products = Products.initMerge(cart);
                    console.log("MainCTRL", newCart);
                    Cookies.setCart(newCart);
                    return Cookies.getCartCount();
                })
                .catch(function (err) {
                    console.log(err);
                });

            } else {
                cartCount = Cookies.save(user.username)
                .then(function (cart) {
                    var newCart = {};
                    newCart.products = cart;
                    newCart.username = user.username;
                    console.log("MainCTRL:", newCart);
                    Cookies.setCart(newCart);
                    return Cookies.getCartCount();
                })
                .catch(function (err) {
                    console.log(err);
                });
            }
            Cookies.createSession(user);
            $location.path('/account').replace();
            $modalInstance.close(cartCount);
        }).catch(function (err) {
            $scope.error = 'Either your username or password did not match our records. Please try again.';
        });
    };

    $scope.cancel = function() {
        $scope.user = null;
        $scope.error = null;
        $modalInstance.dismiss();
    };
});


