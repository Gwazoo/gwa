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
			var resObj = {
				loggedIn: true,
				message: "User was successfully logged in.",
				user: user
			}
			$rootScope.$broadcast('updateUser');
			deferred.resolve(resObj);
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

	this.checkUsername = function(username) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/username', 
			data: username
		}).success(function (res) {
			var username = res;
			deferred.resolve(username);
		}).error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.getUser = function() {
		$http.get('api/currentUser').then(function(res) {
			// console.log(res);
			user = res.data;
			$rootScope.$broadcast('updateUser');
		});
	};
	this.getUser();

	this.returnUser = function() {
		return user;
	};

	this.logout = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'api/logout'
		}).success(function (res) {
			user = '';
			$rootScope.$broadcast('updateUser');
			$location.path('/').replace();
			deferred.resolve(user);
		});
		return deferred.promise;
	};
})

.service('Products', function($q, $http, $rootScope) {
	this.addProduct = function (productInfo) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: 'api/product',
			data: productInfo
		}).success(function (res) {
			console.log('product Added:', res);
			deferred.resolve(res.data);
		})
		return deferred.promise;
	};
	
	this.getProduct = function() {

	}
})

.service('Cookies', function($q, $http, localStorageService) {
	var count = 0;
	var cart = {
		products: []
	};

	this.createSession = function (sessionData) {
		localStorageService.cookie.set("Session", sessionData);
	}

	this.addToCart = function () {
		var item = {};
		item.id = count;
		item.quantity = Math.floor(Math.random() * 10)	
		cart.products.push(item);
		JSON.stringify(cart);
		console.log(cart);
		localStorageService.cookie.set("Cart", cart, 30);
		count++;
	}

	this.clearAllCookies = function () {
		localStorageService.cookie.clearAll();
		cart = {
			products: []
		}
	}

	this.removeCookie = function (cookieId) {
		localStorageService.cookie.remove(cookieId);
	}

	this.getSession = function () {
		console.log(localStorageService.cookie.get("Session"));
		return localStorageService.cookie.get("Session");
	}

	this.getCart = function () {
		console.log(localStorageService.cookie.get("Cart"));
		return localStorageService.cookie.get("Cart");
	}

	this.saveCartToDb = function(cartData) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/cart', 
			data: cartData
		}).success(function(resObj) {
			// {
			// 	added: false,
			// 	message: "Previous session found.",
			// 	result: result
			// }
			console.log("services.js:", resObj);
			deferred.resolve(resObj);
		}).error(function(err) {
			console.log(err);
			deferred.reject(err);
		});
		return deferred.promise;
	};
})

