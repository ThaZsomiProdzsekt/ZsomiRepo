"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const meal_1 = require("./meal");
const drink_1 = require("./drink");
// import { Meal } from "./meal";
const Schema = mongoose.Schema;
exports.DiscountSchema = new Schema({
    meals: {
        type: [meal_1.Meal],
        required: false
    },
    currentlyAlive: {
        type: Boolean,
        required: false,
        default: false
    },
    drinks: {
        type: [drink_1.Drink],
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
    }
});
//# sourceMappingURL=discount.js.map