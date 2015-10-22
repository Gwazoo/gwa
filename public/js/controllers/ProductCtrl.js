'use strict';
angular.module('gwazoo.controllers')

.controller('ProductCtrl', ['$scope', '$rootScope', 'breadcrumbs', 'Products', function($scope, $rootScope, breadcrumbs, Products) {
    $scope.details = {
        images: [
            {
                imageSmall: 'img/preview-small-img1.png',
                imageLarge: 'img/preview-large-img1.jpg'
            },
            {
                imageSmall: 'img/preview-small-img2.png',
                imageLarge: 'img/preview-large-img2.jpg'
            },
            {
                imageSmall: 'img/preview-small-img3.png',
                imageLarge: 'img/preview-large-img3.jpg'
            },
            {
                imageSmall: 'img/preview-small-img4.png',
                imageLarge: 'img/preview-large-img4.jpg'
            }
        ],
        name: 'Whirlpool duet steam front load washer',
        description: 'Keep clothes looking newer longer with the Whirlpool 4.3 cu. ft. front load washer. Using adaptive wash actions and a concentrated solution of He detergent the Cold Wash cycle gently lifts stains and soils from fabrics to deliver the best care for your clothes. Precision Dispense takes the guesswork out of adding detergent bleach and other additives by releasing them at the correct time during the cycle for optimal fabric care. Detergent mixes with water to penetrate fabrics and virtually eliminate pretreating. Tap Touch controls allow direct access to cycles and options like the TumbleFresh option. It keeps clothes fresh and reduces wrinkles by tumbling clothes after the cycle\'s end for up to 6 hours',
        price: '965.50',
        retailPrice: '1846.23',
        rate: '4.8'
    };
}])

// .directive('ngElevateZoom', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             console.log("Linking");

//             //Will watch for changes on the attribute
//             attrs.$observe('zoomImage',function(){
//                 linkElevateZoom();
//             });
      
//             function linkElevateZoom() {
//                 //Check if its not empty
//                 if (!attrs.zoomImage) return;
//                 element.attr('data-zoom-image',attrs.zoomImage);
//                 $(element).elevateZoom();
//             }
//             linkElevateZoom();
//         }
//     };
// });


