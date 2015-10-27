'use strict';
angular.module('gwazoo.controllers')

.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', 'Account', 'Orders', function($scope, $rootScope, $location, Account, Orders) {
	$scope.email = {};
	$scope.email.prevEmail = "";
	$scope.email.newEmail = "";

	$scope.password = {};
	$scope.password.prevPassword = "";
	$scope.password.newPassword = "";

	$scope.updateEmail = function (emailObj) {
		Account.updateEmail(emailObj)
		.then(function (res) {
			$scope.emailMessage = res.message;
		}).catch(function (err) {

		});
	};

	$scope.updatePassword = function (passwordObj) {
		Account.updatePassword(passwordObj)
		.then(function (res) {
			$scope.passwordMessage = res.message;
		}).catch(function (err) {

		});
	};

	$scope.viewOrders = function () {
		Orders.viewOrders()
		.then(function (orders) {
			$scope.orders = orders;
		}).catch(function (err) {

		});
	};

}]);


