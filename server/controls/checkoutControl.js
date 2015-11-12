var thinky			= require('../util/thinky');
var r 				= require('rethinkdb');
// var categoryModel 	= require('./../models/categoryModel.js').categoryModel;
// var category 		= require('./../models/categoryModel.js').category;
// var productModel = require('./../models/productModel.js').productModel;

// categoryModel.hasAndBelongsToMany(productModel, 'products', 'id', 'id');
var Request         = require('request');
var Authorize       = require('../util/authorize');


module.exports = {
	authPayment : function (req, res) {   
		// console.log(req.body);
		var transaction = authPaymentInfo(req.body);
		Request.post({
		  headers: {'content-type' : 'application/json'},
		  url:     'https://apitest.authorize.net/xml/v1/request.api',
		  body:    transaction
		}, function(err, response, body){
		if (err) {
			//handle error
		} else {
			res.send(body);
		}
		});
	},
	chargePayment : function (req, res) {   
		// console.log(req.body);
		var transaction = chargeAuthedPayment(req.body);
		Request.post({
		  headers: {'content-type' : 'application/json'},
		  url:     'https://apitest.authorize.net/xml/v1/request.api',
		  body:    transaction
		}, function(err, response, body){
		if (err) {
			//handle error
		} else {
			res.send(body);
		}
		});
	}
};




function authPaymentInfo ()/*(data)*/ {
	//placeholder data
	var data = {
		refId: "123456",
		amount: "1337",
		cardNumber: "4007000000027",
		expirationDate: "1220",
		cardCode: "999",
		tax: {
		    amount: "4.26",
		    name: "level2 tax name"  //Required
		},
		duty: {
		    amount: "8.55",
		    name: "duty name"		            
		},
		shipping: {
		    amount: "4.26",
		    name: "level2 tax name"
		},
		billTo: {
			firstName: "Ellen",
			lastName: "Johnson",
			company: "Souveniropolis",
			address: "14 Main Street",
			city: "Pecan Springs",
			state: "TX",
			zip: "44628",
			country: "USA"
		},
		shipTo: {
		    firstName: "China",
		    lastName: "Bayles",
		    company: "Thyme for Tea",
		    address: "12 Main Street",
		    city: "Pecan Springs",
		    state: "TX",
		    zip: "44628",
		    country: "USA"
		}
	};
	//end placeholder

	return JSON.stringify({
	    "createTransactionRequest": {
	        "merchantAuthentication": {
	            "name": Authorize.name,
	            "transactionKey": Authorize.transactionKey
	        },
	        "refId": data.refId,  //Optional
	        "transactionRequest": {
	            "transactionType": "authOnlyTransaction",
	            "amount": data.amount,  //Amount of transaction. No dollar sign
	            "payment": {
	                "creditCard": {
	                    "cardNumber": data.cardNumber,                    
	                    "expirationDate": data.expirationDate,
	                    "cardCode": data.cardCode
	                }
	            }
	        }
	    }
	});
}

function chargeAuthedPayment (data) {

	return JSON.stringify({
	    "createTransactionRequest": {
	        "merchantAuthentication": {
	            "name": Authorize.name,
	            "transactionKey": Authorize.transactionKey
	        },
	        "refId": data.refId,  //Optional
	        "transactionRequest": {
	            "transactionType": "priorAuthCaptureTransaction",
	            "amount": data.amount,  //Amount of transaction. No dollar sign
	            "refTransId": data.refTransId
	        }
	    }
	});
}

// module.exports = {
// 	makePayment : function (req, res) {   
// 		// console.log(req.body);
// 		var transaction = createTransaction(req.body);
// 		Request.post({
// 		  headers: {'content-type' : 'application/json'},
// 		  url:     'https://apitest.authorize.net/xml/v1/request.api',
// 		  body:    transaction
// 		}, function(err, response, body){
// 		if (err) {
// 			//handle error
// 		} else {
// 			res.send(body);
// 		}
// 		});
// 	}
// };


// function createTransaction ()/*(data)*/ {
// 	//placeholder data
// 	var data = {
// 		refId: "123456",
// 		amount: "1337",
// 		cardNumber: "4007000000027",
// 		expirationDate: "1220",
// 		cardCode: "999",
// 		tax: {
// 		    amount: "4.26",
// 		    name: "level2 tax name"  //Required
// 		},
// 		duty: {
// 		    amount: "8.55",
// 		    name: "duty name"		            
// 		},
// 		shipping: {
// 		    amount: "4.26",
// 		    name: "level2 tax name"
// 		},
// 		billTo: {
// 			firstName: "Ellen",
// 			lastName: "Johnson",
// 			company: "Souveniropolis",
// 			address: "14 Main Street",
// 			city: "Pecan Springs",
// 			state: "TX",
// 			zip: "44628",
// 			country: "USA"
// 		},
// 		shipTo: {
// 		    firstName: "China",
// 		    lastName: "Bayles",
// 		    company: "Thyme for Tea",
// 		    address: "12 Main Street",
// 		    city: "Pecan Springs",
// 		    state: "TX",
// 		    zip: "44628",
// 		    country: "USA"
// 		}
// 	};
// 	//end placeholder

// 	return JSON.stringify({
// 		    "createTransactionRequest": {
// 		        "merchantAuthentication": {
// 		            "name": Authorize.name,
// 		            "transactionKey": Authorize.transactionKey
// 		        },
// 		        "refId": data.refId,  //Optional
// 		        "transactionRequest": {
// 		            "transactionType": "authCaptureTransaction",
// 		            "amount": data.amount,  //Amount of transaction. No dollar sign
// 		            "payment": {
// 		                "creditCard": {
// 		                    "cardNumber": data.cardNumber,                    
// 		                    "expirationDate": data.expirationDate,
// 		                    "cardCode": data.cardCode
// 		                }
// 		            },
// 		            "tax": {
// 		                "amount": data.tax.amount,
// 		                "name": data.tax.name  //Required
// 		            },
// 		            "duty": {
// 		                "amount": data.duty.amount,
// 		                "name": data.duty.name		            
// 		            },
// 		            "shipping": {
// 		                "amount": data.shipping.amount,
// 		                "name": data.shipping.name
// 		            },
// 		            "billTo": {
// 		                "firstName": data.billTo.firstName,
// 		                "lastName": data.billTo.lastName,
// 		                "company": data.billTo.company,
// 		                "address": data.billTo.address,
// 		                "city": data.billTo.city,
// 		                "state": data.billTo.state,
// 		                "zip": data.billTo.zip,
// 		                "country": data.billTo.country
// 		            },
// 		            "shipTo": {
// 		                "firstName": data.shipTo.firstName,
// 		                "lastName": data.shipTo.lastName,
// 		                "company": data.shipTo.company,
// 		                "address": data.shipTo.address,
// 		                "city": data.shipTo.city,
// 		                "state": data.shipTo.state,
// 		                "zip": data.shipTo.zip,
// 		                "country": data.shipTo.country
// 		            },
// 		            "customerIP": "192.168.1.1",
// 		            "transactionSettings": {
// 		                "setting": {
// 		                    "settingName": "testRequest",
// 		                    "settingValue": "false"
// 		                }
// 		            }
// 		        }
// 		    }
// 		});
// }