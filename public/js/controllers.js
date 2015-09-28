'use strict';
angular.module('gwazoo.controllers', [])

.controller('MainCtrl', function($scope) {
	$scope.test = 'main controller';
})

.controller('HomeCtrl', function($scope, $rootScope, Account) {
	$scope.test = 'home controller';
})

.controller('SignupCtrl', function($scope, $rootScope) {
	$scope.test = 'sign-up controller';
})

.controller('DashboardCtrl', function($scope, $rootScope) {
	$scope.test = 'dashboard controller';
})

.controller('CategoryCtrl', function($scope, $rootScope) {
	$scope.test = 'category controller';
	$scope.test2 = 'search result ctrl same as category ctrl';
})

.controller('ProductCtrl', function($scope, $rootScope) {
	$scope.test = 'product controller';
})