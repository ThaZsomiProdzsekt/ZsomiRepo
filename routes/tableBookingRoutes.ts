import { Request, Response } from "express";
import { createNewTableBooking } from '../models/tableBooking';
import { tableDTO } from "../DTOs/tablesDTO";
import { addNewConsumer } from '../models/consumer';
import { ConsumersDTO } from "../DTOs/consumersDTO";
import {RestaurantDTO} from "../DTOs/restaurantDTO";
import {addNewRestaurant} from "../models/restaurant";

export class TableBookingRoutes {
    public tableBookingRoutes(app): void {
        // NEW DRINK
        app.route('/newTableBooking').get((req: Request, res: Response) => {
            let consumer;
            let cons = new ConsumersDTO('Mr. Im gonna fucking kill you');
            addNewConsumer(cons, function (err, result) {
                if (err) console.log('Error at creating new Consumer (OUTSIDE): ' + err);
                if (result) {
                    console.log('Result document at creating new Consumer (OUTSIDE): ' + result);
                    consumer = result;
                }
            });

            let rest;
            let restDTO = new RestaurantDTO('bitch you just jealous at my swagga');
            addNewRestaurant(restDTO, function (err, result) {
                if (err) console.log('Error at addNewRestaurant (OUTSIDE): ' + err);
                if (result) console.log('Result document at addNewRestaurant (OUTSIDE): ' + result);
                rest = result;
            });

            var table = new tableDTO('dummyID', 4, true, 'anyád picsájába',
                true, [{reservedFrom: new Date(), reservedTo: new Date(), reservedFor: consumer},
                    {reservedFrom: new Date(), reservedTo: new Date(), reservedFor: consumer}]);
            createNewTableBooking(rest, table, 3, 3, 'Pokemon', function (err, prod) {
                if (err) console.log('Error at createNewTableBooking (OUTSIDE): ' + err);
                if (prod) console.log('Result documentation at createNewTableBooking (OUTSIDE): ' + prod);
            });
        });
    }
}