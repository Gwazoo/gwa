var Express        = require('express');
var	Api            = require('../controls/apiControl');
var Root           = require('../util/config');

var accountRouter = Express.Router();

//All account routes are protected
accountRouter.use(Api.isAuthed);

//path => /account
accountRouter.all('/', function(req, res, next){  
	res.sendFile('index.html', { root: Root + "/public"});
});

module.exports = accountRouter;