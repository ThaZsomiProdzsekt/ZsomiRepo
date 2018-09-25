"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// import { Meal } from "./meal";
const Schema = mongoose.Schema;
exports.OrderSchema = new Schema({
    orderDate: {
        type: Date,
        required: true
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
        type: String,
        required: false
    },
    consumerPhone: {
        type: String,
        required: false
    },
    consumerAddress: {
        type: String,
        required: false
    },
    orderFromPhone: {
        type: Boolean,
        required: false,
        default: false
    },
    orderFromWeb: {
        type: Boolean,
        required: false,
        default: true
    },
    orderPersonally: {
        type: Boolean,
        required: false,
        default: false
    },
    tableReservations: {
        type: Number,
        required: false,
        default: 0
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.Order = mongoose.model('Order', exports.OrderSchema);
//# sourceMappingURL=order.js.map