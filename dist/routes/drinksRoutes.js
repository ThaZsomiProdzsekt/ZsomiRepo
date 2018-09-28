"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drinksDTO_1 = require("../DTOs/drinksDTO");
const drink_1 = require("../models/drink");
class DrinksRoutes {
    drinksRoutes(app) {
        // DEFAULT PATH
        app.route('/').get((req, res) => {
            res.status(200).send({ message: 'GET request successfulll!!!!' });
        });
        // NEW DRINK
        app.route('/newDrink').get((req, res) => {
            var drink = new drinksDTO_1.drinksDTO('kamudrink1', 'kicsi', 0.3, 30, ['asd', 'Burter SUPPORT']);
            drink_1.addNewDrink(drink, function (err, product) {
                console.log('Err value: ' + err);
                res.send('hurray');
            });
        });
    }
}
exports.DrinksRoutes = DrinksRoutes;
//# sourceMappingURL=drinksRoutes.js.map