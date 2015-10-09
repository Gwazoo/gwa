var util 		= require('../util/thinky');
var thinky 		= require('thinky')(util.config);
var r 			= require('rethinkdb');
// var productModel 	= require('./../models/productModel.js');

module.exports = {
	/*
	* @param {Obj} req
	*	Express request object
	* @param {Obj} res
	*	Express reponse object
	* @returns {Obj} JSON with status message.
	*/
	prodCreate : function (req, res) {
		console.log("Control req.body:", req.body);
	    // var productObj = new productModel(req.body);  //create new user object
	    var productObj = req.body;
        // try{  //attempt to validate the new user
            // productObj.validate();  //validate the user object using the model
 		    r.connect(thinky._config, function (err, connection) {  //connect to db
 		    	if (err) throw err; 	
    		    r.table('products').insert(productObj)  //save updated form data to db
    			.run(connection, function(err, result) {
    				if (err) { 
    					return res.status(500).send("Error Message:", err); 
    				} else {
	    				console.log("Product Created.");
						return res.json({
							added: true,
							message: "A new product was successfully created!",
							product: productObj
						});
					}
 		    	});
 			});
        // }
        // catch(err) {  //if the user does not validate
        // 	console.log("Failed validation:", err.message);
        //     return res.json(  //this response will be handled by services.js
        //     	{
        //     		added: false,
        //     		message: "The product was not validated. " + err.message,
        //     		user: null
        //     	}); 
        // }
	}
};