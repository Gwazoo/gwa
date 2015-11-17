'use strict';
angular.module('gwazoo.controllers')

.controller('CartCtrl', ['$scope', '$rootScope', '$uibModal', 'Cookies', 'Products', function($scope, $rootScope, $uibModal, Cookies, Products) {
    $scope.cart = Cookies.getCart();
    // console.log($scope.cart.products);
    $scope.user = Cookies.getSession();
    console.log($scope.user);
    $scope.address = $scope.user.addresses[0];
    console.log($scope.address);
    $scope.$parent.cartCount = Cookies.getCartCount();

    $scope.range = function(min, max) {
        return Products.qtyRange(min, max);
    };

    $scope.remove = function(productId) {
        $scope.cart = Cookies.remove(productId);
        $scope.$parent.cartCount = Cookies.getCartCount();
    };


// HELPER FUNCTIONS
    $scope.cartTotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.cart.products.length; i++) {
            var product = $scope.cart.products[i];
            // console.log($scope.cart.products[i]);
            total += Math.round(product.product.retailPrice * product.quantity);
        }
        return total;
    };
    $scope.shippingTotal = function() {
        var total = 0;
        for (var i = 0; i < $scope.cart.products.length; i++) {
            var product = $scope.cart.products[i];
            // console.log($scope.cart.products[i]);
            total += Math.round(product.product.shippingPrice);
        }
        return total;
    };
    $scope.cartCount = function () {
        var cartCount = 0;
        cartCount = Cookies.getCartCount();
        // console.log(cartCount);
        return cartCount; 
    }
    $scope.clearCart = function () {
        $scope.cart = Cookies.clear();
    };
    $scope.updateCartItem = function (item) {
        // console.log(item);
        if(item.quantity === undefined) {
            item.quantity = 1;
        }
        Cookies.update(item).then(function(cart) {
            $scope.$parent.cartCount = Cookies.getCartCount();
        });
        // $scope.cart = cart;
    };
    $scope.cartSubTotal = function () {
        var subTotal = 0;
        subTotal = $scope.cartTotal() + $scope.shippingTotal();
        return subTotal;
    };
    $scope.tax = function () {
        var tax = 0;
        // tax = $scope.cartSubTotal() + $scope.tax();
        // console.log(tax);
        return tax;
    };
    $scope.grandTotal = function () {
        var grandTotal = 0;
        grandTotal = $scope.cartSubTotal() + $scope.tax();
        // console.log(grandTotal);
        return grandTotal;
    };

// MODAL HELPERS
    $scope.addressAddModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl : 'templates/modals/addAddressModal.html',
            controller : 'CartCtrl.Modal',
            scope : $scope
        });

        modalInstance.result.then(function (user) {
            // console.log(user);
            // var user = Cookies.getSession();
            // $scope.shippingAddress = user.addresses[0];
            // console.log($scope.shippingAddress);
        }, function() {
        });
    };
}])

.controller('CartCtrl.Modal', function($scope, $modalInstance, Account) {
    $scope.addAddress = function(userAddress) {
        var user = user;
        var newAddresses = userAddress;
        console.log(userAddress);
        Account.addAddress(userAddress)
        .then(function (resUser) {
            console.log(resUser);
            $modalInstance.close(resUser);
        }).catch(function (err) {
            $scope.error = 'ERROR ERROR ERROR';
        });
    };

    $scope.cancel = function() {
        $scope.user.addresses = null;
        $scope.error = null;
        $modalInstance.dismiss();
    };
});


