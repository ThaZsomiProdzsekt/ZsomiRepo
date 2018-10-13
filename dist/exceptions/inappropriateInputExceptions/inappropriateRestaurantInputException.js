"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InappropriateInputException_1 = require("./InappropriateInputException");
const validationCheckers_1 = require("../../helpers/validationCheckers");
var InapprRestaurantInputEntities;
(function (InapprRestaurantInputEntities) {
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["restName"] = 0] = "restName";
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["restLoc"] = 1] = "restLoc";
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["restPhone"] = 2] = "restPhone";
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["restEmail"] = 3] = "restEmail";
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["restSite"] = 4] = "restSite";
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["additionalInfo"] = 5] = "additionalInfo";
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["openHoursOnHolidays"] = 6] = "openHoursOnHolidays";
    InapprRestaurantInputEntities[InapprRestaurantInputEntities["defaultHoursPerDay"] = 7] = "defaultHoursPerDay";
})(InapprRestaurantInputEntities = exports.InapprRestaurantInputEntities || (exports.InapprRestaurantInputEntities = {}));
/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
class InappropriateRestaurantInputException extends InappropriateInputException_1.InappropriateInputException {
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
    checkIfCorrupted(fixable) {
        let ret = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprRestaurantInputEntities.restName: {
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        ret.push(InapprRestaurantInputEntities.restName);
                    }
                    break;
                }
                // TODO: Többi esetre.
            }
        });
        return ret;
    }
    static checkIfInputsCorrupted(fixable) {
        let arr = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprRestaurantInputEntities.restName: {
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({ input: i.input, entity: InapprRestaurantInputEntities.restName });
                    }
                    break;
                }
                default: {
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({ input: i.input, entity: i.entity });
                    }
                }
            }
            // TODO: Többi esetre.
        });
        if (arr.length > 0) {
            return arr;
        }
        else {
            return null;
        }
    }
}
exports.InappropriateRestaurantInputException = InappropriateRestaurantInputException;
//# sourceMappingURL=inappropriateRestaurantInputException.js.map