import * as mongoose from 'mongoose';
import {IMeal, MealSchema} from "./meal";

const Schema = mongoose.Schema;

interface IReservation extends mongoose.Document{
    reservedFrom: [Date],
    reservedTo: Date
};

var ReservationSchema = new Schema({
    reservedFrom: {
        type: [Date],
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
export const TableBookingSchema = new Schema({
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

export const Reservation = mongoose.model<IReservation>('TableBooking', ReservationSchema);

ReservationSchema.methods.addNewReservationDatesForTable = function(Date: open, close, ) {
    var query = { reservedFrom: reservedFrom.push(Date.now) };
    Reservation.findByIdAndUpdate()
};
