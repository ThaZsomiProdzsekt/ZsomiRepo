"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documentNotFoundException_1 = require("./documentNotFoundException");
/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
var ConsumerEntities;
(function (ConsumerEntities) {
    ConsumerEntities[ConsumerEntities["consName"] = 0] = "consName";
    ConsumerEntities[ConsumerEntities["consPhone"] = 1] = "consPhone";
    ConsumerEntities[ConsumerEntities["consOrderLocation"] = 2] = "consOrderLocation";
    ConsumerEntities[ConsumerEntities["consOrderDate"] = 3] = "consOrderDate";
    ConsumerEntities[ConsumerEntities["consOtherInfo"] = 4] = "consOtherInfo";
    ConsumerEntities[ConsumerEntities["consTableBooking"] = 5] = "consTableBooking";
})(ConsumerEntities = exports.ConsumerEntities || (exports.ConsumerEntities = {}));
class ConsumerDocNotFoundException extends documentNotFoundException_1.DocumentNotFoundException {
    constructor(message, status, missingEntity) {
        super(message, status);
        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        this._missingEntity = missingEntity;
    }
    getMissingEntity() {
        return this._missingEntity;
    }
}
exports.ConsumerDocNotFoundException = ConsumerDocNotFoundException;
//# sourceMappingURL=consumerDocNotFoundException.js.map