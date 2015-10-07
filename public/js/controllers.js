'use strict';
angular.module('gwazoo.controllers', [])

.controller('MainCtrl', function($scope, $location, Account, Cookies) {

	$scope.logout = function() {
		Cookies.removeCookie("Session");
		$scope.session = Cookies.getSession();  //getSession == null
		Account.logout()
		.then(function (nullUser) {
			$scope.user = nullUser;
		})
		.catch(function (err) {
			console.log("There was an error logging out.");
		});
	};

	$scope.login = function(userLogin) {
		Account.login(userLogin)
		.then(function (userObj) {
			if (userObj.loggedIn) $location.path('/account').replace();
			
			var cartData = Cookies.getCart();  //null or cart object
			if (cartData) {
				Cookies.saveCartToDb(cartData)
				.then(function () {
					Cookies.removeCookie("Cart");	
				})
				.catch(function (err) {
					console.log(err);
				});
			}
			Cookies.createSession(userObj);
			$scope.session = Cookies.getSession().user;

		}).catch(function (err) {

		});
	};

	$scope.cancel = function() {
		$scope.user = null;
	};

	// CART HELPERS (more functions in Cookies service)
	$scope.addToCart = function () {
		Cookies.addToCart();
	}
	$scope.getCart = function () {
		Cookies.getCart();
	}
	$scope.clearAllCookies = function () {
		Cookies.clearAllCookies();
	}
})

.controller('HomeCtrl', function($scope, $rootScope, Account) {
	$scope.test = 'home controller';
})

.controller('SignupCtrl', function($scope, $rootScope, $location, Account) {
	$scope.register = function (userData) {
		Account.register(userData)
		.then(function (user) {
			// user object with following properties:
			// "added"    = boolean - whether user was successfully added
			// "message"  = string - status message
			// "dbRes"     = obj or null - response from db
			console.log(user);
			if (user.added) {
				$location.path("/account").replace();
			}
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
