'use strict';
angular.module('gwazoo.controllers')

.controller('HomeCtrl', ['$scope', '$rootScope', 'Account', function($scope, $rootScope, Account) {
    $scope.totalProducts = 6;

    $scope.products = [
        {
            image: 'img/product-img1.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        },
        {
            image: 'img/product-img2.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        },
        {
            image: 'img/product-img3.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        },
        {
            image: 'img/product-img4.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        },
        {
            image: 'img/product-img1.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        },
        {
            image: 'img/product-img2.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        },
        {
            image: 'img/product-img3.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        },
        {
            image: 'img/product-img4.png',
            name: 'awesome lap-top',
            price: '1999.50',
            rate: '4.8'
        }
    ];
}]);


