var Express = require('express');
var Passport = require('passport');
var UserApi = require('../controls/userControl');

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


module.exports = userRouter;