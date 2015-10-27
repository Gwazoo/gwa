'use strict';
angular.module('gwazoo.services')

.service('Orders', function ($q, $http, $location, $rootScope, $uibModal) {
	this.getCategories = function () {
	    var deferred = $q.defer();
	    $http({
	        method: 'GET',
	        url: '/api/orders/member'
	    }).success(function (res) {
	        deferred.resolve(res);
	    }).error(function (err) {
	        console.log('Services Err:', err);
	        deferred.reject(err);
	    });
	    return deferred.promise;
	};
})