var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;

// OptionSet model
var OptionSetModel = thinky.createModel("optionSets", {
    name: type.string(), // Name of the optionSet. IE: 'T-shirts' or 'Dresses'
    username: type.string(), // Vendor's username to tie the optionset to them
    created: type.date(), // When the optionSet was created
    modified: type.date() // When the optionSet was modified
});

var OptionModel = thinky.createModel("options", {
    name: type.string(), // Name of the option. IE: 'Size' or 'Color'
    variations: type.array(), // Variations. IE 'Red, Blue, Green'
    type: type.string(), // For Gwazoo defined templates and helpers. IE 'color', 'select', 'customtext'
    username: type.string()
});

OptionSetModel.hasAndBelongsToMany(OptionModel, "options", "id", "id");

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

var OptionSet = {
    create: function (username, optionSet) {
        return new Promise(function (resolve, reject) {
            var options = optionSet.options;
            optionSet.options = null;
            optionSet.username = username;
            var newOptionSet = new OptionSet(optionSet);
            newOptionSet.options = options;
            newOptionSet.saveAll().then(function (optionSet) {
                resolve(optionSet);
            }, function (err) {
                reject(err);
            });
        });
    }
};

module.exports.optionSetModel = OptionSetModel;
module.exports.optionModel = OptionModel;
module.exports.optionSet = OptionSet;
module.exports.option = Option;

