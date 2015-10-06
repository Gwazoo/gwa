'use strict';
angular.module('gwazoo', ['ngRoute', /*'ngMaterial',*/ 'gwazoo.controllers', 'gwazoo.services', 'LocalStorageModule'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './templates/home.html',
			controller: 'HomeCtrl'
		})
		.when('/test', {
			templateUrl: './templates/index.html',
			controller: 'HomeCtrl'
		})
		.when('/register', {
			templateUrl: './templates/signup.html',
			controller: 'SignupCtrl'
		})
		.when('/account', {
			templateUrl: './templates/dashboard.html',
			controller: 'DashboardCtrl'
		})
		.when('/category', {
			templateUrl: './templates/categoryResult.html',
			controller: 'CategoryCtrl'
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
})
.config(function (localStorageServiceProvider) {
	localStorageServiceProvider
	.setPrefix('gwazoo')
	.setStorageCookie('session', '/');
});