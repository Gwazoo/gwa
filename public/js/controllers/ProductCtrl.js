'use strict';
angular.module('gwazoo.controllers')

.controller('ProductCtrl', ['$scope', '$rootScope', 'breadcrumbs', 'Products', 'Cookies', function($scope, $rootScope, breadcrumbs, Products, Cookies) {
    $scope.rate = 4.2;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };
    
    $scope.add = function (productId) {
        Cookies.add(productId);
        $scope.cartCount = Cookies.getCartCount();
    };

    $scope.tester = {  
       "optionSet":{  
          "name":"New Shirt",
          "options":[  
             {  
                "name":"Color",
                "variations":[  
                   "Blue",
                   "Green",
                   "Red"
                ]
             },
             {  
                "name":"Size",
                "variations":[  
                   "Small",
                   "Medium",
                   "Large"
                ]
             }
          ]
       },
       "additionalInfo":[  
          {  
             "name":"Cool?",
             "value":"Yes!"
          }
       ],
       "categories":[  
          {  
             "id":"8332f4ef-e262-43ea-86be-dd17afc1ffbe",
             "name":"Clothing, Shoes & Jewelry"
          }
       ],
       "created":"2015-10-22T16:52:30.515Z",
       "description":"A shirt that you wear",
       "id":"18dbebcd-8c5a-476b-b84b-f15232235337",
       "images":[  
          {  
             "large":{  
                "url":"http://www.jamesbondlifestyle.com/sites/default/files/styles/fancybox_popup/public/images/product/cl014-sunspel-grey-shirt.jpg",
                "isPrimary":false
             },
             "small":{  
                "isPrimary":true,
                "url":"http://www.jamesbondlifestyle.com/sites/default/files/styles/fancybox_popup/public/images/product/cl014-sunspel-grey-shirt.jpg"
             }
          }
       ],
       "isActive":true,
       "items":[  
          {  
             "additionalInfo":[  
                {  
                   "name":"Cool?",
                   "value":"Very!"
                }
             ],
             "created":"2015-10-22T17:11:46.448Z",
             "description":"A blue shirt that you wear",
             "id":"4b4d8ddb-d836-44fd-9d06-dc55b52f7327",
             "images":[  
                {  
                   "largeImage":{  
                      "url":"http://tattoolicious.com/assets/uploads/images/T-Shirt.jpg",
                      "isPrimary":false
                   },
                   "smallImage":{  
                      "isPrimary":true,
                      "url":"http://tattoolicious.com/assets/uploads/images/T-Shirt.jpg"
                   }
                }
             ],
             "isActive":true,
             "maxQuantity":10,
             "minQuantity":1,
             "modified":"2015-10-22T17:11:46.448Z",
             "name":"Blue Shirt",
             "options":{  
                "color":"Blue",
                "size":"Medium"
             },
             "parentId":"18dbebcd-8c5a-476b-b84b-f15232235337",
             "shortDescription":"A blue shirt",
             "sku":"1Z2X3CB",
             "stockQuantity":20,
             "vendor":"anewtest"
          }
       ],
       "maxQuantity":10,
       "minQuantity":1,
       "modified":"2015-10-22T16:52:30.515Z",
       "msrp":"15.00",
       "name":"Shirt",
       "optionSetId":"9c9f100f-b775-4a8f-9ac9-611581e1da02",
       "retailPrice":"10.00",
       "shippingPrice":"2.50",
       "shippingType":"flat",
       "shortDescription":"A shirt",
       "sku":"1Z2X3C",
       "stockQuantity":100,
       "supplyPrice":"5.00",
       "vendor":"anewtest"
    };
    console.log($scope.tester);
}]);


