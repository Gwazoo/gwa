'use strict';
angular.module('gwazoo.controllers')

.controller('HomeCtrl', ['$scope', '$rootScope', 'Account', function($scope, $rootScope, Account) {
	$scope.test = 'Home Controller is Awesome';
}]);


