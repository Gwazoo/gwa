'use strict';
angular.module('gwazoo.controllers', [])

.controller('MainCtrl', function($scope, Account) {
	$scope.user = Account.returnUser();
	$scope.$on('updateUser', function() {
		$scope.user = Account.returnUser();
	});
	$scope.logout = function() {
		Account.logout();
	};

	$scope.login = function(userLogin) {
		// console.log(userLogin);
		Account.login(userLogin)
		.then(function () {
			$scope.user.username = '';
			$scope.user.password = '';
		}).catch(function (err) {
			$scope.user.password = '';
		});
	};

	$scope.cancel = function() {
		$scope.user.username = '';
		$scope.user.password = '';
	};
})

.controller('HomeCtrl', function($scope, $rootScope, Account) {
	$scope.test = 'home controller';
})

.controller('SignupCtrl', function($scope, $rootScope, Account) {
	$scope.register = function (formData) {
		$scope.user.result = "Creating new user...";
		Account.register(formData)
		.then(function (result) {
			$scope.user.result = result.message;
		}).catch(function (err) {

		});
	};

	$scope.checkUsername = function(username) {
		var user = {
			username: username
		};
		Account.checkUsername(user)
		.then(function (result) {
			$scope.check = result;  //DEBUG
		}).catch(function (err) {
			$scope.check = err;  //DEBUG
		});
	};
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