"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var hoursSchema = new Schema({
    open: {
        type: Date,
        required: true
    },
    close: {
        type: Date,
        required: true
    }
});
var openHoursSchema = new Schema({
    defaultOrderHoursPerDay: {
        // Map should be filled with days and the respective opening hours. This ONLY contains the default opening hours.
        monday: { openHours: [hoursSchema], required: true },
        tuesday: { openHours: [hoursSchema], required: true },
        wednesday: { openHours: [hoursSchema], required: true },
        thursday: { openHours: [hoursSchema], required: true },
        friday: { openHours: [hoursSchema], required: true },
        saturday: { openHours: [hoursSchema], required: true },
        sunday: { openHours: [hoursSchema], required: true },
        required: true
    }
});
var openHoursHoliday = new Schema({
    holidayDate: {
        type: Date,
        required: true
    },
    openHours: {
        type: [hoursSchema],
        required: true
    }
});
exports.RestaurantSchema = new Schema({
    restName: {
        type: String,
        required: true
    },
    restLoc: {
        type: String,
        required: true
    },
    restPhone: {
        type: [Number],
        required: true
    },
    restEmail: {
        type: String,
        required: true
    },
    restSite: {
        type: String,
        required: true
    },
    additionalInformation: {
        type: String,
        required: false
    },
    currentlyTakingOrders: {
        type: Boolean,
        required: false,
        default: true
    },
    openingHoursNormal: {
        type: openHoursSchema,
        required: true
    },
    openHoursOnHolidays: {
        type: [openHoursHoliday],
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=restaurant.js.map