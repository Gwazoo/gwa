'use strict';
angular.module('gwazoo.controllers')

.controller('SignupCtrl', ['$scope', '$rootScope', '$location', 'Account', 'Cookies', function($scope, $rootScope, $location, Account, Cookies) {
	$scope.register = function (userData) {
		var cart = Cookies.getCart();
		userData.cart = cart;

		Account.register(userData)
		.then(function (user) {
			//TODO: Set cart cookie, get cartCount and add to scope
			// Cookie.setCart(cart);
			// $scope.$parent.cartCount = Cookie.getCartCount();
		    $scope.$parent.session = user;
		    Cookies.createSession(user);
			$location.path("/account").replace();
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
}]);


