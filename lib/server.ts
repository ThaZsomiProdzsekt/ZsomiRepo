import * as mongoose from 'mongoose';
import { DBConfig } from '../config/database';
import * as https from 'https';
import app from "./app";
const PORT = 3000;

const server = https.createServer(app);

const server = app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
    DBConfig.connectMongoDB();
});


/*
const httpsOptions = {
}

https.createServer(httpsOptions, app).listen(PORT, () => {
   console.log('Express server listening on port: ' + PORT)
});
*/