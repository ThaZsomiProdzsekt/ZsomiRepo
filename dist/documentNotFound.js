"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genericException_1 = require("./genericException");
var Entities;
(function (Entities) {
    Entities[Entities["mealName"] = 0] = "mealName";
    Entities[Entities["drinkName"] = 1] = "drinkName";
    Entities[Entities["streetName"] = 2] = "streetName";
    Entities[Entities["consumerName"] = 3] = "consumerName";
    Entities[Entities["restaurantName"] = 4] = "restaurantName";
    Entities[Entities["discountName"] = 5] = "discountName";
    Entities[Entities["courierName"] = 6] = "courierName";
    Entities[Entities["orderId"] = 7] = "orderId";
    Entities[Entities["phone"] = 8] = "phone";
})(Entities = exports.Entities || (exports.Entities = {}));
/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
class DocumentNotFound extends genericException_1.GenericException {
    constructor(message, status, missingEntity) {
        super(message, status);
        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        this._missingEntity = missingEntity;
    }
    get stackTrace() {
        return this.stackTrace;
    }
    get inputName() {
        return this._inputName;
    }
    get missingEntity() {
        return this._missingEntity;
    }
}
exports.DocumentNotFound = DocumentNotFound;
//# sourceMappingURL=documentNotFound.js.map