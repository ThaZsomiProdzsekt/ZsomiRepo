"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 3000;
function lofasz(dummy) {
    console.log('dummy: ' + dummy);
}
app_1.default.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
    lofasz("asdasd");
});
//# sourceMappingURL=server.js.map