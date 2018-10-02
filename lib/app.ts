import * as express from "express";
import * as bodyParser from "body-parser";
import * as redis from 'redis';
import * as mongoose from "mongoose";
import { DBConfig } from "../config/database";
import { DrinksRoutes } from "../routes/drinksRoutes";
import { TableBookingRoutes } from "../routes/tableBookingRoutes";
import {Consumer} from "../models/consumer";

class App {
    public app: express.Application;
    public routePrv: DrinksRoutes = new DrinksRoutes();
    public routeLfsz: TableBookingRoutes = new TableBookingRoutes();
    public consModel: any;
    public tblBooking: any;

    constructor() {
        this.mongoSetup();
        this.app = express();
        this.config();
        this.consModel = require('../models/restaurant');
        this.tblBooking = require('../models/tableBooking');
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
    private mongoSetup() {
        DBConfig.connectMongoDB();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;