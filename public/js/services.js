'use strict';
angular.module('gwazoo.services', [])

.service('Account', function($q, $http, $rootScope) {
	var user = '';
	this.getUser = function() {
		return user;
	};

	this.logout = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'api/logout'
		}).success(function(res) {
			user = '';
			$rootScope.$broadcast('updateUser');
			deferred.resolve(user);
		});
		return deferred.promise;
	};

	this.login = function(userLogin) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/auth', 
			data: userLogin
		}).success(function(res) {
			console.log("Res:", res);
			user = res;
			$rootScope.$broadcast('updateUser');
			deferred.resolve(user);
		}).error(function(err) {
			console.log(err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.register = function(userData) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/create', 
			data: userData
		}).success(function(res) {
			console.log("Res:", res);
			user = res;
			$rootScope.$broadcast('updateUser');
			deferred.resolve(user);
		}).error(function(err) {
			console.log(err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.checkUsername = function(username) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/username', 
			data: username
		}).success(function(res) {
			user = res;
			deferred.resolve(user);
		}).error(function(err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};
})

