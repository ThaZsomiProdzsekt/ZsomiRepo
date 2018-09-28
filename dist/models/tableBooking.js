"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
//import {IMeal, MealSchema} from "./meal";
const Schema = mongoose.Schema;
exports.TableBookingSchema = new Schema({
    numberOfTables: {
        type: Number,
        required: false
    },
    chairs: {
        type: Number,
        required: false
    },
    tables: {
        type: [
            {
                tableID: String,
                numberOfChairs: Number,
                reserved: Boolean,
                location: String, inDoors: Boolean,
                // Ide amúgy simán be lehetne még baszni egy type-ot nem igazán tudom, hogy mire lenne jó...
                // Bár talán érdemes lenne be required-ezni meg ilyenek, de azzal csak a baj van :) :/
                reservedDuring: [
                    {
                        reservedFrom: Date,
                        reservedTo: Date,
                        reservedFor: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'Consumer'
                        }
                    }
                ]
            }
        ],
        required: false
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
exports.TableBooking = mongoose.model('TableBooking', exports.TableBookingSchema);
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
function createNewTableBooking(belTo, theTables, numOfTables, numOfChairs, genAvail, callback) {
    // construct the cucc MIKASAKADA, OH TO HELL WITH IT: SPECIAL BEAM CANNON!
    let tableBooking = new exports.TableBooking();
    var rsrvationArr = {
        tableID: theTables.tableID, numberOfChairs: theTables.numberOfChairs, reserved: theTables.reserved,
        location: theTables.location, inDoors: theTables.inDoors, reservedDuring: theTables.reservations
    };
    let tblBkng = new exports.TableBooking({
        chairs: theTables.numberOfChairs
    });
    /*
    tblBkng.save( () => {
        TableBooking.findByIdAndUpdate(tblBkng._id, {
            '$set': {'numOfChairs': 9 }
        }, () =>{
            console.log('VÉGE');
        });
    });
*/
    console.log('numOfTables: ' + numOfTables);
    console.log('numOfChairs: ' + numOfChairs);
    console.log('genAvail: ' + genAvail);
    console.log('belTo: ' + belTo);
    console.log('tableDTO: ' + theTables);
    tableBooking.numberOfTables = numOfTables;
    tableBooking.chairs = numOfChairs;
    tableBooking.generalAvailability = genAvail;
    tableBooking.belongsTo = belTo;
    console.log('tableID: ' + rsrvationArr.tableID);
    console.log('numberOfChairs: ' + rsrvationArr.numberOfChairs);
    console.log('reserved: ' + rsrvationArr.reserved);
    console.log('location: ' + rsrvationArr.location);
    console.log('inDoors: ' + rsrvationArr.inDoors);
    console.log('reservedDuring: ' + rsrvationArr.reservedDuring);
    //tableBooking.tables.push(rsrvationArr);
    //tableBooking.markModified('tables');
    tableBooking.save().then(() => {
        console.log('SUCCESS');
        exports.TableBooking.findByIdAndUpdate(tableBooking._id, {
            '$push': { 'tables': rsrvationArr }
        }, () => {
            console.log('VÉGE');
        });
        tableBooking.markModified('tables');
    }, () => {
        'REJECTED';
    });
}
exports.createNewTableBooking = createNewTableBooking;
//# sourceMappingURL=tableBooking.js.map