'use strict';
angular.module('gwazoo.controllers')

.controller('SettingsCtrl', ['$scope', '$rootScope', '$location', 'formlyVersion', 'Account', 'Orders', function($scope, $rootScope, $location, formlyVersion, Account, Orders) {
// FORMLY TESTING
    var vm = this;
    // funcation assignment
    vm.onSubmit = onSubmit;

    // variable assignment
    vm.env = getEnv();
    vm.model = {};
    vm.options = {formState: {}};
    vm.fields = getFields();
    vm.originalFields = angular.copy(vm.fields);

    // function definition
    function getFields() {
      // return your fields here
      return [
        {
          key: 'firstInput',
          type: 'input',
          templateOptions: {
            label: 'Input',
            placeholder: 'Formly is terrific!'
          },
          expressionProperties: {
            'templateOptions.label': 'model[options.key] || "Input"'
          }
        },
        {
          key: 'text',
          type: 'checkbox',
          templateOptions: {
            label: 'Hidden box'
          },
          hideExpression: '!model.firstInput'
        }
      ];
    }


    function onSubmit() {
      vm.options.updateInitialValue();
      alert(JSON.stringify(vm.model), null, 2);
    }

    function getEnv() {
      return {
        angularVersion: angular.version.full,
        formlyVersion: formlyVersion
      };
    }



    
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


