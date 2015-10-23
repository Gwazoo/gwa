'use strict';
angular.module('gwazoo.services')

.service('Account', function ($q, $http, $location, $rootScope, $uibModal) {
	var user = '';

	this.login = function(userLogin) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/auth', 
			data: userLogin
		}).success(function(user) {
			deferred.resolve(user);
		}).error(function(err) {
			console.log(err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.register = function (userData) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/create', 
			data: userData
		}).success(function(user) {
			deferred.resolve(user);
		}).error(function (err) {
			console.log("Err", err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.checkUsername = function (username) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/username', 
			data: username
		}).success(function (res) {
			var username = res;
			deferred.resolve(username);
		}).error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.logout = function () {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/user/logout'
		}).success(function(res) {
			deferred.resolve();
		});
		return deferred.promise;
	};
});


