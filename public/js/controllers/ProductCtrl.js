'use strict';
angular.module('gwazoo.controllers')

.controller('ProductCtrl', ['$scope', '$rootScope', '$stateParams', 'breadcrumbs', 'Products', 'Cookies', function($scope, $rootScope, $stateParams, breadcrumbs, Products, Cookies) {
    $scope.rate = 4.2;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.itemOptions = {options:[]};
    $scope.options = [];
    $scope.item = {};

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };
    
    $scope.add = function (item) {
            Cookies.add(item.id);
            $scope.cartCount = Cookies.getCartCount();
    };
    
    Products.getProduct($stateParams.id)
    .then(function (result) {
        if (result.optionSets !== false) {
            var options = [];
            result.optionSets.options.forEach(function (option){
                var variations = [];
                option.variations.forEach(function (variation) {
                    variations.push({
                        name: option.name,
                        value: variation
                    });
                });
                options.push({
                    name: option.name,
                    type: option.type,
                    variations: variations
                });
            });
            $scope.options = options;
            $scope.product = result;
        }
    });
    
    $scope.$watchCollection('itemOptions.options', function (val, oldVal) {
        if (val !== oldVal && val !== undefined) {
            Products.getProductOptions($scope.options, val, $scope.product)
            .then(function (result) {
                $scope.options = result.options;
                $scope.item = result.item;
            });
        }
    });
}]);

