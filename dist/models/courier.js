"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CourierSchema = new Schema({
    onItsWay: {
        type: Boolean,
        required: false,
        default: false
    },
    currentlyHandling: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
        required: false
    },
    departedAt: {
        type: Date,
        required: false
    },
    willArriveAt: {
        type: Date,
        required: false
    },
    currentLocation: {
        type: String,
        required: false
    },
    currentlyOnCar: {
        type: Boolean,
        required: false,
        default: false
    },
    currentlyOnBike: {
        type: Boolean,
        required: false,
        default: false
    },
    currentlyOnBicycle: {
        type: Boolean,
        required: false,
        default: false
    },
    name: {
        type: String,
        required: false,
        default: ''
    },
    created_date: {
        type: Date,
        required: false,
        default: Date.now
    }
});
exports.Courier = mongoose.model('Courier', exports.CourierSchema);
//# sourceMappingURL=courier.js.map