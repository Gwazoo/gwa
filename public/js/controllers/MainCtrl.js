'use strict';
angular.module('gwazoo.controllers')

.controller('MainCtrl', ['$scope', '$location', '$modal', '$templateCache', 'Account', 'Cookies', 'Products', function($scope, $location, $modal, $templateCache, Account, Cookies, Products) {
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
}])

.controller('MainCtrl.Modal', function($scope, $modalInstance, $location, Cookies, Account) {
    $scope.login = function(userLogin) {
        Account.login(userLogin)
        .then(function (userObj) {
            console.log($scope.date);
            // if (userObj.loggedIn) $location.path('/account').replace();
            // var cartData = Cookies.getCart();  //null or cart object
            // if (cartData) {
            //     Cookies.saveCartToDb(cartData)
            //     .then(function () {
            //         Cookies.removeCookie("Cart");   
            //     })
            //     .catch(function (err) {
            //         console.log(err);
            //     });
            // };
            // Cookies.createSession(userObj);
            // $modalInstance.close();
        }).catch(function (err) {
            $scope.error = 'Either your username or password did not match our records. Please try again.';
        });
    };

    $scope.cancel = function() {
        $scope.user = null;
        $scope.error = null;
        $modalInstance.dismiss();
    };
});


