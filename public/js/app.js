'use strict';
angular.module('gwazoo', ['gwazoo.controllers', 'gwazoo.services', 'ngAnimate', 'ngRoute', 'routeStyles', 'ui.router', 'ng-breadcrumbs', 'LocalStorageModule', 'flow', 'ui.bootstrap'])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('homePage', {
            url:  '/',
            templateUrl: './templates/home.html',
            controller: 'HomeCtrl'
        })
        .state('registration', {
            url: '/register',
            templateUrl: './templates/signup.html',
            controller: 'SignupCtrl'
        })
        .state('account', {
            url: '/account',
            templateUrl: './templates/admin/admin.html',
            controller: 'SettingsCtrl',
            css: ['css/admin.css', 'css/plugin/morris.css']
        })
            .state('account.profile', {
                url: '/account/profile',
                templateUrl: './templates/admin/blank-page.html',
                controller: 'SettingsCtrl',
                css: ['css/admin.css', 'css/plugin/morris.css']
            })
            .state('account.orders', {
                url: '/account/order-history',
                templateUrl: './templates/admin/blank-page.html',
                controller: 'SettingsCtrl',
                css: ['css/admin.css', 'css/plugin/morris.css']
            })


            .state('account.product', {
                url: '/account/product',
                templateUrl: './templates/dashboard.html',
                controller: 'DashboardCtrl'
            })
        .state('search', {
            url: '/search-result',
            templateUrl: './templates/searchResult.html',
            controller: 'CategoryCtrl'
        })
        .state('category', {
            url: '/category/:slug?/:id',
            templateUrl: './templates/categoryProducts.html',
            controller: 'CategoryCtrl'
        })
        .state('product', {
            url: '/product/:slug?/:sku?/:id',
            templateUrl: './templates/productDetails.html',
            controller: 'ProductCtrl'
        })
        .state('cart', {
            url: '/cart',
            templateUrl: './templates/cart/cart.html',
            controller: 'CartCtrl'
        })
        .state('checkout', {
            url: '/cart-checkout',
            templateUrl: './templates/cart/cartCheckout.html',
            controller: 'CartCtrl'
        })
        .state('order-confirmation', {
            url: '/order-confirmation',
            templateUrl: './templates/cart/orderConfirmation.html',
            controller: 'CartCtrl'
        })
        .state('test', {
            url: '/test',
            templateUrl: './templates/cart/orderConfirmation.html',
            controller: 'CartCtrl'
        })
    $urlRouterProvider.otherwise('/');
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
}])

.run(function($rootScope, $location) {
    $rootScope.location = $location;
});


