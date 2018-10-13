"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orderDTO_1 = require("../DTOs/orderDTO");
const order_1 = require("../models/order");
class OrdersRoutes {
    ordersRoutes(app) {
        // NEW DRINK
        app.route('/addNewOrder').get((req, res) => {
            let cons = new orderDTO_1.OrderDTO('asdasdasdasd');
            order_1.addNewOrder(cons, (err, result) => {
                if (err)
                    console.log('Error volt a customer létrehozásánál: ' + err);
                if (result)
                    console.log('Result documetn: ' + result);
                res.send(result);
            });
        });
        app.route('/getOrderBasedOnDate').post((req, res) => {
            let begDate;
            let endDate;
            try {
                begDate = new Date(req.body.begDate);
                endDate = new Date(req.body.endDate);
            }
            catch (err) {
                //TODO: itt meg kéne csinálni, hogy mindenféle faszájos formátumokat is elfogadjon meg ilyenek.
                res.send(err);
            }
            order_1.getOrderBasedOnDates(begDate, endDate, (err, doc) => {
                if (err)
                    res.send(err);
                if (doc)
                    doc.send(doc);
            });
        });
    }
}
exports.OrdersRoutes = OrdersRoutes;
//# sourceMappingURL=ordersRoutes.js.map