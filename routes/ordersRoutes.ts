import { Request, Response, NextFunction } from "express";
import { OrderDTO } from "../DTOs/orderDTO";
import { addNewOrder } from "../models/order";
import * as mongoose from 'mongoose';

export class OrdersRoutes {
    public ordersRoutes(app): void {
        // NEW DRINK
        app.route('/addNewOrder').get((req: Request, res: Response) => {
            let cons = new OrderDTO('asdasdasdasd');
            addNewOrder(cons, (err, result) => {
                if (err) console.log('Error volt a customer létrehozásánál: ' + err);
                if (result) console.log('Result documetn: ' + result);
                res.send(result);
            });
        });
    }
}