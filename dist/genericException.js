"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericException extends Error {
    constructor(message, status) {
        super(message);
        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.GenericException = GenericException;
//# sourceMappingURL=genericException.js.map