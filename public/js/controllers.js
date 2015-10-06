'use strict';
angular.module('gwazoo.controllers', [])

.controller('MainCtrl', function($scope, Account, localStorageService) {
	$scope.user = Account.returnUser();
	$scope.$on('updateUser', function() {
		$scope.user = Account.returnUser();
	});
	$scope.logout = function() {
		$scope.user.data = '';
		$scope.clearCookies();
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

	var count = 0;
	var cart = {
		username: null,
		items: []
	};

	$scope.setCookies = function () {
		var item = {};
		item.id = count;
		item.quantity = Math.floor(Math.random() * 10)
		if ($scope.user.data) {
			cart.username = $scope.user.data.username;
		}		
		cart.items.push(item);
		JSON.stringify(cart);
		console.log(cart);
		localStorageService.cookie.set("Cart", cart);
		count++;
	}

	$scope.clearCookies = function () {
		localStorageService.cookie.clearAll();
		cart = {
			username: null,
			items: []
		}
	}

	$scope.getCookies = function () {
		if ($scope.user.data) {
			cart.username = $scope.user.data.username;
			localStorageService.cookie.set("Cart", cart);
		}
		var cartCookie = localStorageService.cookie.get("Cart");
		console.log(cartCookie);
	}

})

.controller('HomeCtrl', function($scope, $rootScope, Account) {
	$scope.test = 'home controller';
})

.controller('SignupCtrl', function($scope, $rootScope, Account) {
	$scope.register = function (formData) {
		$scope.result = "Creating new user...";
		Account.register(formData)  //services.js => server.js => apiControl.js (create)
		.then(function (resultMessage) {
			$scope.user.result = resultMessage;
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
