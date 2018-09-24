import * as mongoose from 'mongoose';
//import {IMeal, MealSchema} from "./meal";

const Schema = mongoose.Schema;

interface IReservation extends mongoose.Document{
    reservedFrom: [String],
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
    reservedDuring: [ReservationSchema],
    reservationTimes: [
        {
            reservedFrom: Date,
            reservedTo: Date
        }
    ]
});

interface ITableBooking extends mongoose.Document {
    numberOfTables: String;
    numberOFChairs: String[];
    tables: [];
    generalAvailability: String;
    belongsTo: mongoose.Schema.Types.ObjectId;
    createdDate: Date;
}
const TableBookingSchema = new Schema({
    numberOfTables: {
        type: String,
        required: false
    },
    numberOfChairs: {
        type: [String],
        required: false
    },
    /*
    tables: {
        type: [TableSchema],
        required: true
    },
    */
    tables: {
        type: [
            { tableID: String },
            { numberOfChairs: Number },
            { reserved: Boolean },
            { location: String },
            { inDoors: Boolean },
            { reservedDuring: [
                    { reservedFrom: Date },
                    { reservedTo: Date }
                ] }
        ],
        required: true
    },
    generalAvailability: {
        type: String,
        required: false
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
/*
export const Reservation = mongoose.model<IReservation>('TableBooking', ReservationSchema);

ReservationSchema.methods.addNewReservationDatesForTable = (function(open: String, close: String ) {
    Reservation.findOne({}, function (result) {
        result.reservedFrom.push(Date.now);
        console.log("reserved form: " + result.reservedFrom);
    });
}("asdasd", "asdasd"));*/

export const TableBooking = mongoose.model<ITableBooking>('TableBooking', TableBookingSchema);
