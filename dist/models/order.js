"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const validationCheckers_1 = require("../helpers/validationCheckers");
const inappropriateOrderInputException_1 = require("../exceptions/inappropriateInputExceptions/inappropriateOrderInputException");
const inappropriateConsumerInputException_1 = require("../exceptions/inappropriateInputExceptions/inappropriateConsumerInputException");
// import { Meal } from "./meal";
const Schema = mongoose.Schema;
exports.OrderSchema = new Schema({
    orderDate: {
        type: mongoose.SchemaTypes.Date,
        required: false
    },
    dueDate: {
        type: mongoose.SchemaTypes.Date,
        required: false,
        default: Date.now
    },
    belongsToRestaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
    },
    belongsToConsumer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Consumer',
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
function getOrderBasedOnDates(begDate, endDate, restId, callback) {
    if (!validationCheckers_1.ValidationCheckers.isDefined(begDate) || !validationCheckers_1.ValidationCheckers.isDefined(endDate)) {
        let entities = [];
        entities.push(inappropriateOrderInputException_1.InapprOrderInputEntities.orderDate);
        throw new inappropriateOrderInputException_1.InappropriateOrderInputException('There was/were missing/empty parameter(s) for query!', 500, [begDate, endDate], entities);
    }
    exports.Order.find({ 'orderDate': { $gte: begDate, $lte: endDate }, 'belongsToRestaurant': restId }, (err, doc) => {
        if (err)
            callback(err);
        if (doc)
            callback(doc);
    });
}
exports.getOrderBasedOnDates = getOrderBasedOnDates;
function getOrderBasedOnDatesAndCustomer(begDate, endDate, custId, restId, callback) {
    if (!validationCheckers_1.ValidationCheckers.isDefined(begDate) || !validationCheckers_1.ValidationCheckers.isDefined(endDate)) {
        let entities = [inappropriateOrderInputException_1.InapprOrderInputEntities.orderDate];
        throw new inappropriateOrderInputException_1.InappropriateOrderInputException('There was/were missing/empty parameter(s) for query!', 500, [begDate, endDate], entities);
    }
    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(custId)) {
        let entities = [inappropriateConsumerInputException_1.InapprConsumerInputEntities.consId];
        throw new inappropriateConsumerInputException_1.InappropriateConsumerInputException('There was/were missing/empty parameter(s) for query!', 500, [custId], entities);
    }
    exports.Order.find({
        'orderDate': { $gte: begDate, $lte: endDate },
        'belongsToConsumer': custId,
        'belongsToRestaurant': restId
    }, (err, doc) => {
        if (err)
            callback(err, null);
        if (doc)
            callback(null, doc);
    });
}
exports.getOrderBasedOnDatesAndCustomer = getOrderBasedOnDatesAndCustomer;
function exceptionBuilder() {
}
//# sourceMappingURL=order.js.map