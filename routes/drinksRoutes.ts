import {Request, Response} from "express";
import {drinksDTO} from "../DTOs/drinksDTO";
import {addNewDrink} from "../models/drink";

export class DrinksRoutes {
    public drinksRoutes(app): void {
        // DEFAULT PATH
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send(
                { message: 'GET request successfulll!!!!' }
                );
        });

        // NEW DRINK
        app.route('/newDrink').get((req: Request, res: Response) => {
            var drink = new drinksDTO('kamudrink1', 'kicsi', 0.3, 30, ['asd', 'Burter SUPPORT']);
            addNewDrink(drink, function (err, product) {
                console.log('Err value: ' + err);
                res.send('hurray');
            });
        });
    }
}