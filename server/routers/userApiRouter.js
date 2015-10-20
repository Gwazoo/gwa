var Express = require('express');
var Passport = require('passport');
var UserApi = require('../controls/userControl');
var Mailer = require('../util/mailer');
var template = require('../util/templates/confirmation');

var userRouter = Express.Router();

//path => /api/user
userRouter.get('/', UserApi.getAll);  //DEBUG METHOD ONLY


userRouter.post('/auth', Passport.authenticate('local'), function (req, res) {  //signup url
    return res.status(200).json(req.user);
});


userRouter.post('/create', UserApi.create);


userRouter.post('/username', UserApi.username);


userRouter.get('/read', UserApi.read);


userRouter.delete('/delete', UserApi.isAuthed, UserApi.delete);


userRouter.get('/logout', function (req, res) {
    req.logout();
    res.send();
});

userRouter.post('/test', function (req, res) {
	var html = template(req.body.firstName);

	Mailer.sendMail({
	    from: 'no-reply@gwazoo.com',
	    to: 'brosky117@gmail.com',
	    subject: 'Order Confirmation | Gwazoo',
	    html: html
	});

	res.send();
})


module.exports = userRouter;