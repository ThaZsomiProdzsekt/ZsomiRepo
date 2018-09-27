import * as mongoose from 'mongoose';
import { tableDTO } from '../DTOs/tablesDTO';
import { IConsumer, Consumer, ConsumerSchema } from "./consumer";
import {model} from "mongoose";
//import {IMeal, MealSchema} from "./meal";

const Schema = mongoose.Schema;

interface ITableBooking extends mongoose.Document {
    numberOfTables: Number;
    numberOFChairs: Number;
    tables: any[];
    generalAvailability: String;
    belongsTo: mongoose.Schema.Types.ObjectId;
    createdDate: Date;
}

export const TableBookingSchema = new Schema({
    numberOfTables: {
        type: Number,
        required: false
    },
    numberOfChairs: {
        type: Number,
        required: false
    },
    tables: {
        type: [
            { tableID: String} ,
            { numberOfChairs: Number },
            { reserved: Boolean },
            { location: String },
            { inDoors: Boolean },
            {
                // Ide amúgy simán be lehetne még baszni egy type-ot nem igazán tudom, hogy mire lenne jó...
                // Bár talán érdemes lenne be required-ezni meg ilyenek, de azzal csak a baj van :) :/
                reservedDuring: [
                    { reservedFrom: Date },
                    { reservedTo: Date },
                    { reservedFor: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Consumer'
                        }
                    }
                ]
            }
        ]
    },
    generalAvailability: {
        type: String,
        required: false
    },
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const TableBooking = mongoose.model<ITableBooking>('TableBooking', TableBookingSchema);

export function changeTableReservation(tableId: Number, resFrom: Date, cust: any, resTo: Date) {
    TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$set': {'tables.$.reservationTimes.reservedFrom': resFrom,
                'tables.$.reservationTimes.reservedTo': resTo,
                'tables.$.reservationTimes.reservedFor': cust, }
    }, function (err, doc) {
        if (err) console.log('Error at changeTableReservation: ' + err );
    });
}

export function removeTableReservation(tableId: Number, cust: any, callback: Function) {
    TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$pull': { 'tables.reservedDuring.reservedFor': { '$eq': cust }}
    }, function (err, doc) {
        if (err) console.log('Error happened at removeTableReservation: ' + err);
        callback();
    });
}

export function setNumberOfTables(tableId: Number, restId: Number, numOfChairs: Number) {
    TableBooking.findOneAndUpdate({'tables.tableID': tableId}, {
        '$set': { 'tables.$.numberOfChairs': numOfChairs }
    }, function (err, doc) {
        if (err) console.log("Error at setNumberOfTables: " + err);
        // SHI HI HO HI
    });
}

export function setTableReservationWithoutCustomer(tableId: Number, reservedFrom: Date, reservedTo: Date) {
    TableBooking.findOneAndUpdate({'tables.tableID': tableId}, {
        '$push': { 'tables.$.reservedDuring.reservedFrom': reservedFrom,
                'tables.$.reservedDuring.reservedTo': reservedTo },
        //'$push': {'tables.$.reservedDuring.reservedTo': reservedTo},
    }, function (err, doc) {
        if (err) console.log("Error at setTableReservation: " + err);
    });
}

export function setTableReservation(tableId: Number, reservedFrom: Date, reservedTo: Date, cons: any) {
    TableBooking.findOneAndUpdate({'tables.tableID': tableId}, {
        '$push': { 'tables.$.reservedDuring.reservedFrom': reservedFrom,
            'tables.$.reservedDuring.reservedTo': reservedTo,
            'tables.$.reservedDuring.reservedFor': cons },
        //'$push': {'tables.$.reservedDuring.reservedTo': reservedTo},
    }, function (err, doc) {
        if (err) console.log("Error at setTableReservation: " + err);
    });
}

/**
 * Function to be called. Cleans all the expired Table Reservations from the tables array from all docs.
 */
export function deleteExpiredTableReservations() {
    TableBooking.update({}, {
        // ??? fasztuggya hogy müxik-e :D
        '$pull': { 'tables.reservedDuring': { 'reservedTo': { '$lte': Date.now() }}}
    }, function (err, res) {
        if (err) console.log('Error at the deleteExpiredTableReservations: ' + err);
        // ASDF
    });
}

export function createNewTableBooking(belTo: mongoose.Schema.Types.ObjectId, theTables: tableDTO,
                               numOfTables?: Number, numOfChairs?: Number, genAvail?: String, callback?: Function) {
    // construct the cucc MIKASAKADA, OH TO HELL WITH IT: SPECIAL BEAM CANNON!
    let tableBooking = new TableBooking();
    tableBooking.numberOfTables = numOfTables;
    tableBooking.numberOFChairs = numOfChairs;
    tableBooking.generalAvailability = genAvail;
    tableBooking.belongsTo = belTo;

    var rsrvationArr = {
        tableID: theTables.tableID, numberOfChairs: theTables.numberOfChairs, reserved: theTables.reserved,
        location: theTables.location, inDoors: theTables.inDoors, reservedDuring: theTables.reservations
    };
    tableBooking.tables.push(rsrvationArr);
    tableBooking.save(function (err, product) {
        if (err) console.log('Error at creating new createNewTableBooking (MODEL) Error: ' + err);
        if (err && callback) callback(err);
        if (product && callback) callback(product);
    });
}
