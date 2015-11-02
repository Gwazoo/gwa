'use strict';
angular.module('gwazoo.controllers')

.controller('DashboardCtrl', ['$scope', '$http', '$rootScope', 'Products', 'Orders', function($scope, $http, $rootScope, Products, Orders) {
	$scope.product = {};
	$scope.product.categories = [];

    $scope.files = {};
    $scope.config = {
    	query: function () {
    		var formData = JSON.stringify($scope.product);
    		return { 
    			formData: formData
    		};
    	}
    }
    $scope.upload = function () {
    	$scope.config.query();
    	$scope.files.flow.upload();
    }

    $scope.initCategories = function () {
    	Products.getCategories()
    	.then(function (result) {
    		console.log("Categories:", result);
    		$scope.categories = result;
    		$scope.subCat =[];
    	}).catch(function (err) {
    		console.log("Err:", err);
    	});
    };

    /*
     * 1. addProduct() sends a POST with the product form data
     * 2. upload() is called on success and posts the image files 
          asynchronously
     * 3. As they finish uploading, they trigger submitForm() which
          takes the upload() res and pushes the image urls to an array
     * 4. The array is used to batch update the product with the image urls
     */
	$scope.addProduct = function (productInfo, files) {
		if (files.flow.files.length === 0) {
			console.log("You must add an image before uploading a product.");
		} else {
			productInfo.categories.push($scope.categories.mainCat.id);
			// productInfo.categories.push($scope.categories.subCat.id);
			// productInfo.categories.push($scope.categories.subSubCat.id);
			
			Products.addProduct(productInfo)
			.then(function (productObj) {
				$scope.product = [];
				console.log("productObj:", productObj);
				$scope.product.id = productObj.id;
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
		console.log($scope.files.urls);
		if ($scope.files.flow.files.length === $scope.files.urls.length) {
			var productObj = {
                id: $scope.product.id,
                images: []
			};
            $scope.files.urls.forEach(function(url) {
                var primary = false;
                if (primary)
                    primary = true;
                productObj.images.push({url: url, isPrimary: primary});
            });
			Products.updateProduct(productObj)
			.then(function (productObj) {
				console.log("updateProduct: Product Updated.");
				$scope.success = 'Your product was successfully updated!';
			}).catch(function (err) {
				$scope.error = 'There seems to be a problem with adding your product.';
			});
		}
	};
	
	$scope.$watch('categories.mainCat', function (val) {
		if(val != null || val != undefined) {
			$scope.subCat = val.children;
		}
		$scope.subSubCat = [];
	});
	$scope.$watch('categories.subCat', function (val) {
		if(val != null || val != undefined) {
			$scope.subSubCat = val.children;
		}
	});

}]);


