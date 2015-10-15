'use strict';
angular.module('gwazoo.controllers', [])

.controller('MainCtrl', function($scope, $location, Account, Cookies) {
    $scope.date = new Date();

    var loggedIn = Cookies.getSession();
    if (loggedIn) {
        $scope.session = loggedIn.user;
    }

    $scope.logout = function() {
        Cookies.removeCookie("Session");
        $scope.session = Cookies.getSession();  //getSession == null
        Account.logout()
        .then(function (nullUser) {
            $scope.user = nullUser;
        })
        .catch(function (err) {
            console.log("There was an error logging out.");
        });
    };

    // MODAL HELPERS
    $scope.loginModal = function() {
        var modalInstance = $modal.open({
            templateUrl : 'templates/loginModal.html',
            controller : 'MainCtrl.Modal'
        });

        modalInstance.result.then(function() {
            $scope.session = Cookies.getSession().user;
        }, function() {
        });
    };

    // CART HELPERS (more functions in Cookies service)
    $scope.addToCart = function () {
        Cookies.addToCart();
    }
    $scope.getCart = function () {
        Cookies.getCart();
    }
    $scope.clearAllCookies = function () {
        Cookies.clearAllCookies();
    }

    // NAVIGATION
    Products.getCategories()
    .then(function (result) {
        $scope.categories = result;
    });
});