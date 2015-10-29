'use strict';
angular.module('gwazoo.controllers')

.controller('CartCtrl', ['$scope', '$rootScope', 'Cookies', 'Products', function($scope, $rootScope, Cookies, Products) {

$scope.cart = Cookies.getCart();
$scope.user = Cookies.getSession();
$scope.$parent.cartCount = Cookies.getCartCount();
$scope.range = function(min, max) {
    return Products.qtyRange(min, max);
};
$scope.remove = function(productId) {
    $scope.cart = Cookies.remove(productId);
    $scope.$parent.cartCount = Cookies.getCartCount();
};

}]);


