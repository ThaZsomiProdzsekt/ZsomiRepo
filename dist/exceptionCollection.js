"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericException_1 = require("./genericException");
// TODO: meg kéne csinálni hogy beadom az inputokat, és az alapján felépíti az Exceptiont.
class ExceptionCollection extends genericException_1.GenericException {
    constructor(message, status) {
        super(message, status);
        this._exceptions = [];
        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }
    addNewException(ex) {
        this._exceptions.push(ex);
    }
    buildExceptions() {
        return this._exceptions;
    }
}
exports.ExceptionCollection = ExceptionCollection;
//# sourceMappingURL=exceptionCollection.js.map