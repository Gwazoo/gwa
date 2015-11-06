'use strict';
angular.module('gwazoo.controllers')

.controller('CategoryCtrl', ['$scope', '$rootScope', '$stateParams', 'Products', function($scope, $rootScope, $stateParams, Products) {
    // $scope.rate = 4.2;
    // $scope.max = 5;
    // $scope.isReadonly = true;
    $scope.itemOptions = {options:[]};
    $scope.options = [];
    $scope.item = {};

    // console.log($stateParams);
    Products.getCategoryProducts($stateParams.id)
    .then(function (result) {
        console.log(result);
        $scope.category = result.name;
        $scope.products = result.products;
        console.log(result.products[0].images[0].large.url);
    });
}]);


