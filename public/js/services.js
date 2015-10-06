'use strict';
angular.module('gwazoo.services', [])

.service('Account', function($q, $http, $location, $rootScope) {
	var user = '';

	this.login = function(userLogin) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/auth', 
			data: userLogin
		}).then(function(res) {
			// console.log("Res:", res);
			user = res;
			$rootScope.$broadcast('updateUser');
			$location.path('/account').replace();
			deferred.resolve(user);
		}).catch(function(err) {
			// console.log(err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	/*
	* @param {Obj} formData
	*	Object containing all the info from form
	* @returns {Obj} res
	*   "added"    => boolean - whether user was successfully added
	*	"message"  => string - status message
	*	"user"     => obj or null - response from db
	*/
	this.register = function(formData) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/create', 
			data: formData
		}).success(function(res) {
			if (res.added) {
				user = res.user;
				$location.path('/account').replace();
				$rootScope.$broadcast('updateUser');
				deferred.resolve(res.message);
			} else {
				deferred.resolve(res.message);
			}
		}).error(function(err) {
			console.log("Err", err);
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
			var username = res;
			deferred.resolve(username);
		}).error(function(err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.getUser = function() {
		$http.get('api/currentUser').then(function(res) {
			console.log(res);
			user = res.data;
			$rootScope.$broadcast('updateUser');
		});
	};
	this.getUser();

	this.returnUser = function() {
		return user;
	}

	this.logout = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'api/logout'
		}).then(function(res) {
			user = '';
			$rootScope.$broadcast('updateUser');
			$location.path('/').replace();
			deferred.resolve(res);
		});
		return deferred.promise;
	};
})