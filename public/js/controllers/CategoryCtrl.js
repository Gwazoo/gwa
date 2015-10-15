'use strict';
angular.module('gwazoo.controllers')

.controller('CategoryCtrl', ['$scope', '$rootScope', '$routeParams', 'Products', function($scope, $rootScope, $routeParams, Products) {
    Products.getCategoryProducts($routeParams.id)
    .then(function (result) {
        // console.log(result);
        $scope.category = result.name;
        $scope.products = result.products;
        $scope.image = result.image;
    });
    $scope.test2 = 'search result ctrl same as category ctrl';
}]);


