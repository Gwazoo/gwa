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
		}).success(function(user) {
			$rootScope.$broadcast('updateUser');
			$location.path('/account').replace();
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
		}).success(function(res) {
			user = '';
			$rootScope.$broadcast('updateUser');
			$location.path('/').replace();
			deferred.resolve(user);
		});
		return deferred.promise;
	};
})

.service('Cookies', function(localStorageService) {
	var count = 0;
	var cart = {
		items: []
	};

	this.setCookies = function (options) {
		if (options.type == 'session') {
			localStorageService.cookie.set("Session", options.user);
		} else if (options.type == 'cart') {
			var item = {};
			item.id = count;
			item.quantity = Math.floor(Math.random() * 10)	
			cart.items.push(item);
			JSON.stringify(cart);
			console.log(cart);
			localStorageService.cookie.set("Cart", cart, 30);
			count++;
		}
	}

	this.clearCookies = function () {
		localStorageService.cookie.clearAll();
		cart = {
			items: []
		}
	}

	this.getCookies = function (options) {
		if (options.type == 'session') {
			console.log(localStorageService.cookie.get("Session"));
		} else if (options.type == 'cart') {
			console.log(localStorageService.cookie.get("Cart"));
		}
	}


})

