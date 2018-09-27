"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var hoursSchema = new Schema({
    open: {
        type: Date,
        required: false
    },
    close: {
        type: Date,
        required: false
    }
});
exports.Hours = mongoose.model('Hours', hoursSchema);
var openHoursHolidaySchema = new Schema({
    holidayDate: {
        type: Date,
        required: false
    },
    openHours: {
        type: [hoursSchema],
        required: false
    }
});
exports.OpenHoursHoliday = mongoose.model('OpenHoursHoliday', openHoursHolidaySchema);
exports.RestaurantSchema = new Schema({
    restName: {
        type: String,
        required: false
    },
    restLoc: {
        type: String,
        required: false
    },
    restPhone: {
        type: [Number],
        required: false
    },
    restEmail: {
        type: String,
        required: false
    },
    restSite: {
        type: String,
        required: false
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
    defaultHoursPerDay: {
        // Map should be filled with days and the respective opening hours. This ONLY contains the default opening hours.
        monday: { openHours: [hoursSchema], required: false },
        tuesday: { openHours: [hoursSchema], required: false },
        wednesday: { openHours: [hoursSchema], required: false },
        thursday: { openHours: [hoursSchema], required: false },
        friday: { openHours: [hoursSchema], required: false },
        saturday: { openHours: [hoursSchema], required: false },
        sunday: { openHours: [hoursSchema], required: false },
        required: false
    },
    /*
    openingHoursNormal: {
        type: openHoursSchema,
        required: true
    },
    */
    openHoursOnHolidays: {
        type: [openHoursHolidaySchema],
        required: false
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.Restaurant = mongoose.model('Restaurant', exports.RestaurantSchema);
function addNewRestaurant(restaurant, callback) {
    let rest = new exports.Restaurant();
    rest.restName = restaurant.restName;
    rest.save(function (err, product) {
        if (err) {
            console.log('Error at addNewRestaurant (MODEL): ' + err);
            callback(rest);
        }
    });
}
exports.addNewRestaurant = addNewRestaurant;
//# sourceMappingURL=restaurant.js.map