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
        if(item.quantity === undefined) {
            item.quantity = 1;
        }
        Cookies.add(item).then(function(cart) {
            $scope.$parent.cartCount = Cookies.getCartCount();
        });
    };
    
    Products.getProduct($stateParams.id)
    .then(function (result) {
        // console.log("product:", result);
        // console.log("item:", result);
        if (result.optionSets !== false) {
            var options = [];
            // console.log(result);
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
            // console.log("$scope.options:", options);
            $scope.options = options;
            $scope.product = result;
            $scope.item = result;
        }
    });
    
    //When an option is selected
    $scope.$watchCollection('itemOptions.options', function (val, oldVal) {
        //val is current option name and value, oldVal is previous option name and value
        if (val !== oldVal && val !== undefined) {  //if a new valid option is selected
            // console.log(val);
            Products.getProductOptions($scope.options, val, $scope.product)
            .then(function (result) {
                $scope.options = result.options;
                $scope.item = result.item;
            });
        }
    });
}]);

