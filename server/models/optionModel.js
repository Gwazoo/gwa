var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;

// OptionSet model
var OptionSetModel = thinky.createModel("optionSets", {
    name: type.string().required(), // Name of the optionSet. IE: 'T-shirts' or 'Dresses'
    options: [{
            name: type.string().required(), // Name of the option. IE: 'Size' or 'Color'
            variations: type.array(), // Variations. IE 'Red, Blue, Green'
            type: type.string(),
            required: type.boolean()
    }],
    username: type.string(),
    created: type.date().default(r.now()), // When the optionSet was created
    modified: type.date().default(r.now()) // When the optionSet was modified
});

var OptionModel = thinky.createModel("options", {
    name: type.string().required(),
    variations: type.array(),
    type: type.string(),
    username: type.string()
});

var Option = {
    create: function (username, option) {
        return new Promise(function (resolve, reject) {
            option.username = username;
            var newOption = new Option(option);
            newOption.save().then(function (option) {
                resolve(option);
            }, function (err) {
                reject(err);
            });
        });
    }
};

var UserModel = {
    create: function (userObj) {
        return new Promise(function (resolve, reject) {
            var salt = bcrypt.genSaltSync(12);
            bcrypt.hash(userObj.password, salt, null, function (err, hash) {
                userObj.password = hash;
                var newUser = new User(userObj);

                newUser.saveAll({cart: true})
                .then(function (user) {
                    // console.log("UserModel Result:", user);
                    if (user) {
                        delete user.password;
                        resolve(user);
                    } else {
                        reject(Error("It broke."));
                    }
                }, function (err) {
                    console.log(err);
                    reject(Error("It broke."));
                });
            });
        });
    },
    updateCart: function (username, products) {
        return new Promise(function (resolve, reject) {
            User.get(username).getJoin({cart: true}).run()
            .then(function (user){
                user.cart = products;
                user.saveAll({cart: true})
                .then(function (result) {
                    resolve(result);
                }, function (err) {
                    reject(Error(err));
                });
            }, function (err) {
                reject(Error(err));
            });
        });
    }
};

module.exports.userModel = UserModel;
module.exports.user = User;


