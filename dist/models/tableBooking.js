"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
//import {IMeal, MealSchema} from "./meal";
const Schema = mongoose.Schema;
;
var ReservationSchema = new Schema({
    reservedFrom: {
        type: [String],
        required: true
    },
    reservedTo: {
        type: Date,
        required: true
    }
});
var TableSchema = new Schema({
    tableID: String,
    numberOfChairs: Number,
    reserved: Boolean,
    location: String,
    inDoors: Boolean,
    reservedDuring: [ReservationSchema]
});
/*
const TableBookingSchema = new Schema({
    numberOfTables: {
        type: String,
        required: false
    },
    numberOfChairs: {
        type: String[''],
        required: false
    },
    tables: {
        type: [TableSchema],
        required: true
    },
    generalAvailability: {
        type: String,
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
*/
let Reservation = mongoose.model('TableBooking', ReservationSchema);
let reservvv = new Reservation("asd", "asd");
var addNewReservationDatesForTable = function (open, close) {
    console.log("asdasd");
    Reservation.findOne({reservedFrom: "asd"}).then( function (result) {
        result.reservedFrom.push(Date.now);
        console.log("reserved form: " + result.reservedFrom);
    });
};

addNewReservationDatesForTable("asd", "asd");
//# sourceMappingURL=tableBooking.js.map
//# sourceMappingURL=tableBooking.js.map