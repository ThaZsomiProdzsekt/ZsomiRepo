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
    }
}
exports.OrdersRoutes = OrdersRoutes;
//# sourceMappingURL=ordersRoutes.js.map