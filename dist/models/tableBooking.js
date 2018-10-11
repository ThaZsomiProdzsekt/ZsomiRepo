"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const consumer_1 = require("./consumer");
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
    tables: [
        {
            tableID: String,
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
exports.TableBooking = mongoose.model('TableBooking', exports.TableBookingSchema);
function changeTableReservation3(tableId, resFrom, resTo, belTo, cust, callback) {
    exports.TableBooking.find({
        'belongsTo': mongoose.Types.ObjectId(belTo),
        'tables.reservedDuring.reservedFor': mongoose.Types.ObjectId(cust),
    }).then((doc) => {
        console.log('DOC: ');
        console.log(doc);
        console.log('DOC: ');
        console.log(doc);
        //doc.
    });
}
exports.changeTableReservation3 = changeTableReservation3;
function getCustomerFromPhone(phone, belTo, callback) {
    exports.TableBooking.findOne({
    //'belongsTo': mongoose.Types.ObjectId(belTo),
    }).populate('belongsTo', {}, {}, {}, {}).
        exec().then((doc) => {
        console.log('The author is %s', doc);
        console.log(doc);
    });
    //match: { phone: phone }
}
exports.getCustomerFromPhone = getCustomerFromPhone;
// TODO: testing
function changeTableReservation2(belTo, tableId, resFrom, resTo, name, phone, callback) {
    let custId;
    try {
        custId = consumer_1.getCustomerId_Phone_Name(name, phone);
        if (custId != null) {
            exports.TableBooking.updateMany({
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
            }).exec().then(function (doc) {
                if (doc) {
                    console.log('Successfully found documents at "changeTableReservation2" doc: ');
                    console.log(doc);
                    callback(null, doc);
                }
            }).catch((err) => {
                console.log('Error at changeTableReservation2: ' + err);
                callback(err, null);
            });
        }
    }
    catch (err) {
        callback(err);
    }
}
exports.changeTableReservation2 = changeTableReservation2;
//dummy
function changeTableReservation(tableId, resFrom, resTo, belTo, cust, callback) {
    var boy;
    console.log('cust: +');
    console.log(cust);
    exports.TableBooking.aggregate([
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
exports.changeTableReservation = changeTableReservation;
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
function removeTableReservation(custName, custPhone, belTo, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let custId;
        try {
            custId = yield consumer_1.getCustomerId_Phone_Name(custName, custPhone);
            console.log('custId értéke: ');
            console.log(custId);
            exports.TableBooking.updateMany({
                'belongsTo': mongoose.Types.ObjectId(belTo)
            }, {
                $pull: {
                    //'tables.$[].reservedDuring': { 'reservedTo': { $lte: new Date(Date.now()) } }
                    'tables.$[].reservedDuring': { 'reservedFor': { $eq: mongoose.Types.ObjectId(custId) } }
                }
            }, {
                multi: true
            }).exec().then(function (doc) {
                if (doc) {
                    console.log('Successfully found documents at "removeTableReservation" doc: ');
                    console.log(doc);
                    callback(null, doc);
                }
            }).catch((err) => {
                console.log('Error at removeTableReservation: ' + err);
                callback(err, null);
            });
        }
        catch (err) {
            callback(err, null);
        }
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
        '$push': {
            'tables.$.reservedDuring.reservedFrom': reservedFrom,
            'tables.$.reservedDuring.reservedTo': reservedTo
        },
    }, function (err, doc) {
        if (err)
            console.log("Error at setTableReservation: " + err);
    });
}
exports.setTableReservationWithoutCustomer = setTableReservationWithoutCustomer;
function setTableReservation(tableId, reservedFrom, reservedTo, cons) {
    exports.TableBooking.findOneAndUpdate({ 'tables.tableID': tableId }, {
        '$push': {
            'tables.$.reservedDuring.reservedFrom': reservedFrom,
            'tables.$.reservedDuring.reservedTo': reservedTo,
            'tables.$.reservedDuring.reservedFor': cons
        },
    }, function (err, doc) {
        if (err)
            console.log("Error at setTableReservation: " + err);
    });
}
exports.setTableReservation = setTableReservation;
/**
 * Function to be called. Cleans all the expired Table Reservations from the tables array from all docs.
 */
function deleteExpiredTableReservations(callback) {
    // TESTED, MÜXIK
    exports.TableBooking.updateMany({}, {
        $pull: {
            'tables.$[].reservedDuring': { 'reservedTo': { $lte: new Date(Date.now()) } }
        }
    }).exec().then(function (doc) {
        if (doc) {
            console.log('Successfully deleted documents at "deleteExpiredTableReservations" doc: ');
            console.log(doc);
            callback(null, doc);
        }
    }).catch((err) => {
        console.log('Error at deleteExpiredTableReservations: ' + err);
        callback(err, null);
    });
}
exports.deleteExpiredTableReservations = deleteExpiredTableReservations;
function createNewTableBooking(belTo, theTables, numOfTables, numOfChairs, genAvail, callback) {
    // construct the cucc MIKASAKADA, OH TO HELL WITH IT: SPECIAL BEAM CANNON!
    let tableBooking = new exports.TableBooking();
    if (numOfTables)
        tableBooking.numberOfTables = numOfTables;
    if (numOfChairs)
        tableBooking.chairs = numOfChairs;
    if (genAvail)
        tableBooking.generalAvailability = genAvail;
    tableBooking.belongsTo = belTo;
    tableBooking.save().then(() => {
        console.log('Successfully created new TableBooking instance and save()-d to database!');
        addTables(theTables, tableBooking, callback);
    }, (err) => {
        console.log('Error at save()-ing new TableBooking instance to database!' + err);
        callback(err);
    });
}
exports.createNewTableBooking = createNewTableBooking;
function addTables(theTables, tblBooking, callback) {
    let reservationArray = {
        tableID: theTables.tableID, numberOfChairs: theTables.numberOfChairs, reserved: theTables.reserved,
        location: theTables.location, inDoors: theTables.inDoors, reservedDuring: theTables.reservations
    };
    tblBooking.markModified('tables');
    exports.TableBooking.findByIdAndUpdate(tblBooking._id, {
        '$push': { 'tables': reservationArray }
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
//# sourceMappingURL=tableBooking.js.map