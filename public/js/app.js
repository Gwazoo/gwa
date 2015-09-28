'use strict';
angular.module('gwazoo', ['ngRoute', 'gwazoo.controllers', 'gwazoo.services'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './templates/home.html',
			controller: 'HomeCtrl'
		})
		.when('/sign-up', {
			templateUrl: './templates/signup.html',
			controller: 'SignupCtrl'
		})
		.when('/account', {
			templateUrl: './templates/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.when('/category/:slug/', {
			templateUrl: './templates/categoryProducts.html',
			controller: 'CategoryCtrl'
		})
		.when('/product/:sku/', {
			templateUrl: './templates/productDetails.html',
			controller: 'ProductCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode(true);
});