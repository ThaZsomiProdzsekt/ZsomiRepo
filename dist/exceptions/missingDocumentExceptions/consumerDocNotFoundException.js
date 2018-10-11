"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const documentNotFoundException_1 = require("./documentNotFoundException");
/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
var ConsumerNotFoundEntities;
(function (ConsumerNotFoundEntities) {
    ConsumerNotFoundEntities[ConsumerNotFoundEntities["consName"] = 0] = "consName";
    ConsumerNotFoundEntities[ConsumerNotFoundEntities["consPhone"] = 1] = "consPhone";
    ConsumerNotFoundEntities[ConsumerNotFoundEntities["consOrderLocation"] = 2] = "consOrderLocation";
    ConsumerNotFoundEntities[ConsumerNotFoundEntities["consOrderDate"] = 3] = "consOrderDate";
    ConsumerNotFoundEntities[ConsumerNotFoundEntities["consOtherInfo"] = 4] = "consOtherInfo";
    ConsumerNotFoundEntities[ConsumerNotFoundEntities["consTableBooking"] = 5] = "consTableBooking";
})(ConsumerNotFoundEntities = exports.ConsumerNotFoundEntities || (exports.ConsumerNotFoundEntities = {}));
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