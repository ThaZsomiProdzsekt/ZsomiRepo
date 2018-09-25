"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*export var db_config = {
    database: 'mongodb://localhost:27017/ConvAPI',
    secret: 'yoursecret'
}
*/
const mongoose_1 = require("mongoose");
/*
*   Database connection to mongoDB
*/
class DBConfig {
    static connectMongoDB() {
        mongoose_1.connect('mongodb://localhost:27017/ConvAPI', (err) => {
            if (err)
                console.log("Faied to connect to DB: " + err);
            console.log("Successfully connected to MongoDB");
            console.log('Bazd meg anyád!');
        });
    }
}
exports.DBConfig = DBConfig;
//# sourceMappingURL=database.js.map