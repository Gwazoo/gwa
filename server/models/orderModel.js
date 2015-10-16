var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;

// Order Model
var OrderModel = thinky.createModel("orders", {
    id: type.string(),
    userId: type.string(),
    totalPrice: type.string(),
    shippingPrice: type.string(),
    profit: type.string(),
    shippingAddress: {
        address1: type.string(),
        address2: type.string(),
        city: type.string(),
        state: type.string(),
        zipCode: type.string()
    },
    billingAddress: {
        address1: type.string(),
        address2: type.string(),
        city: type.string(),
        state: type.string(),
        zipCode: type.string()
    },
    status: type.string(),
    dateCreated: type.date()
});

var Order = {
    create: function (data) {
        return new Promise(function (resolve, reject) {
            var product = new OrderModel(data);
            product.validate();
            product.saveAll({categories: true})
                    .then(function (result) {
                        console.log("Order: ", result);
                        resolve(result);
                    }, function (err) {
                        reject(Error("Error saving order: " + err));
                    });
        });
    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            OrderModel.get(id).getJoin({items: true}).run()
                    .then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(Error("Error retrieving order: " + err));
                    });
        });
    },
    getAll: function () {
        
    }
};

module.exports.order = Order;
module.exports.orderModel = OrderModel;
