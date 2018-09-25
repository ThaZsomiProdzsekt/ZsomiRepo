"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const consumer_1 = require("./consumer");
//import {IMeal, MealSchema} from "./meal";
const Schema = mongoose.Schema;
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
            reservedTo: Date,
            reservedFor: consumer_1.Consumer
        }
    ]
});
exports.TableBookingSchema = new Schema({
    numberOfTables: {
        type: Number,
        required: false
    },
    numberOfChairs: {
        type: Number,
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
            {
                // Ide amúgy simán be lehetne még baszni egy type-ot nem igazán tudom, hogy mire lenne jó...
                // Bár talán érdemes lenne be required-ezni meg ilyenek, de azzal csak a baj van :) :/
                reservedDuring: [
                    { reservedFrom: Date },
                    { reservedTo: Date },
                    { reservedFor: consumer_1.Consumer }
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
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
exports.TableBooking = mongoose.model('TableBooking', exports.TableBookingSchema);
exports.TableBookingSchema.methods.changeTableReservationSCH(function (tableId, resFrom, cust, resTo) {
    exports.TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$set': { 'tables.$.reservationTimes.reservedFrom': resFrom,
            'tables.$.reservationTimes.reservedTo': resTo,
            'tables.$.reservationTimes.reservedFor': cust, }
    }, function (err, doc) {
        if (err)
            console.log('Error at changeTableReservation: ' + err);
    });
});
function changeTableReservation(tableId, resFrom, cust, resTo) {
    exports.TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$set': { 'tables.$.reservationTimes.reservedFrom': resFrom,
            'tables.$.reservationTimes.reservedTo': resTo,
            'tables.$.reservationTimes.reservedFor': cust, }
    }, function (err, doc) {
        if (err)
            console.log('Error at changeTableReservation: ' + err);
    });
}
exports.changeTableReservation = changeTableReservation;
function removeTableReservation(tableId, cust, callback) {
    exports.TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$pull': { 'tables.reservedDuring.reservedFor': { '$eq': cust } }
    }, function (err, doc) {
        if (err)
            console.log('Error happened at removeTableReservation: ' + err);
        callback();
    });
}
exports.removeTableReservation = removeTableReservation;
function setNumberOfTables(tableId, restId, numOfChairs) {
    exports.TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$set': { 'tables.$.numberOfChairs': numOfChairs }
    }, function (err, doc) {
        if (err)
            console.log("Error at setNumberOfTables: " + err);
        // SHI HI HO HI
    });
}
exports.setNumberOfTables = setNumberOfTables;
function setTableReservationWithoutCustomer(tableId, reservedFrom, reservedTo) {
    exports.TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$push': { 'tables.$.reservedDuring.reservedFrom': reservedFrom,
            'tables.$.reservedDuring.reservedTo': reservedTo },
    }, function (err, doc) {
        if (err)
            console.log("Error at setTableReservation: " + err);
    });
}
exports.setTableReservationWithoutCustomer = setTableReservationWithoutCustomer;
function setTableReservation(tableId, reservedFrom, reservedTo, cons) {
    exports.TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$push': { 'tables.$.reservedDuring.reservedFrom': reservedFrom,
            'tables.$.reservedDuring.reservedTo': reservedTo,
            'tables.$.reservedDuring.reservedFor': cons },
    }, function (err, doc) {
        if (err)
            console.log("Error at setTableReservation: " + err);
    });
}
exports.setTableReservation = setTableReservation;
/**
 * Function to be called. Cleans all the expired Table Reservations from the tables array from all docs.
 */
function deleteExpiredTableReservations() {
    exports.TableBooking.update({}, {
        // ??? fasztuggya hogy müxik-e :D
        '$pull': { 'tables.reservedDuring': { 'reservedTo': { '$lte': Date.now() } } }
    }, function (err, res) {
        if (err)
            console.log('Error at the deleteExpiredTableReservations: ' + err);
        // ASDF
    });
}
exports.deleteExpiredTableReservations = deleteExpiredTableReservations;
function createNewTableBooking(belTo, theTables, numOfTables, numOfChairs, genAvail) {
    // construct the cucc MIKASAKADA, OH TO HELL WITH IT: SPECIAL BEAM CANNON!
    let tableBooking = new exports.TableBooking();
    tableBooking.numberOfTables = numOfTables;
    tableBooking.numberOFChairs = numOfChairs;
    tableBooking.generalAvailability = genAvail;
    tableBooking.belongsTo = belTo;
    var rsrvationArr = {
        tableID: theTables.tableID, numberOfChairs: theTables.numberOfChairs, reserved: theTables.reserved,
        location: theTables.location, inDoors: theTables.inDoors, reservedDuring: theTables.reservations
    };
    tableBooking.tables.push(rsrvationArr);
    tableBooking.save((err, product) => {
        if (err)
            console.log('Hiba az új asztalséma mentésénél: ' + err);
    });
}
exports.createNewTableBooking = createNewTableBooking;
//# sourceMappingURL=tableBooking.js.map