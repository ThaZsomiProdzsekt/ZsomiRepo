"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const order_1 = require("./order");
const Schema = mongoose.Schema;
exports.ConsumerSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    locationsWhereOrdered: {
        type: [String],
        required: false,
    },
    orders: {
        type: [order_1.Order],
        required: false,
    },
    otherInformation: {
        type: String,
        required: false
    },
    tableBookings: {
        type: Number,
        required: false,
        default: 0
    },
    created_date: {
        type: Date,
        required: false,
        default: Date.now
    }
});
exports.Consumer = mongoose.model('Consumer', exports.ConsumerSchema);
//# sourceMappingURL=consumer.js.map