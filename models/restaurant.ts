import * as mongoose from 'mongoose';
import { RestaurantDTO } from "../DTOs/restaurantDTO";
import {Drink} from "./drink";

const Schema = mongoose.Schema;

// HOURS
interface IHoursSchema extends mongoose.Document {
    open: Date;
    close: Date;
}
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
export const Hours = mongoose.model<IHoursSchema>('Hours', hoursSchema);

/*
// OpenHours
interface IOpenHoursSchema extends mongoose.Document {
    monday: { openHours: [] },
    tuesday: { openHours: [] },
    wednesday: { openHours: [] },
    thursday: { openHours: [] },
    friday: { openHours: [] },
    saturday: { openHours: [] },
    sunday: { openHours: [] }
}
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
*/

// OpenHoursHoliday
interface IOpenHoursHoliday extends mongoose.Document {
    holidayDate: Date;
    openHours: [];
}
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
export const OpenHoursHoliday = mongoose.model<IOpenHoursHoliday>('OpenHoursHoliday', openHoursHolidaySchema);

//Restaurant
interface IRestaurantSchema extends mongoose.Document {
    restName: String;
    restLoc: String;
    restPhone: [Number];
    restEmail: String;
    restSite: String;
    additionalInformation: String;
    currentlyTakingOrders: Boolean;
    defaultHoursPerDay: {
        monday: [];
        tuesday: [];
        wednesday: [];
        thursday: [];
        friday: [];
        saturday: [];
        sunday: [];
    };
    openHoursOnHolidays: [];
    created_date: Date;
}
export const RestaurantSchema = new Schema({
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

export const Restaurant = mongoose.model<IRestaurantSchema>('Restaurant', RestaurantSchema);

export function addNewRestaurant(restaurant: RestaurantDTO, callback: Function) {
    let rest = new Restaurant();
    rest.restName = restaurant.restName;

    rest.save( function (err, product) {
        if (err) {
            console.log('Error at addNewRestaurant (MODEL): ' + err);
            callback(rest);
        }
    });
}