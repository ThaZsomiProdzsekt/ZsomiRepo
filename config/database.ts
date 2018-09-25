/*export var db_config = {
    database: 'mongodb://localhost:27017/ConvAPI',
    secret: 'yoursecret'
}
*/
import { connect } from 'mongoose';
/*
*   Database connection to mongoDB
*/
export class DBConfig {
    static connectMongoDB() {
        connect('mongodb://localhost:27017/ConvAPI', (err) => {
            if (err) console.log("Faied to connect to DB: " + err);
            console.log("Successfully connected to MongoDB");
            console.log('Bazd meg anyád!')
        });
    }
}