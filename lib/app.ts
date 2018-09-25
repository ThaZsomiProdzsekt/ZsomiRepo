import * as express from "express";
import * as bodyParser from "body-parser";
import * as redis from 'redis';
import { Routes } from "../routes/drinks";
import * as mongoose from "mongoose";
import {DBConfig} from "../config/database";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
        //this.connectToDatabase();
    }

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