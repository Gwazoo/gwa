'use strict';
angular.module('gwazoo', ['ngRoute', 'gwazoo.contollers', 'gwazoo.services'])

.config(function($routProvider) {
	$routProvider
		.when('/', {
			templateUrl: './templates/home.html',
			controller: 'HomeCtrl'
		})
		.when('/product/:sku', {
			templateUrl: './templates/productDetails.html',
			controller: 'ProductCtrl'
		})
		.when('/category/:slug', {
			templateUrl: './templates/categoryProducts.html',
			controller: 'CategoryCtrl'
		})
		.when('/account', {
			templateUrl: './templates/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.when('/sign-up', {
			templateUrl: './templates/signup.html',
			controller: 'SignupCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});