import { Request, Response, NextFunction } from "express";
import { addNewConsumer, setConsumerValues, findConsumersBasedOnOtherInfo, getConsumersOrders} from '../models/consumer';
import { ConsumersDTO } from "../DTOs/consumersDTO";
import { Consumer } from '../models/consumer';
import * as mongoose from 'mongoose';


export class ConsumersRoutes {
    public consumersRoutes(app): void {

        // NEW DRINK
        app.route('/newCustomer').get((req: Request, res: Response) => {
            let cons = new ConsumersDTO(
                req.body.name, req.body.phone, req.body.locationsWhereOrdered, req.body.orders, req.body.tablebookings,
                req.body.otherInformation
            );
            addNewConsumer(cons, (err, result) => {
                if (err) console.log('Error at endpoint /newCustomer: ' + err);
                if (result) console.log('Successful Result document at /newCustomer: ' + result);
                res.send(result);
            });
        });

        app.route('/updateConsumer').post((req: Request, res: Response) => {
            let cons = new ConsumersDTO(
                req.body.name, req.body.phone, req.body.locationsWhereOrdered, req.body.orders, req.body.tableBookings,
                req.body.otherInformation
            );

            setConsumerValues(cons, (err, result) => {
                if (err) {
                    console.log('Error at endpoint /newCustomer: ' + err);
                    res.send(err);
                }
                if (result) {
                    console.log('Successful Result document at /newCustomer: ' + result);
                    res.send(result);
                }
            });
        });

        app.route('/findConsumerByOtherInformation').post((req: Request, res: Response) => {
            let otherInf: string = req.body.otherInformation;

            findConsumersBasedOnOtherInfo(otherInf, (err, doc) =>  {
                if (err) {
                    console.log('Error at endpoint /newCustomer: ' + err);
                    res.send(err);
                }
                if (doc) {
                    console.log('Successful Result document at /newCustomer: ' + doc);
                    res.send(doc);
                }
            });
        });

        app.route('/getConsumersOrders').post((req: Request, res: Response) => {
            let custid = req.body.custId;

            getConsumersOrders(custid, (err, doc) => {
                if (err) res.send(err);
                if (doc) res.send(doc);
            });
        });
    }
}