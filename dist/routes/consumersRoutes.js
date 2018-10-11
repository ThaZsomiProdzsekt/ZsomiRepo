"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consumer_1 = require("../models/consumer");
const consumersDTO_1 = require("../DTOs/consumersDTO");
class ConsumersRoutes {
    consumersRoutes(app) {
        // NEW DRINK
        app.route('/newCustomer').get((req, res) => {
            let cons = new consumersDTO_1.ConsumersDTO(req.body.name, req.body.phone, req.body.locationsWhereOrdered, req.body.orders, req.body.tablebookings, req.body.otherInformation);
            consumer_1.addNewConsumer(cons, (err, result) => {
                if (err)
                    console.log('Error at endpoint /newCustomer: ' + err);
                if (result)
                    console.log('Successful Result document at /newCustomer: ' + result);
                res.send(result);
            });
        });
        app.route('/updateConsumer').post((req, res) => {
            let cons = new consumersDTO_1.ConsumersDTO(req.body.name, req.body.phone, req.body.locationsWhereOrdered, req.body.orders, req.body.tableBookings, req.body.otherInformation);
            consumer_1.setConsumerValues(cons, (err, result) => {
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
        app.route('/findConsumerByOtherInformation').post((req, res) => {
            let otherInf = req.body.otherInformation;
            consumer_1.findConsumersBasedOnOtherInfo(otherInf, (err, doc) => {
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
        app.route('/getConsumersOrders').post((req, res) => {
            let custid = req.body.custId;
            consumer_1.getConsumersOrders(custid, (err, doc) => {
                if (err)
                    res.send(err);
                if (doc)
                    res.send(doc);
            });
        });
    }
}
exports.ConsumersRoutes = ConsumersRoutes;
//# sourceMappingURL=consumersRoutes.js.map