'use strict';
angular.module('gwazoo', ['gwazoo.controllers', 'gwazoo.services', 'ngRoute', 'ngAnimate', 'ng-breadcrumbs', 'LocalStorageModule', 'flow', 'ui.bootstrap'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: './templates/home.html',
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
		.when('/search-result', {
			templateUrl: './templates/searchResult.html',
			controller: 'CategoryCtrl'
		})
		.when('/category/:slug?/:id', {
			templateUrl: './templates/categoryProducts.html',
			controller: 'CategoryCtrl'
		})
		.when('/product/:slug?/:sku?/:id', {
			templateUrl: './templates/productDetails.html',
			controller: 'ProductCtrl'
		})
		.when('/cart', {
			templateUrl: './templates/cart/cart.html',
			controller: 'CartCtrl'
		})
		.when('/cart-checkout', {
			templateUrl: './templates/cart/cartCheckout.html',
			controller: 'CartCtrl'
		})
		.when('/order-confirmation', {
			templateUrl: './templates/cart/orderConfirmation.html',
			controller: 'CartCtrl'
		})
		.when('/test', {
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
})

.config(['flowFactoryProvider', function (flowFactoryProvider) {
	flowFactoryProvider.defaults = {
		target: '/api/product/images',
		permanentErrors:[500, 501],
		maxChunkRetries: 1,
		chunkRetryInterval: 5000,
		simultaneousUploads: 3,
		query: {
			id: 'id',
			source: 'flow_query'
		}
	};
	// flowFactoryProvider.on('catchAll', function (event) {
	// 	console.log('catchAll', arguments);
	// });
	// flowFactoryProvider.on('fileAdded', function (file){
	// 	var fileExt = file.getExtension();
	// 	console.log(file)
	// });
}])

