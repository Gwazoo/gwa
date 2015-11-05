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
		// if (files.flow.files.length === 0) {
		// 	console.log("You must add an image before uploading a product.");
		// } else {
			// productInfo.categories.push($scope.categories.mainCat.id);
			// productInfo.categories.push($scope.categories.subCat.id);
			// productInfo.categories.push($scope.categories.subSubCat.id);
			
			var testProduct = {
				categories:['8332f4ef-e262-43ea-86be-dd17afc1ffbe'],
				motherProduct:
				{
				    vendor: "Sky Vendor",
				    name: "Air Jordan's",
				    description: "The World's Best Athletic Shoe. Ever", // Full description
				    shortDescription: "Basketball Shoe", // Short description for display on search pages
				    supplyPrice: "5.00", // The price we pay for it
				    retailPrice: "10.00", // The price we sell the product for
				    shippingPrice: "flat", // Flat rate shipping price
				    shippingType: "2.50", // Free Shipping, Flat Rate Shipping, Calculated Shipping
				    msrp: "15.00", // Suggested Retail Price
				    stockQuantity: 25, // Amount of product in stock
				    minQuantity: 1, // Minimum quantity to add to cart
				    maxQuantity: 10, // Maximum quantity to add to cart
				    sku: "123456", // Vendor's SKU for the product
				    images: [{
				            small: {
				                url: "http://www.wufashion.com/sport/wp-content/uploads/2015/01/nike-air-jordans-12.jpg",
				                isPrimary: true
				            },
				            large: {
				                url: "http://www.wufashion.com/sport/wp-content/uploads/2015/01/nike-air-jordans-12.jpg"
				            }
				    }],
				    additionalInfo: [{ // Array of Objects that contain key and value
				            name: "Additional Info: Name", // Additional Info Key
				            value: "Additional Info: Value" // Additional Info Value
				    }],
				    isActive: true,

				    items: [{
				        additionalInfo: [{ // Array of Objects that contain key and value
				            name: "Additional Info: Name", // Additional Info Key
				            value: "Additional Info: Value" // Additional Info Value
				    	}],
				        description: 'Blue Nikes',
				        images: [{
				            small: {
				                url: "http://www.wufashion.com/sport/wp-content/uploads/2015/01/nike-air-jordans-12.jpg",
				                isPrimary: true
				            },
				            large: {
				                url: "http://www.wufashion.com/sport/wp-content/uploads/2015/01/nike-air-jordans-12.jpg"
				            }
				    	}],
				        isActive: true,
				        maxQuantity: 10,
				        minQuantity: 1,
				        name: 'Blue Nike',
				        options: {
				        	size: "medium",
				        	color: "blue"
				        },
				        shortDescription: 'Blue Nike',
				        sku: '654321',
				        stockQuantity: 20,
				        vendor: 'Sky Vendor' 
				    }]
				},
				optionSet: "9c9f100f-b775-4a8f-9ac9-611581e1da02"
			};

			Products.addProduct(testProduct)
			.then(function (productObj) {
				// $scope.product = [];
				// console.log("productObj:", productObj);
				// $scope.product.id = productObj.id;
				// $scope.upload();
				// $scope.success = 'Your product was successfully added!';
			}).catch(function (err) {
				$scope.error = 'There seems to be a problem with adding your product.';
			});
		// }
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


