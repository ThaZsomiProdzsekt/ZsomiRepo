import { Request, Response, NextFunction } from "express";
import { OrderDTO } from "../DTOs/orderDTO";
import {addNewOrder, getOrderBasedOnDates} from "../models/order";
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

        app.route('/getOrderBasedOnDate').post((req: Request, res: Response) => {
            let begDate;
            let endDate;
            try{
                 begDate = new Date(req.body.begDate);
                 endDate = new Date(req.body.endDate);
            } catch (err) {
                //TODO: itt meg kéne csinálni, hogy mindenféle faszájos formátumokat is elfogadjon meg ilyenek.
                res.send(err);
            }

            getOrderBasedOnDates(begDate, endDate, (err, doc) => {
                if (err) res.send(err);
                if (doc) doc.send(doc);
            });
        });
    }
}