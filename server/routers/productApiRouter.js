process.env.TMPDIR = 'temp';

var Express               = require('express');
var	Api                   = require('../controls/productControl');
var Root                  = require('../util/config');
var fs                    = require('fs');
var mkdirp                = require('mkdirp');
var Path                  = require('path');
var multipart             = require('connect-multiparty');
var multipartMiddleware   = multipart();
var flow                  = require('./../util/flow-node.js')('temp');

var productRouter = Express.Router();

//path => /api/product
productRouter.get('/', Api.getAll);

productRouter.get('/tag/:tag', Api.getByTag);

//path => /api/product/create
productRouter.post('/create', Api.prodCreate);

productRouter.post('/update', Api.update);

productRouter.post('/images', multipartMiddleware, function(req, res) {
	//TODO: Use ProductID in query to update with images

	// console.log("Req.body:", req.body);
	
  flow.post(req, function(status, filename, original_filename, identifier) {
    // console.log('POST', status, original_filename, identifier);

    var oldPath = Path.join(Root + 'temp/' + identifier);
    var newPath = Path.join(Root + '/public/images/' + req.user.username);

    mkdirp(newPath, function(err) { 
		if (err) {
			console.log(err);
		} else {
			newPath = newPath + '/' + Date.now() + Path.extname(req.body.flowFilename);
			fs.rename(oldPath, newPath, function (err) {
				if (err) {  //file doesn't exist or can't be read (called for each chunk)
					return res.status(status).send();
				} else {  //will only be called once per file
			    	return res.status(status).send(newPath);    	
				}
			});
		}
    });
  });
});

productRouter.options('/images', function(req, res){
  // console.log('OPTIONS');

  res.status(200).send();
});

// Handle status checks on chunks through Flow.js
productRouter.get('/images', function(req, res) {
  flow.get(req, function(status, filename, original_filename, identifier) {
    // console.log('GET', status);

    if (status == 'found') {
      status = 200;
    } else {
      status = 204;
    }

    res.status(status).send();
  });
});

productRouter.get('/download/:identifier', function(req, res) {
  flow.write(req.params.identifier, res);
});




productRouter.get('/:id', Api.get);


module.exports = productRouter;
