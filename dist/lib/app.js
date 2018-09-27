"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const drinksRoutes_1 = require("../routes/drinksRoutes");
const database_1 = require("../config/database");
const tableBookingRoutes_1 = require("../routes/tableBookingRoutes");
class App {
    constructor() {
        this.routePrv = new drinksRoutes_1.DrinksRoutes();
        this.routeLfsz = new tableBookingRoutes_1.TableBookingRoutes();
        this.mongoSetup();
        this.app = express();
        this.config();
        this.routePrv.drinksRoutes(this.app);
        this.routeLfsz.tableBookingRoutes(this.app);
    }
    /*
        private routes(app: any): void {
            let router = app.Router();
    
            router.get('/', (req, res, next) => {
                res.json({
                    message: 'FFS'
                });
            });
            this.app.use('/', router);
        }
    */
    mongoSetup() {
        database_1.DBConfig.connectMongoDB();
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map