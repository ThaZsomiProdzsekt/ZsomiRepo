import { Request, Response, NextFunction } from "express";
import { addNewConsumer } from '../models/consumer';
import { ConsumersDTO } from "../DTOs/consumersDTO";
import { Consumer } from '../models/consumer';
import * as mongoose from 'mongoose';


export class ConsumersRoutes {
    public consumersRoutes(app): void {

        // NEW DRINK
        app.route('/newCustomer').get((req: Request, res: Response) => {
            let cons = new ConsumersDTO('Mr. Im gonna fucking kill you');
            addNewConsumer(cons, (err, result) => {
                if (err) console.log('Error at endpoint /newCustomer: ' + err);
                if (result) console.log('Result document at /newCustomer: ' + result);
                res.send(result);
            });
        });
    }
}