var Express        = require('express');
var	Api            = require('../controls/apiControl');
var	Passport       = require('passport');

var userRouter = Express.Router();

//path => /api/user
userRouter.get('/', /*Api.isAuthed,*/ Api.getAll);  //DEBUG METHOD ONLY


userRouter.post('/auth', Passport.authenticate('local'), function(req, res) {  //signup url
	return res.status(200).json(req.user);
});


userRouter.post('/create', Api.create);


userRouter.post('/username', Api.username);


userRouter.get('/read', Api.read);


userRouter.delete('/delete', Api.isAuthed, Api.delete);


userRouter.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});


module.exports = userRouter;