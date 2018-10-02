import * as mongoose from 'mongoose';
import { DBConfig } from '../config/database';
// import * as http from 'http';
import app from "./app";
const PORT = 3000;

app.listen(PORT, () => {
    console.log('Express server listening on port: ' + PORT);
});

//const server = http.createServer(app);

/*
const server = app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
    DBConfig.connectMongoDB();
});
*/

/*
server.listen(PORT);
server.on('listening', () => {
    console.log('Express server listening on port ' + PORT);
    DBConfig.connectMongoDB();
});

server.on('error', (err) => {
    console.log('Express server ERROR ' + err);
});
*/

/*
const httpsOptions = {
}

https.createServer(httpsOptions, app).listen(PORT, () => {
   console.log('Express server listening on port: ' + PORT)
});
*/