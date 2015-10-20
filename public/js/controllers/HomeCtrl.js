'use strict';
angular.module('gwazoo.controllers')

.controller('HomeCtrl', ['$scope', '$rootScope', 'Account', function($scope, $rootScope, Account) {
    $scope.totalProducts = 6;
    $scope.next = function(item) {

    }
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
        }
    ];
}])

.animation('.fade', [function() {
    return {
        enter: function(element, done) {
            element.css('display', 'none');
            $(element).fadeIn(1000, function() {
                done();
            });
        },
        leave: function(element, done) {
            $(element).fadeOut(1000, function() {
                done();
            });
        },
        move: function(element, done) {
            element.css('display', 'none');
            $(element).slideDown(500, function() {
                done();
            });
        }
    }
}]);


