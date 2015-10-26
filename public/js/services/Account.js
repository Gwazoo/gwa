'use strict';
angular.module('gwazoo.services')

.service('Account', function ($q, $http, $location, $rootScope, $modal) {
	var user = '';

	this.login = function(loginObj) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/auth', 
			data: loginObj
		}).success(function(user) {
			deferred.resolve(user);
		}).error(function(err) {
			console.log(err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.register = function (userObj) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/create', 
			data: userObj
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
		}).success(function (username) {
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

	this.updateEmail = function (emailObj) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/update/email', 
			data: emailObj
		}).success(function (res) {
			deferred.resolve(res);
		}).error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	this.updatePassword = function (passwordObj) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/update/password', 
			data: passwordObj
		}).success(function (res) {
			deferred.resolve(res);
		}).error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}
});


