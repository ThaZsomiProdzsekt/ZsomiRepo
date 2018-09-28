<<<<<<< Updated upstream
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DrinksRoute {
    routes(app) {
        // DEFAULT CUCC
        let router = app.Router();
        app.use('/', router);
        router.get('/', (req, res, next) => {
            res.json({
                message: 'MUSTACHE'
            });
        });
        /*
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request was successful'
            });
            console.log('getre mente.')
        });

        // NEW USER
        app.route('/newUser').get((req: Request, res: Response) => {
            var drink = new drinksDTO('kamudrink1', 'kicsi', 0.3, 30);
            addNewDrink(drink, function (err) {
                console.log('Err value: ' + err);
            });
        });
        */
    }
}
exports.DrinksRoute = DrinksRoute;
/*
Router.post('/newDrink', (req: Request, res: Response) => {
    var drink = new drinksDTO('kamudrink1', 'kicsi', 0.3, 30);
    addNewDrink(drink);
});

Router.post();
*/
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    routes(app) {
        // DEFAULT CUCC
        let router = app.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'MUSTACHE'
            });
        });
        app.use('/', router);
        /*
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request was successful'
            });
            console.log('getre mente.')
        });

        // NEW USER
        app.route('/newUser').get((req: Request, res: Response) => {
            var drink = new drinksDTO('kamudrink1', 'kicsi', 0.3, 30);
            addNewDrink(drink, function (err) {
                console.log('Err value: ' + err);
            });
        });
        */
    }
}
exports.Routes = Routes;
/*
Router.post('/newDrink', (req: Request, res: Response) => {
    var drink = new drinksDTO('kamudrink1', 'kicsi', 0.3, 30);
    addNewDrink(drink);
});

Router.post();
*/
>>>>>>> Stashed changes
//# sourceMappingURL=drinks.js.map