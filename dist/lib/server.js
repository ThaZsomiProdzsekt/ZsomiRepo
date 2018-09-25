"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const app_1 = require("./app");
const PORT = 3000;
const server = app_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
    database_1.DBConfig.connectMongoDB();
});
/*
const httpsOptions = {
}

https.createServer(httpsOptions, app).listen(PORT, () => {
   console.log('Express server listening on port: ' + PORT)
});
*/ 
//# sourceMappingURL=server.js.map