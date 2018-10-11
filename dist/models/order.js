"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// import { Meal } from "./meal";
const Schema = mongoose.Schema;
exports.OrderSchema = new Schema({
    orderDate: {
        type: mongoose.SchemaTypes.Date,
        required: false
    },
    orderMeal: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Meal',
        required: false
    },
    orderDrink: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drink',
        required: false
    },
    orderDiscount: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Discount',
        required: false
    },
    consumerName: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    consumerPhone: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    consumerAddress: {
        type: mongoose.SchemaTypes.String,
        required: false
    },
    orderFromPhone: {
        type: mongoose.SchemaTypes.Boolean,
        required: false,
        default: false
    },
    orderFromWeb: {
        type: mongoose.SchemaTypes.Boolean,
        required: false,
        default: true
    },
    orderPersonally: {
        type: mongoose.SchemaTypes.Boolean,
        required: false,
        default: false
    },
    tableReservations: {
        type: mongoose.SchemaTypes.Number,
        required: false,
        default: 0
    },
    created_date: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    }
});
exports.Order = mongoose.model('Order', exports.OrderSchema);
function addNewOrder(orderDTO, callback) {
    let name = orderDTO.consumerName;
    let order = new exports.Order();
    order.consumerName = name;
    order.save((err, product) => {
        if (err) {
            console.log('Error at addNewConsumer function (MODEL): ' + err);
            callback(err, null);
        }
        if (product) {
            console.log('Successful Product created at addNewConsumer function (MODEL): ' + product);
            callback(null, product);
        }
    });
}
exports.addNewOrder = addNewOrder;
//# sourceMappingURL=order.js.map