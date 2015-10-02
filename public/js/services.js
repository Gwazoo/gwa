'use strict';
angular.module('gwazoo.services', [])

.service('Account', function($q, $http, $location, $rootScope) {
	var user = '';

	this.login = function(userLogin) {
		var deferred = $q.defer();
		$http.post('/api', userLogin).then(function(res) {
			user = res;
			deferred.resolve(res);
		}).catch(function(err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.register = function(userData) {
		// var deferred = $q.defer();
		// console.log(userData);
		$http({
			method: 'POST',
			url: '/api/create', 
			data: userData
		}).success(function(res) {
			console.log("Res:",res);
			user = res;
			// deferred.resolve(res);
		}).error(function(err) {
			console.log("Err:",err);
			// deferred.reject(err);
		});
		// return deferred.promise;
	};
})

