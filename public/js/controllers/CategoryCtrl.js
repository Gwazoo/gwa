'use strict';
angular.module('gwazoo.controllers')

.controller('CategoryCtrl', ['$scope', '$rootScope', '$stateParams', 'Products', function($scope, $rootScope, $stateParams, Products) {
    // $scope.max = 5;
    // $scope.isReadonly = true;
    // $scope.itemOptions = {options:[]};
    // $scope.options = [];
    // $scope.item = {};


    $scope.rate = 4.2;
    // console.log($stateParams);
    Products.getCategoryProducts($stateParams.id)
    .then(function (result) {
        console.log(result);
        $scope.category = result.name;
        $scope.products = result.products;
    });
}]);


