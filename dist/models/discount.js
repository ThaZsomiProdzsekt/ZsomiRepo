"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
// import { Meal } from "./meal";
const Schema = mongoose.Schema;
exports.DiscountSchema = new Schema({
    meals: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Meal',
        required: false
    },
    currentlyAlive: {
        type: Boolean,
        required: false,
        default: false
    },
    drinks: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Drink',
        required: false
    },
    startsAt: {
        type: Date,
        required: false
    },
    endsAt: {
        type: Date,
        required: false
    },
    discountedAmountsLeft: {
        type: Number,
        required: false
    },
    discountedPrice: {
        type: Number,
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.Discount = mongoose.model('Discount', exports.DiscountSchema);
//# sourceMappingURL=discount.js.map