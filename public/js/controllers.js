'use strict';
angular.module('gwazoo.controllers', [])

.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = scope.prodObj.flow.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
                // console.log("Fired!", scope.prodObj.flow.files);
            });
        }
    };
})

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

.controller('DashboardCtrl', function($scope, $rootScope, Products) {
	// var flow = new Flow({
	// 	target:'/api/product/upload'
	// });
	// // Flow.js isn't supported, fall back on a different method
	// if(!flow.support) {
	// 	$('.flow-error').show();
	// 	return;
	// };
	$scope.files = [];

   //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
        	//add the file object to the scope's files collection
        	$scope.files.push(args.file);
        });
        console.log("Scope:", $scope.files);
    });

    $scope.initCategories = function () {
    	Products.getCategories()
    	.then(function (result) {
    		console.log("Controller Result:", result);
    		$scope.categories = result;
    	}).catch(function (err) {
    		console.log("Err:", err);
    	});
    };


	$scope.addProduct = function (productInfo, e) {
		// productInfo.images = imgsArr;
		// console.log(productInfo);
		e.upload();
		Products.addProduct(productInfo)
		.then(function (prod) {
			$scope.prod.name = '';
			$scope.prod.description = '';
			$scope.prod.price = '';
			$scope.prod.salePrice = '';
			$scope.success = 'Your product was successfully added!';
		}).catch(function (err) {
			$scope.error = 'There seems to be a problem with adding your product.';
		});
	};
	
})

.controller('CategoryCtrl', function($scope, $rootScope) {
	$scope.test = 'category controller';
	$scope.test2 = 'search result ctrl same as category ctrl';
})

.controller('ProductCtrl', function($scope, $rootScope, Products) {
	$scope.test = 'product controller';
})
