'use strict';
angular.module('gwazoo.controllers')

.controller('HomeCtrl', ['$scope', '$rootScope', 'Account', function($scope, $rootScope, Account) {
    // FAKE DATA
    var count = 18;
    var data = [];
    while(count) {
        data[count] = count--;
    };

    $scope.displayed = 6;
    $scope.shiftleft = function() {
      $scope.displayed += 6;  
    };
    $scope.shiftRight = function () {
      $scope.displayed -= 6;  
    };

    $scope.data = data;
}]);


