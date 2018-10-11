"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InappropriateInputException_1 = require("./InappropriateInputException");
var InapprConsumerInputEntities;
(function (InapprConsumerInputEntities) {
    InapprConsumerInputEntities[InapprConsumerInputEntities["consId"] = 0] = "consId";
    InapprConsumerInputEntities[InapprConsumerInputEntities["consName"] = 1] = "consName";
    InapprConsumerInputEntities[InapprConsumerInputEntities["consPhone"] = 2] = "consPhone";
    InapprConsumerInputEntities[InapprConsumerInputEntities["consOrderLocation"] = 3] = "consOrderLocation";
    InapprConsumerInputEntities[InapprConsumerInputEntities["consOrderDate"] = 4] = "consOrderDate";
    InapprConsumerInputEntities[InapprConsumerInputEntities["consOtherInfo"] = 5] = "consOtherInfo";
    InapprConsumerInputEntities[InapprConsumerInputEntities["consTableBooking"] = 6] = "consTableBooking";
})(InapprConsumerInputEntities = exports.InapprConsumerInputEntities || (exports.InapprConsumerInputEntities = {}));
/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
class InappropriateConsumerInputException extends InappropriateInputException_1.InappropriateInputException {
    constructor(message, status, inputName, input, missingEntity) {
        super(message, status, input, missingEntity);
        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        this._inputName = inputName;
    }
    get stackTrace() {
        return this.stackTrace;
    }
    get inputName() {
        return this._inputName;
    }
}
exports.InappropriateConsumerInputException = InappropriateConsumerInputException;
//# sourceMappingURL=inappropriateConsumerInputException.js.map