'use strict';
angular.module('gwazoo.controllers')

.controller('CartCtrl', ['$scope', '$rootScope', 'Cookies', 'Products', function($scope, $rootScope, Cookies, Products) {
    $scope.cart = Cookies.getCart();
    // console.log($scope.cart);
    $scope.user = Cookies.getSession();
    // console.log($scope.user);
    $scope.checkoutCart = Cookies.getDbCart();
    console.log($scope.checkoutCart);
    $scope.$parent.cartCount = Cookies.getCartCount();

    $scope.range = function(min, max) {
        return Products.qtyRange(min, max);
    };

    $scope.remove = function(productId) {
        $scope.cart = Cookies.remove(productId);
        $scope.$parent.cartCount = Cookies.getCartCount();
    };


// HELPER FUNCTIONS
    $scope.cartTotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.cart.products.length; i++) {
            var product = $scope.cart.products[i];
            // console.log($scope.cart.products[i]);
            total += Math.round(product.product.retailPrice * product.quantity);
        }
        return total;
    };
    $scope.cartCount = function() {
        var cartCount = 0;
        cartCount = Cookies.getCartCount();
        // console.log(cartCount);
        return cartCount; 
    }
    $scope.clearCart = function () {
        $scope.cart = Cookies.clear();
    };
    $scope.updateCartItem = function(item) {
        console.log(item);
        if(item.quantity === undefined) {
            item.quantity = 1;
        }
        Cookies.update(item).then(function(cart) {
            $scope.$parent.cartCount = Cookies.getCartCount();
        });
        // $scope.cart = cart;
    };
}]);


