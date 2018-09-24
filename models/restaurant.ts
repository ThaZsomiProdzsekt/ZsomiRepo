import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// HOURS
interface IHoursSchema extends mongoose.Document {
    open: Date;
    close: Date;
}
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
export const Hours = mongoose.model<IHoursSchema>('Hours', hoursSchema);

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

// OpenHoursHoliday
interface IOpenHoursHoliday extends mongoose.Document {
    holidayDate: Date;
    openHours: [];
}
var openHoursHolidaySchema = new Schema({
    holidayDate: {
        type: Date,
        required: true
    },
    openHours: {
        type: [hoursSchema],
        required: true
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
    defaultHoursPerDay: {
        // Map should be filled with days and the respective opening hours. This ONLY contains the default opening hours.
        /*monday: { type: [{
                type: [
                    { openHour: Date },
                    { closingHour: Date }
                ],
                day: String
            }],
            required: true },*/
        monday: { openHours: [hoursSchema], required: true },
        tuesday: { openHours: [hoursSchema], required: true },
        wednesday: { openHours: [hoursSchema], required: true },
        thursday: { openHours: [hoursSchema], required: true },
        friday: { openHours: [hoursSchema], required: true },
        saturday: { openHours: [hoursSchema], required: true },
        sunday: { openHours: [hoursSchema], required: true },
        required: true
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
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const Restaurant = mongoose.model<IRestaurantSchema>('Restaurant', RestaurantSchema);