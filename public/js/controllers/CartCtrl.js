'use strict';
angular.module('gwazoo.controllers')

.controller('CartCtrl', ['$scope', '$rootScope', 'Cookies', function($scope, $rootScope, Cookies) {

    function getCart() {
        var cartProducts= Cookies.getCart();
        console.log(cartProducts);
        for (var i = 0; i < cartProducts.length; i++) {
            var cartItem = cartProducts[i];
        };
        console.log(cartItem);
        $scope.cart = cartItem;
        console.log($scope.cart);
    };
    getCart();

}]);


