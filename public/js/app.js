'use strict';
angular.module('gwazoo', ['gwazoo.contollers', 'gwazoo.services'])

.config(function($routProvider) {
	$routProvider
		.when('/', {
			templateUrl: './templets/home.html',
			controller: 'HomeCtrl'
		})
		.when({
			
		})
		.otherwise({
			redirectTo: '/'
		});
})