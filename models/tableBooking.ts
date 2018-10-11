import * as mongoose from 'mongoose';
import {model} from 'mongoose';
import {IConsumer, Consumer, ConsumerSchema, getCustomerId_Phone_Name, getCustomerNameFromPhone} from "./consumer";
import * as rest from './restaurant';
import {Restaurant, RestaurantSchema, IRestaurant} from './restaurant';
import {tableDTO} from '../DTOs/tablesDTO';

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
    tables: [
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


export function changeTableReservation3(tableId: String, resFrom: Date, resTo: Date, belTo: string,
                                        cust: string, callback: Function) {
    TableBooking.find({
        'belongsTo': mongoose.Types.ObjectId(belTo),
        'tables.reservedDuring.reservedFor': mongoose.Types.ObjectId(cust),
    },).then((doc) => {
        console.log('DOC: ');
        console.log(doc);
        console.log('DOC: ');
        console.log(doc);
        //doc.
    });
}


export function getCustomerFromPhone(phone: string | number, belTo: string, callback: Function) {
    TableBooking.findOne({
        //'belongsTo': mongoose.Types.ObjectId(belTo),
    }, ).populate('belongsTo', { }, {}, {}, {}).
    exec().then((doc) => {
        console.log('The author is %s', doc);
        console.log(doc);
    });
//match: { phone: phone }
}

// TODO: testing
export function changeTableReservation2(belTo: string, tableId?: String, resFrom?: Date, resTo?: Date,
                                        name?: string, phone?: string,  callback?: Function) {
    let custId;
    try {
        custId = getCustomerId_Phone_Name(name, phone);
        if (custId != null) {
            TableBooking.updateMany({
                'belongsTo': mongoose.Types.ObjectId(belTo)
            }, {
                $set: {
                    'tables.$[].reservedDuring.$[arr].reservedFrom': resFrom,
                    'tables.$[].reservedDuring.$[arr].reservedTo': resTo
                }
            }, {
                arrayFilters: [{
                    'arr.reservedFor': mongoose.Types.ObjectId(custId)
                }],
                multi: true
            },).exec().then(function (doc) {
                if (doc) {
                    console.log('Successfully found documents at "changeTableReservation2" doc: ');
                    console.log(doc);
                    callback(null, doc);
                }
            }).catch( (err) => {
                console.log('Error at changeTableReservation2: ' + err);
                callback(err, null);
            });
        }
    } catch(err) {
        callback(err);
    }
}

//dummy
export function changeTableReservation(tableId: String, resFrom: Date, resTo: Date, belTo: string,
                                       cust: string, callback: Function) {
    var boy;
    console.log('cust: +');
    console.log(cust);
    TableBooking.aggregate(
        [
            {
                $match: {
                    'belongsTo': mongoose.Types.ObjectId(belTo),
                    'tables': {
                        $elemMatch: {
                            'reservedDuring': {
                                $elemMatch: {
                                    'reservedFor': mongoose.Types.ObjectId(cust)
                                }
                            }
                        }
                    }
                }
            },
            /*{
            $addFields: {
                'tables': {
                    'reservedDuring': {
                        'reservedFor': mongoose.Types.ObjectId('888888888888888888888888')
                    }
                }
            }
        }, {
            $out: 'tablebooking2'
        }*/
        ]).then((doc) => {
        boy = doc;
        //console.log(doc);
        for (let asd in doc) {
            var kek = doc[0];
            //console.log(kek.values());
            console.log(doc);
            console.log('KILL HIM - 0.dik item obj id');
            console.log(kek['_id']);
            console.log('KILL HIM - tables from KEK');
            console.log(kek['tables']);
            var tables = kek['tables'];
            console.log('KILL HIM - tables');
            console.log(tables);
            var reservedDuring_temp = tables[0];
            var reservedDuring = reservedDuring_temp['reservedDuring'];
            console.log('KILL HIM - reservedDuring');
            console.log(reservedDuring);
            callback(null, doc);
        }
    });
}

/*
* TableBooking.updateMany({
                'belongsTo': mongoose.Types.ObjectId(belTo)
            }, {
                $set: {
                    'tables.$[].reservedDuring.$[arr].reservedFrom': resFrom,
                    'tables.$[].reservedDuring.$[arr].reservedTo': resTo
                }
            }, {
                arrayFilters: [{
                    'arr.resTo': mongoose.Types.ObjectId(custId)
                }],
                multi: true
            },).exec().then(function (doc) {
                if (doc) {
                    console.log('Successfully found documents at "changeTableReservation2" doc: ');
                    console.log(doc);
                    callback(null, doc);
                }
            }).catch( (err) => {
                console.log('Error at changeTableReservation2: ' + err);
                callback(err, null);
            });
* */

// TODO: Müxik elvileg
export async function removeTableReservation(custName?: string, custPhone?: string, belTo?: string, callback?: Function) {
    let custId;
    try {
        custId = await getCustomerId_Phone_Name(custName, custPhone);
        console.log('custId értéke: ');
        console.log(custId);

        TableBooking.updateMany({
            'belongsTo': mongoose.Types.ObjectId(belTo)
        }, {
            $pull: {
                //'tables.$[].reservedDuring': { 'reservedTo': { $lte: new Date(Date.now()) } }
                'tables.$[].reservedDuring': { 'reservedFor': { $eq: mongoose.Types.ObjectId(custId) } }
            }
        }, {
            multi: true
        },).exec().then(function (doc) {
            if (doc) {
                console.log('Successfully found documents at "removeTableReservation" doc: ');
                console.log(doc);
                callback(null, doc);
            }
        }).catch( (err) => {
            console.log('Error at removeTableReservation: ' + err);
            callback(err, null);
        });
    } catch (err) {
        callback(err, null);
    }
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
export function deleteExpiredTableReservations(callback: Function) {
    // TESTED, MÜXIK
    TableBooking.updateMany({}, {
        $pull: {
            'tables.$[].reservedDuring': { 'reservedTo': { $lte: new Date(Date.now()) } }
        }
    }).exec().then(function (doc) {
        if (doc) {
            console.log('Successfully deleted documents at "deleteExpiredTableReservations" doc: ');
            console.log(doc);
            callback(null, doc);
        }
    }).catch( (err) => {
        console.log('Error at deleteExpiredTableReservations: ' + err);
        callback(err, null);
    });
}

export function createNewTableBooking(belTo: mongoose.Schema.Types.ObjectId, theTables: tableDTO,
                                      numOfTables?: Number, numOfChairs?: Number, genAvail?: String, callback?: Function) {
    // construct the cucc MIKASAKADA, OH TO HELL WITH IT: SPECIAL BEAM CANNON!
    let tableBooking = new TableBooking();
    if (numOfTables) tableBooking.numberOfTables = numOfTables;
    if (numOfChairs) tableBooking.chairs = numOfChairs;
    if (genAvail) tableBooking.generalAvailability = genAvail;
    tableBooking.belongsTo = belTo;

    tableBooking.save().then(() => {
        console.log('Successfully created new TableBooking instance and save()-d to database!');
        addTables(theTables, tableBooking, callback);
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
