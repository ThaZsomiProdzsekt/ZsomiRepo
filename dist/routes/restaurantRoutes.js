"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurantDTO_1 = require("../DTOs/restaurantDTO");
const restaurant_1 = require("../models/restaurant");
class ConsumersRoutes {
    consumersRoutes(app) {
        // NEW DRINK
        app.route('/addNewRestaurant').get((req, res) => {
            let cons = new restaurantDTO_1.RestaurantDTO('DISTRACTO DISK RESTAURANT');
            restaurant_1.addNewRestaurant(cons, (err, result) => {
                if (err)
                    console.log('Error volt a customer létrehozásánál: ' + err);
                if (result)
                    console.log('Result documetn: ' + result);
                res.send(result);
            });
        });
    }
}
exports.ConsumersRoutes = ConsumersRoutes;
//# sourceMappingURL=restaurantRoutes.js.map