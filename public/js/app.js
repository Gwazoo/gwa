'use strict';
angular.module('gwazoo', ['gwazoo.controllers', 'gwazoo.services', 'ngAnimate', 'ngRoute', 'uiRouterStyles', 'ui.router', 'ng-breadcrumbs', 'LocalStorageModule', 'flow', 'ui.bootstrap'])

.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url:  '/',
            templateUrl: './templates/home.html',
            controller: 'HomeCtrl'
        })
        .state('registration', {
            url: '/register',
            templateUrl: './templates/signup.html',
            controller: 'SignupCtrl'
        })
        .state('search', {
            url: '/search-result',
            templateUrl: './templates/searchResult.html',
            controller: 'CategoryCtrl'
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

        
        .state('category', {
            url: '/category/:slug/:id',
            templateUrl: './templates/categoryProducts.html',
            controller: 'CategoryCtrl'
        })
        .state('product', {
            url: '/product-details/:id',
            templateUrl: './templates/productDetails.html',
            controller: 'ProductCtrl'
        })


        .state('account', {
            abstract: true,
            url: '/account',
            templateUrl: './templates/admin/dashboard.html',
            data: {
                css: ['css/admin.css', 'css/plugin/morris.css']                
            }
        })
        .state('account.admin', {
            url: '/:id',
            templateUrl: './templates/admin/admin.html',
            controller: 'SettingsCtrl'
        })
        .state('account.profile', {
            url: '/profile',
            templateUrl: './templates/admin/blank-page.html',
            controller: 'SettingsCtrl'
        })
        .state('account.orders', {
            url: 'order-history',
            templateUrl: './templates/admin/blank-page.html',
            controller: 'SettingsCtrl'
        })
        .state('account.charts', {
            url: '/charts',
            templateUrl: './templates/admin/charts.html',
            controller: 'SettingsCtrl'
        })
        .state('account.forms', {
            url: '/forms',
            templateUrl: './templates/admin/forms.html',
            controller: 'SettingsCtrl'
        })
        .state('account.tables', {
            url: '/tables',
            templateUrl: './templates/admin/tables.html',
            controller: 'SettingsCtrl'
        })
        .state('account.product', {
            url: '/product',
            templateUrl: './templates/admin/product.html',
            controller: 'DashboardCtrl'
        })


        .state('test', {
            url: '/test',
            templateUrl: './templates/cart/orderConfirmation.html',
            controller: 'CartCtrl'
        })
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


