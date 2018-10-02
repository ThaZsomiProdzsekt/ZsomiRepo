"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tableBooking_1 = require("../models/tableBooking");
class TableBookingRoutes {
    tableBookingRoutes(app) {
        // Create a new TableBooking for a given Restaurant!
        app.route('/newTableBooking').post((req, res) => {
            let belTo = req.body.belTo; // Ezt elvileg lehet, postmanbe müxik, no error
            let theTables = req.body.theTables;
            let numOfTables;
            let numOfChairs;
            let genAvail;
            if (req.body.numOfTables)
                numOfTables = req.body.numOfTables;
            if (req.body.numOfChairs)
                numOfChairs = req.body.numOfChairs;
            if (req.body.genAvail)
                genAvail = req.body.genAvail;
            tableBooking_1.createNewTableBooking(belTo, theTables, numOfTables, numOfChairs, genAvail, (err, product) => {
                if (err) {
                    console.log('Error at /newTableBooking: ' + err);
                    res.send(JSON.stringify(err));
                }
                if (product) {
                    console.log('Product created at /newTableBooking: ' + product);
                    res.send(JSON.stringify(product));
                }
            });
        });
        // Change a table reservation of a specific table!
        app.route('/changeTableReservation').post((req, res) => {
            // changeTableReservation(tableId: Number, resFrom: Date, cust: any, resTo: Date)
            console.log('Beléptünk a /chageTableReservation-ra! ');
            let tableId = req.body.tableId;
            let resFrom = req.body.resFrom;
            let resTo = req.body.resTo;
            let cust = req.body.cust;
            let belTo = req.body.belTo;
            tableBooking_1.changeTableReservation(tableId, resFrom, resTo, belTo, cust, (err, product) => {
                if (err) {
                    console.log('Error at /changeTableReservation: ' + err);
                    res.send(JSON.stringify(err));
                }
                if (product) {
                    console.log('Product created at /changeTableReservation: ' + product);
                    res.send(JSON.stringify(product));
                }
            });
        });
        app.route('/changeTableReservation2').post((req, res) => {
            // changeTableReservation(tableId: Number, resFrom: Date, cust: any, resTo: Date)
            console.log('Beléptünk a /chageTableReservation2-ba! ');
            let tableId = req.body.tableId;
            let resFrom = req.body.resFrom;
            let resTo = req.body.resTo;
            let cust = req.body.cust;
            let belTo = req.body.belTo;
            tableBooking_1.changeTableReservation2(tableId, resFrom, resTo, belTo, cust, (err, product) => {
                if (err) {
                    console.log('Error at /changeTableReservation: ' + err);
                    res.send(JSON.stringify(err));
                }
                if (product) {
                    console.log('Product created at /changeTableReservation: ' + product);
                    res.send(JSON.stringify(product));
                }
            });
        });
        app.route('/changeTableReservation3').post((req, res) => {
            // changeTableReservation(tableId: Number, resFrom: Date, cust: any, resTo: Date)
            console.log('Beléptünk a /chageTableReservation-ra! ');
            let tableId = req.body.tableId;
            let resFrom = req.body.resFrom;
            let resTo = req.body.resTo;
            let cust = req.body.cust;
            let belTo = req.body.belTo;
            tableBooking_1.changeTableReservation3(tableId, resFrom, resTo, belTo, cust, (err, product) => {
                if (err) {
                    console.log('Error at /changeTableReservation: ' + err);
                    res.send(JSON.stringify(err));
                }
                if (product) {
                    console.log('Product created at /changeTableReservation: ' + product);
                    res.send(JSON.stringify(product));
                }
            });
        });
        app.route('/vegetayes').post((req, res) => {
            // changeTableReservation(tableId: Number, resFrom: Date, cust: any, resTo: Date)
            console.log('Beléptünk a /vegetaYes-be');
            tableBooking_1.getCustomerFromPhone("06304445555", "5bade1066eab8e29c05a7c48", (err, product) => {
                if (err) {
                    console.log('Error at /changeTableReservation: ' + err);
                    res.send(JSON.stringify(err));
                }
                if (product) {
                    console.log('Product created at /changeTableReservation: ' + product);
                    res.send(JSON.stringify(product));
                }
            });
        });
        //
    }
}
exports.TableBookingRoutes = TableBookingRoutes;
/*
                if (err) console.log('Error at creating new Consumer (OUTSIDE): ' + err);
                if (result) {
                    console.log('Successful Result document at creating new Consumer (OUTSIDE): ' + result);
                    consumer = result;
                    console.log('consumer változó értéke: ' + consumer);

                    let rest;
                    let restDTO = new RestaurantDTO('bitch you just jealous at my swagga');
                    addNewRestaurant(restDTO, function (err, result) {
                        if (err) console.log('Error at addNewRestaurant (OUTSIDE): ' + err);
                        if (result) {
                            console.log('Successful Result document at addNewRestaurant (OUTSIDE): ' + result);
                            rest = result;
                            console.log('rest változó értéke: ' + rest);

                            var table = new tableDTO('dummyID', 4, true, 'anyád picsájába',
                                true, [{reservedFrom: new Date(), reservedTo: new Date(), reservedFor: consumer},
                                    {reservedFrom: new Date(), reservedTo: new Date(), reservedFor: consumer}]);
                            createNewTableBooking(rest, table, 3, 5, 'AVAIL', function (err, prod) {
                                if (err) console.log('Error at createNewTableBooking (OUTSIDE): ' + err);
                                if (prod) {
                                    console.log('Successful Result documentation at createNewTableBooking (OUTSIDE): ' + prod);
                                    res.json(prod);
                                }
                            });
                        }
                    });
                }
            });
 */
//# sourceMappingURL=tableBookingRoutes.js.map