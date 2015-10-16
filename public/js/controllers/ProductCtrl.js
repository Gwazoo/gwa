'use strict';
angular.module('gwazoo.controllers')


.controller('ProductCtrl', ['$scope', '$rootScope', 'Products', function($scope, $rootScope, Products) {
	$scope.test = 'product controller';
}]);


