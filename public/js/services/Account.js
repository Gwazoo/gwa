'use strict';
angular.module('gwazoo.services')

.service('Account', function ($q, $http, $location, $rootScope, $modal) {
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

	/*
	* @param {Obj} formData
	*	Object containing all the info from form
	* @returns {Obj} res
	*   "added"    => boolean - whether user was successfully added
	*	"message"  => string - status message
	*	"user"     => obj or null - response from db
	*/
	this.register = function (formData) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/user/create', 
			data: formData
		}).success(function(resObj) {
			if (resObj.added) {
				user = resObj.user;
				$location.path('/account').replace();
				$rootScope.$broadcast('updateUser');
				deferred.resolve(resObj.message);
			} else {
				deferred.resolve(resObj.message);
			}
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
			user = null;  //clear out user data
			$location.path('/').replace();
			deferred.resolve(user);
		});
		return deferred.promise;
	};
});


