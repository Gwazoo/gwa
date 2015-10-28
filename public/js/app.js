'use strict';
angular.module('gwazoo', ['gwazoo.controllers', 'gwazoo.services', 'ngAnimate', 'ngRoute', 'ng-breadcrumbs', /*'angular.morris-chart',*/ 'uiRouterStyles', 'ui.router', 'ui.bootstrap', 'LocalStorageModule', 'flow'])

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
            url: '/:slug/:sku/:id',
            templateUrl: './templates/productDetails.html',
            controller: 'ProductCtrl'
        })


        .state('account', {
            url: '/account',
            abstract: true,
            templateUrl: './templates/admin/dashboard.html',
            data: {
                css: ['css/admin.css', 'css/plugin/morris.css']                
            }
        })
        .state('account.admin', {
            url: '',
            views: {
              'content': {
                templateUrl: './templates/admin/admin.html',
                controller: 'DashboardCtrl'
              }
            }
        })
        .state('account.product', {
            url: '/product',
            views: {
              'content': {
                templateUrl: './templates/admin/product.html',
                controller: 'DashboardCtrl'
              }
            }
        })
        .state('account.orders', {
            url: '/order-history',
            views: {
              'content': {
                templateUrl: './templates/admin/order-history.html',
                controller: 'DashboardCtrl'
              }
            }
        })
        .state('account.pending', {
            url: '/orders-pending',
            views: {
              'content': {
                templateUrl: './templates/admin/orders-pending.html',
                controller: 'DashboardCtrl'
              }
            }
        })
        .state('account.shipped', {
            url: '/orders-shipped',
            views: {
              'content': {
                templateUrl: './templates/admin/orders-shipped.html',
                controller: 'DashboardCtrl'
              }
            }
        })
        .state('account.forms', {
            url: '/forms',
            views: {
              'content': {
                templateUrl: './templates/admin/forms.html',
                controller: 'DashboardCtrl'
              }
            }
        })
        .state('account.profile', {
            url: '/profile',
            views: {
              'content': {
                templateUrl: './templates/admin/profile.html',
                controller: 'SettingsCtrl'
              }
            }
        })
        .state('account.settings', {
            url: '/settings',
            views: {
              'content': {
                templateUrl: './templates/admin/settings.html',
                controller: 'SettingsCtrl'
              }
            }
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


