'use strict';
angular.module('gwazoo.controllers')

.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', 'formlyVersion', 'Account', 'Orders', function($scope, $rootScope, $location, formlyVersion, Account, Orders) {
// FORMLY TESTING
    var vm = this;
    vm.password = {};
    vm.passwordFields = [
        {
            key: 'oldPassword',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Old Password',
                placeholder: 'Old Password',
                required: true
            }
        },
        {
            key: 'newPassword',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'New Password',
                placeholder: 'New Password',
                required: true
            }
        },
        {
            key: 'confirmPassword',
            type: 'input',
            templateOptions: {
                type: 'password',
                label: 'Confirm Password',
                placeholder: 'Confirm Password',
                required: true
            }
        }
    ];

	// $scope.email = {};
	// $scope.email.prevEmail = "";
	// $scope.email.newEmail = "";

	// $scope.password = {};
	// $scope.password.prevPassword = "";
	// $scope.password.newPassword = "";

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





}]);


