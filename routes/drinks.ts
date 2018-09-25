import * as mongoose from 'mongoose';
import * as express from 'express';
import {Router, Request, Response, NextFunction} from 'express';
import { tableDTO } from '../DTOs/tablesDTO';
import { IConsumer, Consumer, ConsumerSchema } from "../models/consumer";
import * as tableBooking from '../models/tableBooking';
import { TableBooking, TableBookingSchema, changeTableReservation } from "../models/tableBooking";
import { IDrink, Drink, DrinkSchema, addNewDrink } from "../models/drink";
import { drinksDTO } from "../DTOs/drinksDTO";
import app from '../lib/app';

export class Routes {
    public routes(app): void {
        // DEFAULT CUCC
        let router = app.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'MUSTACHE'
            });
        });
        app.use('/', router);
        /*
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request was successful'
            });
            console.log('getre mente.')
        });

        // NEW USER
        app.route('/newUser').get((req: Request, res: Response) => {
            var drink = new drinksDTO('kamudrink1', 'kicsi', 0.3, 30);
            addNewDrink(drink, function (err) {
                console.log('Err value: ' + err);
            });
        });
        */
    }
}
/*
Router.post('/newDrink', (req: Request, res: Response) => {
    var drink = new drinksDTO('kamudrink1', 'kicsi', 0.3, 30);
    addNewDrink(drink);
});

Router.post();
*/

