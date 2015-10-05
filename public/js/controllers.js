'use strict';
angular.module('gwazoo.controllers', [])

.controller('MainCtrl', function($scope, Account) {
	
})

.controller('LoginCtrl', function($scope, $location, Account) {
	$scope.login = function (userLogin) {
		Account.login(userLogin)
		.then(function (result){
			$scope.user.username = "";
			$scope.user.password = "";
			$location.path("/account");
		}).catch(function (err){

		});
	}
})

.controller('HomeCtrl', function($scope, $rootScope, Account) {
	$scope.test = 'home controller';
})

.controller('SignupCtrl', function($scope, $rootScope, $location, Account) {
	$scope.userResult = {};
	$scope.register = function (userData) {
		Account.register(userData)
		.then(function (user) {
			// user object with following properties:
			// "added"    = boolean - whether user was successfully added
			// "message"  = string - status message
			// "dbRes"     = obj or null - response from db
			$scope.userResult = user;  //DEBUG
			console.log(user);
			if (user.added) $location.path("/account");
		}).catch(function (err) {
			$scope.userResult = err;  //DEBUG
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