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
	$scope.test = 'Home Controller is Awesome';
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

.controller('DashboardCtrl', function($scope, $rootScope, Products) {
	$scope.addProduct = function (productInfo) {
		console.log($scope.prod);
		Products.addProduct(productInfo)
		.then(function () {
			$scope.prod.name = '';
			$scope.prod.description = '';
			$scope.prod.price = '';
			$scope.prod.salePrice = '';
			$scope.prod.images = '';
		}).catch(function (err) {

		});
	};
})

.controller('CategoryCtrl', function($scope, $rootScope) {
	$scope.test = 'category controller';
	$scope.test2 = 'search result ctrl same as category ctrl';
})

.controller('ProductCtrl', function($scope, $rootScope, Products) {
	$scope.test = 'product controller';
})
