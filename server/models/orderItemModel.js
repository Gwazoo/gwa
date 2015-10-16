var thinky = require('./../util/thinky');
var r = thinky.r;
var type = thinky.type;

// OrderItem Model
var OrderItemModel = thinky.createModel("order_items", {
    id: type.string(),
    orderItem: type.string(),
    vendor: type.string(), // Vendor's username
    name: type.string().required(),
    description: type.string().required(), // Full description
    shortDescription: type.string().max(50), // Short description for display on search pages
    price: type.string().required(), // The price we pay for it
    salePrice: type.string().required(), // The price we sell the orderItem for
    smallImages: [{ // Array of Image objects
            url: type.string().required() // URL to image
        }],
    images: [{
            url: type.string().required(), // URL to image
            isPrimary: type.boolean() // Display order of images
        }]
});

var OrderItem = {
    create: function (data) {
        return new Promise(function (resolve, reject) {
            var orderItem = new OrderItemModel(data);
            orderItem.validate();
            orderItem.saveAll({categories: true})
                    .then(function (result) {
                        console.log("OrderItem: ", result);
                        resolve(result);
                    }, function (err) {
                        reject(Error("Error saving order items: " + err));
                    });
        });
    },
    get: function (id) {
        return new Promise(function (resolve, reject) {
            OrderItemModel.get(id).getJoin({items: true}).run()
                    .then(function (result) {
                        resolve(result);
                    }, function (err) {
                        reject(Error("Error retrieving order items: " + err));
                    });
        });
    },
    getAll: function () {
        
    }
};

module.exports.orderItem = OrderItem;
module.exports.orderItemModel = OrderItemModel;


