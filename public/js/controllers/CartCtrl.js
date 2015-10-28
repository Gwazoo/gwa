'use strict';
angular.module('gwazoo.controllers')

.controller('CartCtrl', ['$scope', '$rootScope', 'Cookies', function($scope, $rootScope, Cookies) {

    function getCart() {
        var cartProducts = Cookies.getCart();
        console.log(cartProducts);
        for (var i = 0; i < cartProducts.products.length; i++) {
            var cartItem = cartProducts.products[i];
            if (cartItem === null) {
                $scope.cartQuantity = 0;
            } else {
                $scope.cartQuantity = cartItem.quantity;
            };
        };
        console.log(cartItem);
        $scope.cart = cartProducts.products;
        console.log($scope.cart);
    };
    getCart();

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

}]);


