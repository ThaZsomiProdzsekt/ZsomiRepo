"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const drinks_1 = require("../routes/drinks");
const database_1 = require("../config/database");
class App {
    constructor() {
        this.routePrv = new drinks_1.Routes();
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
        //this.connectToDatabase();
    }
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