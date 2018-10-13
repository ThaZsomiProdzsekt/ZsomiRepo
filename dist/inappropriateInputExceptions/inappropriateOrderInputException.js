"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InappropriateInputException_1 = require("./InappropriateInputException");
var InapprOrderInputEntities;
(function (InapprOrderInputEntities) {
    InapprOrderInputEntities[InapprOrderInputEntities["orderId"] = 0] = "orderId";
    InapprOrderInputEntities[InapprOrderInputEntities["orderDate"] = 1] = "orderDate";
    InapprOrderInputEntities[InapprOrderInputEntities["orderMeal"] = 2] = "orderMeal";
    InapprOrderInputEntities[InapprOrderInputEntities["orderDrink"] = 3] = "orderDrink";
    InapprOrderInputEntities[InapprOrderInputEntities["orderDiscounted"] = 4] = "orderDiscounted";
    InapprOrderInputEntities[InapprOrderInputEntities["ordererName"] = 5] = "ordererName";
    InapprOrderInputEntities[InapprOrderInputEntities["ordererAddress"] = 6] = "ordererAddress";
    InapprOrderInputEntities[InapprOrderInputEntities["ordererPhone"] = 7] = "ordererPhone";
    InapprOrderInputEntities[InapprOrderInputEntities["ordererTableReservations"] = 8] = "ordererTableReservations";
})(InapprOrderInputEntities = exports.InapprOrderInputEntities || (exports.InapprOrderInputEntities = {}));
/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
class InappropriateOrderInputException extends InappropriateInputException_1.InappropriateInputException {
    // TODO: A message-re be kéne lőni egy default message-t, ha null-adnak be, + típusok meg ilyenek + azt ha üres tömböt adnak be missingEntity-be akkor mindegyiket dobja
    // TODO: meg kéne csinálni hogy input-ba string[] legyen
    constructor(message, status, input, missingEntity) {
        super(message, status, input, missingEntity);
        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }
    get stackTrace() {
        return this.stackTrace;
    }
    checkIfCorrupted(input, entities) {
        return [];
    }
}
exports.InappropriateOrderInputException = InappropriateOrderInputException;
//# sourceMappingURL=inappropriateOrderInputException.js.map