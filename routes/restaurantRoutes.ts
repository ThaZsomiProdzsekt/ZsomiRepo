import { Request, Response, NextFunction } from "express";
import { RestaurantDTO } from "../DTOs/restaurantDTO";
import { addNewRestaurant } from "../models/restaurant";
import * as mongoose from 'mongoose';


export class ConsumersRoutes {
    public consumersRoutes(app): void {
        // NEW DRINK
        app.route('/addNewRestaurant').get((req: Request, res: Response) => {
            let cons = new RestaurantDTO('DISTRACTO DISK RESTAURANT');
            addNewRestaurant(cons, (err, result) => {
                if (err) console.log('Error volt a customer létrehozásánál: ' + err);
                if (result) console.log('Result documetn: ' + result);
                res.send(result);
            });
        });
    }
}