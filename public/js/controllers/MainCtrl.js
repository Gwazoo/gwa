'use strict';
angular.module('gwazoo.controllers')

.controller('MainCtrl', ['$scope', '$location', '$modal', '$templateCache', 'Account', 'Cookies', 'Products', function($scope, $location, $modal, $templateCache, Account, Cookies, Products) {
    $scope.date = new Date();

    //Check session and initialize cart
    $scope.session = Cookies.getSession();
    $scope.cartCount = Cookies.getCartCount();

    $scope.logout = function() {
        Cookies.clearAllCookies();
        $scope.session = null;
        $scope.cartCount = 0;
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
    }

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
                    Cookies.setCart(cart);
                    Cookies.getCartCount();
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


