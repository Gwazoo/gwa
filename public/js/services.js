'use strict';
angular.module('gwazoo.services', [])

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
})

.service('Products', function ($q, $http, $rootScope) {
	this.addProduct = function (productInfo) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/product/create',
			data: productInfo
		}).success(function (res) {
			console.log('product Added:', res);
			deferred.resolve(res);
		})
		return deferred.promise;
	};
	
	this.getCategories = function () {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/category'
		}).success(function (res) {
			deferred.resolve(res);
		}).error(function (err) {
			console.log('Services Err:', err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.getProducts = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/product'
		}).success(function (res) {
			deferred.resolve(res.data);
		}).error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};
	
	this.updateProduct = function (productObj) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/product/update',
			data: productObj
		}).success(function (res) {
			deferred.resolve(res.data);
		}).error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	};

	this.getCategoryProducts = function (param) {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: '/api/category/' + param
		}).success(function (res) {
			deferred.resolve(res);
		}).error(function (err) {
			console.log('Services Err:', err);
			deferred.reject(err);
		});
		return deferred.promise;
	}
})

.service('Cookies', function ($q, $http, localStorageService) {

	this.getSession = function () {
		return localStorageService.cookie.get("Session");
	};

	this.getCart = function () {
		return localStorageService.cookie.get("Cart");
	};

	this.newCart = function () {
		console.log("Creating cart...");
		var newCart = {
			member: false,
			username: "", 
			products: []
		};
	 	return setCart(newCart);
	};

	this.clear = function (cart) {
		cart.products = [];
		updateDb(cart);
		return this.setCart(cart);
	}

	this.add = function (cart, productId) {
		if (typeof cart.products[0] == undefined) {
			pushToCart(cart, productId);
		} else {
			var index = getProductIndex(cart.products, productId);
			if (index == -1) {
				pushToCart(cart, productId);
			} else {
				cart.products[index].quantity += 1;
			}
		}
		return this.setCart(cart);
	};

	this.remove = function (cart, productId) {
		var index = getProductIndex(cart.products, productId);
		cart.products.splice(index, 1);
		return this.setCart(cart);
	};

	this.increment = function (cart, productId) {
		var index = getProductIndex(cart.products, productId);	
		cart.products[index].quantity += 1;
		return this.setCart(cart);
	};

	this.decrement = function (cart, productId) {
		var index = getProductIndex(cart.products, productId);	
		if (cart.products[index].quantity > 1) {
			cart.products[index].quantity -= 1;			
		} else {
			cart.products.splice(index, 1);
		}
		return this.setCart(cart);
	};

	this.setCart = function (cart) {
		localStorageService.cookie.set("Cart", cart, 30);
		return cart;
	};

	this.save = function (products, username) {
		var deferred = $q.defer();
		var data = {
			username: username,
			products: products
		};
		$http({
			method: 'POST',
			url: '/api/cart/save',  // MAKE SURE THIS IS THE RIGHT ENDPOINT!
			data: data
		}).success(function(cart) {  // Merged Cart
			deferred.resolve(cart);
		}).error(function(err) {
			console.log(err);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	//HELPER FUNCTIONS
	function getProductIndex(products, value) {
		return products.map(function(product) { return product.id; }).indexOf(value);
    }

    function pushToCart (cart, productId) {
		cart.products.push({
			id: productId,
			quantity: 1
		})
	}

	function updateDb (cart) {
		var deferred = $q.defer();
		if (cart.member) {
			$http({
				method: 'POST',
				url: '/api/cart/update',  // MAKE SURE THIS IS THE RIGHT ENDPOINT!
				data: cart.products
			}).success(function(res) {
				deferred.resolve(res);
			}).error(function(err) {
				console.log(err);
				deferred.reject(err);
			});			
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}

	// this.getCart = function () {
	// 	return localStorageService.cookie.get("Cart");
	// }

	this.createSession = function (sessionData) {
		localStorageService.cookie.set("Session", sessionData);
	}

	// this.addToCart = function () {
	// 	var cart = this.getCart();
	// 	var item = {};
	// 	item.id = count;
	// 	item.quantity = Math.floor(Math.random() * 10)	
	// 	cart.products.push(item);
	// 	JSON.stringify(cart);
	// 	console.log("Add To Cart:", cart);
	// 	localStorageService.cookie.set("Cart", cart, 30);
	// 	count++;
	// }

	this.clearAllCookies = function () {
		localStorageService.cookie.clearAll();
	}

	this.removeCookie = function (cookieId) {
		localStorageService.cookie.remove(cookieId);
	}

	// this.getCart = function () {
	// 	console.log("Cart:", localStorageService.cookie.get("Cart"));
	// 	return localStorageService.cookie.get("Cart");
	// }

	// this.saveCartToDb = function(cartData) {
	// 	var deferred = $q.defer();
	// 	$http({
	// 		method: 'POST',
	// 		url: '/api/cart', 
	// 		data: cartData
	// 	}).success(function(resObj) {
	// 		// {
	// 		// 	added: false,
	// 		// 	message: "Previous session found.",
	// 		// 	result: result
	// 		// }
	// 		console.log("Saved Cart:", resObj);
	// 		deferred.resolve(resObj);
	// 	}).error(function(err) {
	// 		console.log(err);
	// 		deferred.reject(err);
	// 	});
	// 	return deferred.promise;
	// };
})




