import { Request, Response } from "express";
import { createNewTableBooking, changeTableReservation } from '../models/tableBooking';
import { tableDTO } from "../DTOs/tablesDTO";
import { addNewConsumer } from '../models/consumer';
import { ConsumersDTO } from "../DTOs/consumersDTO";
import {RestaurantDTO} from "../DTOs/restaurantDTO";
import {addNewRestaurant} from "../models/restaurant";
import * as mongoose from "mongoose";

export class TableBookingRoutes {
    public tableBookingRoutes(app): void {
        // Create a new TableBooking for a given Restaurant!
        app.route('/newTableBooking').post((req: Request, res: Response) => {
            let belTo: mongoose.Schema.Types.ObjectId = req.body.belTo; // Ezt elvileg lehet, postmanbe müxik, no error
            let theTables: tableDTO = req.body.theTables;
            let numOfTables: Number;
            let numOfChairs: Number;
            let genAvail: String;
            if (req.body.numOfTables) numOfTables = req.body.numOfTables;
            if (req.body.numOfChairs) numOfChairs = req.body.numOfChairs;
            if (req.body.genAvail) genAvail = req.body.genAvail;

            createNewTableBooking(belTo, theTables, numOfTables, numOfChairs, genAvail, (err, product) => {
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
        app.route('/changeTableReservation').post((req: Request, res: Response) => {
            // changeTableReservation(tableId: Number, resFrom: Date, cust: any, resTo: Date)
            let tableId: String = req.body.tableId;
            let resFrom: Date = req.body.resFrom;
            let resTo: Date = req.body.resTo;
            let cust: mongoose.Schema.Types.ObjectId = req.body.cust;
            let belTo: mongoose.Schema.Types.ObjectId = req.body.belTo;

            changeTableReservation(tableId, resFrom, resTo, cust, belTo, (err, product) => {
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