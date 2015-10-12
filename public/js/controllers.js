'use strict';
angular.module('gwazoo.controllers', [])

// .directive('fileUpload', function () {
//     return {
//         scope: true,        //create a new scope
//         link: function (scope, el, attrs) {
//             el.bind('change', function (event) {
//                 // var files = scope.prodObj.flow.files;
//                 //iterate files since 'multiple' may be specified on the element
//                 // for (var i = 0;i<files.length;i++) {
//                     //emit event upward
//                     scope.$emit("uploadComplete", scope.prodObj.flow.files);
//                 // }                                       
//                 console.log(scope.prodObj.flow.files[0].file);
//             });
//         }
//     };
// })

.controller('MainCtrl', function($scope, $location, Account, Cookies) {

	$scope.logout = function() {
		Cookies.removeCookie("Session");
		$scope.session = Cookies.getSession();  //getSession == null
		Account.logout()
		.then(function (nullUser) {
			$scope.user = nullUser;
		})
		.catch(function (err) {
			console.log("There was an error logging out.");
		});
	};

	$scope.login = function(userLogin) {
		Account.login(userLogin)
		.then(function (userObj) {
			if (userObj.loggedIn) $location.path('/account').replace();
			
			var cartData = Cookies.getCart();  //null or cart object
			if (cartData) {
				Cookies.saveCartToDb(cartData)
				.then(function () {
					Cookies.removeCookie("Cart");	
				})
				.catch(function (err) {
					console.log(err);
				});
			}
			Cookies.createSession(userObj);
			$scope.session = Cookies.getSession().user;
		}).catch(function (err) {
			$scope.error = 'Your username and password did not match up together so please try again suka!';
		});
	};

	$scope.cancel = function() {
		$scope.user = null;
		$scope.error = null;
	};

	// CART HELPERS (more functions in Cookies service)
	$scope.addToCart = function () {
		Cookies.addToCart();
	}
	$scope.getCart = function () {
		Cookies.getCart();
	}
	$scope.clearAllCookies = function () {
		Cookies.clearAllCookies();
	}
})

.controller('HomeCtrl', function($scope, $rootScope, Account) {
	$scope.test = 'Home Controller is Awesome';
})

.controller('SignupCtrl', function($scope, $rootScope, $location, Account) {
	$scope.register = function (userData) {
		Account.register(userData)
		.then(function (user) {
			// user object with following properties:
			// "added"    = boolean - whether user was successfully added
			// "message"  = string - status message
			// "dbRes"     = obj or null - response from db
			console.log(user);
			if (user.added) $location.path("/account").replace();
		}).catch(function (err) {

		});
	};

	$scope.checkUsername = function(username) {
		var user = {
			username: username
		};
		Account.checkUsername(user)
		.then(function (result) {
			$scope.check = result;  //DEBUG
		}).catch(function (err) {
			$scope.check = err;  //DEBUG
		});
	};
})

.controller('DashboardCtrl', function($scope, $http, $rootScope, Products) {

    $scope.initCategories = function () {
    	Products.getCategories()
    	.then(function (result) {
    		$scope.categories = result;
    		$scope.subCat =[];
    	}).catch(function (err) {
    		console.log("Err:", err);
    	});
    };


	$scope.addProduct = function (productInfo, files) {
		if (files.flow.files.length === 0) {
			console.log("You must add an image before uploading a product.");
		} else {
			Products.addProduct(productInfo)
			.then(function (prod) {
				$scope.product = null;
				//TODO: Return ProductID from Rethink
				$scope.upload();
				$scope.success = 'Your product was successfully added!';
			}).catch(function (err) {
				$scope.error = 'There seems to be a problem with adding your product.';
			});
		}
	};


	$scope.files = {};
	$scope.upload = function () {  //post images
		$scope.files.flow.upload();
	};


	$scope.files.urls = [];
	$scope.submitForm = function (file, message, event) {
		// console.log("$message:", message);  //res.send ends up here
		if (message) $scope.files.urls.push(message);  //filters duplicates and adds to url array
		// console.log($scope.files.urls);
		if ($scope.files.flow.files.length == $scope.files.urls.length) {
			//TODO: Batch update product with image urls
		}
	};
	
	$scope.$watch('product.mainCat', function (val) {
		if(val != null || val != undefined) {
			$scope.subCat = val.children;
		}
		$scope.subSubCat = [];
	});
	$scope.$watch('product.subCat', function (val) {
		if(val != null || val != undefined) {
			$scope.subSubCat = val.children;
		}
	});
})

.controller('CategoryCtrl', function($scope, $rootScope) {
	$scope.test = 'category controller';
	$scope.test2 = 'search result ctrl same as category ctrl';
})

.controller('ProductCtrl', function($scope, $rootScope, Products) {
	$scope.test = 'product controller';
})
