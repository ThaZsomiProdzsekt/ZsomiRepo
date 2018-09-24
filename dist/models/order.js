"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const meal_1 = require("./meal");
// import { Meal } from "./meal";
const Schema = mongoose.Schema;
exports.OrderSchema = new Schema({
    orderDate: {
        type: Date,
        required: true
    },
    order: {
        type: [meal_1.Meal],
        required: true
    },
});
//# sourceMappingURL=order.js.map