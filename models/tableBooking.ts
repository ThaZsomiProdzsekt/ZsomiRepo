import * as mongoose from 'mongoose';
import {tableDTO} from '../DTOs/tablesDTO';
import {IConsumer, Consumer, ConsumerSchema} from "./consumer";
import {model} from "mongoose";
//import {IMeal, MealSchema} from "./meal";

const Schema = mongoose.Schema;

interface ITableBooking extends mongoose.Document {
    numberOfTables: Number;
    chairs: Number;
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
    chairs: {
        type: Number,
        required: false
    },
    tables: {
        type: [
            {
                tableID: String, // ez igazából egy név, csak faszomat már ja
                numberOfChairs: Number,
                reserved: Boolean,
                location: String,
                inDoors: Boolean,
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

export const TableBooking = mongoose.model<ITableBooking>('TableBooking', TableBookingSchema);

export function changeTableReservation2(tableId: String, resFrom: Date, resTo: Date, belTo: mongoose.Schema.Types.ObjectId,
                                        cust: mongoose.Schema.Types.ObjectId, callback: Function) {
    TableBooking.update({'tables.reservedDuring.reservedFor': cust, 'belongsTo': belTo}, {
        '$set': {
            'tables.$.reservedDuring.$.reservedFrom': resFrom,
            'tables.$.reservedDuring.$.reservedTo': resTo,
            'tables.$.reservedDuring.$.reservedFor': cust
        }
        // A pozíciós operátor ($) szar, mert csak egyszeres tömböknél jó, ahol több értéket kéne, hogy felvegyen
        // ott már úgy ahogy van szarcsi :(
    }, {}, function (err, doc) {
        if (err) {
            console.log('Error at "changeTableReservation": ' + err);
            callback(err, null);
        }
        if (doc) {
            console.log('Successfully found documents at "changeTableReservation": ' + doc);
            doc.//var query = TableBooking.update({});
            callback(null, doc);
        }
    });
}

export function changeTableReservation(tableId: String, resFrom: Date, resTo: Date, belTo: mongoose.Schema.Types.ObjectId,
                                       cust: mongoose.Schema.Types.ObjectId, callback: Function) {
    TableBooking.aggregate(
        [
            {
                '$match': {
                    'belongsTo': belTo,
                    /*
                    tables: {
                        reservedDuring: {
                            '$elemMatch': {
                                reservedFor: cust
                            }
                        }
                    }
                    */
                }
            },
            {
                '$addFields': {
                    /*tables: {
                        reservedDuring : {
                            reservedFrom: resFrom,
                            reservedTo: resTo,
                            reservedFor: cust
                        }
                    }*/
                    'awdawdawddwa': 99
                }
            }
        ]).then(
            callback()
    );
}

export function removeTableReservation(tableId: Number, cust: any, callback: Function) {
    TableBooking.findOneAndUpdate({'tables.tableID': tableId}, {
        '$pull': {'tables.reservedDuring.reservedFor': {'$eq': cust}}
    }, function (err, doc) {
        if (err) console.log('Error happened at removeTableReservation: ' + err);
        callback();
    });
}

export function setNumberOfTables(tableId: Number, restId: Number, numOfChairs: Number) {
    TableBooking.findOneAndUpdate({'tables.tableID': tableId}, {
        '$set': {'tables.$.numberOfChairs': numOfChairs}
    }, function (err, doc) {
        if (err) console.log("Error at setNumberOfTables: " + err);
        // SHI HI HO HI
    });
}

export function setTableReservationWithoutCustomer(tableId: Number, reservedFrom: Date, reservedTo: Date) {
    TableBooking.findOneAndUpdate({'tables.tableID': tableId}, {
        '$push': {
            'tables.$.reservedDuring.reservedFrom': reservedFrom,
            'tables.$.reservedDuring.reservedTo': reservedTo
        },
        //'$push': {'tables.$.reservedDuring.reservedTo': reservedTo},
    }, function (err, doc) {
        if (err) console.log("Error at setTableReservation: " + err);
    });
}

export function setTableReservation(tableId: Number, reservedFrom: Date, reservedTo: Date, cons: any) {
    TableBooking.findOneAndUpdate({'tables.tableID': tableId}, {
        '$push': {
            'tables.$.reservedDuring.reservedFrom': reservedFrom,
            'tables.$.reservedDuring.reservedTo': reservedTo,
            'tables.$.reservedDuring.reservedFor': cons
        },
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
        '$pull': {'tables.reservedDuring': {'reservedTo': {'$lte': Date.now()}}}
    }, function (err, res) {
        if (err) console.log('Error at the deleteExpiredTableReservations: ' + err);
        // ASDF
    });
}

export function createNewTableBooking(belTo: mongoose.Schema.Types.ObjectId, theTables: tableDTO,
                                      numOfTables?: Number, numOfChairs?: Number, genAvail?: String, callback?: Function) {
    // construct the cucc MIKASAKADA, OH TO HELL WITH IT: SPECIAL BEAM CANNON!
    let tableBooking = new TableBooking();
    /*let reservationArray = {
        tableID: theTables.tableID, numberOfChairs: theTables.numberOfChairs, reserved: theTables.reserved,
        location: theTables.location, inDoors: theTables.inDoors, reservedDuring: theTables.reservations
    };*/
    if (numOfTables) tableBooking.numberOfTables = numOfTables;
    if (numOfChairs) tableBooking.chairs = numOfChairs;
    if (genAvail) tableBooking.generalAvailability = genAvail;
    tableBooking.belongsTo = belTo;

    tableBooking.save().then(() => {
        console.log('Successfully created new TableBooking instance and save()-d to database!');
        addTables(theTables, tableBooking, callback);
        /*TableBooking.findByIdAndUpdate(tableBooking._id, {
            '$push': { 'tables': reservationArray }
        }, (err, model) =>{
            if (err) {
                console.log('There was an error at "createNewTableBooking", at pushing the array: ' + err);
                callback(err, null);
            }
            if (model){
                console.log('Successfully pushed array to doc at "createNewTableBooking"!');
                callback(null, model);
            }
        });
        tableBooking.markModified('tables');*/
    }, (err) => {
        console.log('Error at save()-ing new TableBooking instance to database!' + err);
        callback(err);
    });
}

function addTables(theTables: tableDTO, tblBooking: any, callback: Function) {
    let reservationArray = {
        tableID: theTables.tableID, numberOfChairs: theTables.numberOfChairs, reserved: theTables.reserved,
        location: theTables.location, inDoors: theTables.inDoors, reservedDuring: theTables.reservations
    };

    tblBooking.markModified('tables');
    TableBooking.findByIdAndUpdate(tblBooking._id, {
        '$push': {'tables': reservationArray}
    }, (err, model) => {
        if (err) {
            console.log('There was an error at "createNewTableBooking", at pushing the array: ' + err);
            callback(err, null);
        }
        if (model) {
            console.log('Successfully pushed array to doc at "createNewTableBooking"!');
            callback(null, model);
        }
    });
}
