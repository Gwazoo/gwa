// var Express        = require('express');
// // var Multer		   = require('multer');
// var	Api            = require('../controls/productControl');
// var Root           = require('../util/config');

// var productRouter = Express.Router();

// var upload = Multer({ dest: Root + '/temp/test'}).array('files');

// //path => /api/product
// // productRouter.post('/', upload.array('files'), Api.prodCreate);
// productRouter.post('/', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       // An error occurred when uploading
//       return res.status(500).send("Error");
//     }
//     console.log("req.files:", req.files);
//     console.log("req.body:", req.body);
//     res.send("Hello world!");
//   });
// });
// // productRouter.delete('/', Api.prodDelete);

// module.exports = productRouter;
