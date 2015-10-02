'use strict';
angular.module('gwazoo.controllers', [])

.controller('MainCtrl', function($scope, Account) {
	$scope.login = function(userLogin) {
		Account.login(userLogin);
	}
})

.controller('HomeCtrl', function($scope, $rootScope, Account) {
	$scope.test = 'home controller';
})

.controller('SignupCtrl', function($scope, $rootScope, $location, Account) {
	$scope.userResult = {};
	$scope.register = function(userData) {
		Account.register(userData)
		.then(function (result) {
			$scope.userResult = result;
			$location.path("/account");
		}).catch(function (err) {
			$scope.userResult = err;
		});
	}
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