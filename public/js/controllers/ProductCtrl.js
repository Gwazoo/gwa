'use strict';
angular.module('gwazoo.controllers')

.controller('ProductCtrl', ['$scope', '$rootScope', 'breadcrumbs', 'Products', function($scope, $rootScope, breadcrumbs, Products) {
    $scope.productDets = {
        images: [{
            image1: {
                imageSmall: 'img/preview-small-img1.png',
                imageLarge: 'img/preview-large-img1.jpg'
            },
            image2: {
                imageSmall: 'img/preview-small-img2.png',
                imageLarge: 'img/preview-large-img2.jpg'
            },
            image3: {
                imageSmall: 'img/preview-small-img3.png',
                imageLarge: 'img/preview-large-img3.jpg'
            },
            image4: {
                imageSmall: 'img/preview-small-img4.png',
                imageLarge: 'img/preview-large-img4.jpg'
            }
        }],
        name: 'Whirlpool duet steam front load washer',
        price: '965.50',
        rate: '4.8'
    };
}])

.directive('ngElevateZoom', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('zoomImage', function() {
                linkElevateZoom();
            })
            function linkElevateZoom() {
                if(!attrs.zoomImage) return;
                element.attr('data-zoom-image', attrs.zoomImage);
                $(element).elevateZoom();
            }
            linkElevateZoom();
        }
    };
});


