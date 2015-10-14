'use strict';
angular.module('gwazoo.controllers')

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