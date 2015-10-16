'use strict';
angular.module('gwazoo.controllers')

.controller('MainCtrl', ['$scope', '$location', '$modal', '$templateCache', 'Account', 'Cookies', 'Products', function($scope, $location, $modal, $templateCache, Account, Cookies, Products) {
    $scope.date = new Date();

    //Check session and initialize cart
    $scope.session = Cookies.getSession();
    $scope.cart = Cookies.getCart();
    if ($scope.cart == null) {
        $scope.cart = Cookies.newCart();
    }

    $scope.logout = function() {
        Cookies.removeCookie("Session");
        $scope.session = null;
        $scope.cart = Cookies.clear($scope.cart);
        $scope.cart.member = false;
        $scope.cart.username = "";
        Account.logout()
        .then(function (nullUser) {
            $scope.user = nullUser;
        })
        .catch(function (err) {
            console.log("There was an error logging out.");
        });
    };

    // MODAL HELPERS
    $scope.loginModal = function() {
        var modalInstance = $modal.open({
            templateUrl : 'templates/loginModal.html',
            controller : 'MainCtrl.Modal',
            scope : $scope
        });

        modalInstance.result.then(function() {
            $scope.session = Cookies.getSession();
        }, function() {
        });
    };

    // CART HELPERS
    $scope.cart.add = function (cart, productId) {
        $scope.cart = Cookies.add(cart, productId);
    };
    $scope.cart.remove = function (cart, productId) {
        $scope.cart = Cookies.remove(cart, productId);
    };
    $scope.cart.increment = function (cart, productId) {
        $scope.cart = Cookies.increment(cart, productId);
    };
    $scope.cart.decrement = function (cart, productId) {
        $scope.cart = Cookies.decrement(cart, productId);
    };
    $scope.cart.clear = function (cart) {
        $scope.cart = Cookies.clear(cart);
    };

    // NAVIGATION
    Products.getCategories()
    .then(function (result) {
        $scope.categories = result;
    });
}])

.controller('MainCtrl.Modal', function($scope, $modalInstance, $location, Cookies, Account) {
    $scope.login = function(userLogin) {
        Account.login(userLogin)
        .then(function (user) {
            if (typeof $scope.cart.products[0] != undefined) {
                Cookies.save($scope.cart.products, user.username)
                .then(function (cart) {  
                    $scope.cart = Cookies.setCart(cart);
                })
                .catch(function (err) {
                    console.log(err);
                });
            };
            Cookies.createSession(user);
            $location.path('/account').replace();
            $modalInstance.close();
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


