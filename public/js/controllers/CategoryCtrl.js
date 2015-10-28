'use strict';
angular.module('gwazoo.controllers')

.controller('CategoryCtrl', ['$scope', '$rootScope', '$stateParams', 'Products', function($scope, $rootScope, $stateParams, Products) {
    
    console.log($stateParams);
    Products.getCategoryProducts($stateParams.id)
    .then(function (result) {
        // console.log(result);
        $scope.category = result.name;
        $scope.products = result.products;
        $scope.image = result.image;
    });
}]);


