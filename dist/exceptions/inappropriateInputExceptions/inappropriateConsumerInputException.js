"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InappropriateInputException_1 = require("./InappropriateInputException");
const validationCheckers_1 = require("../../helpers/validationCheckers");
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
        let arr = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprConsumerInputEntities.consId: {
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push(InapprConsumerInputEntities.consId);
                    }
                    break;
                }
                case InapprConsumerInputEntities.consName: {
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push(InapprConsumerInputEntities.consName);
                    }
                    break;
                }
                case InapprConsumerInputEntities.consPhone: {
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push(InapprConsumerInputEntities.consPhone);
                    }
                    break;
                }
                case InapprConsumerInputEntities.consOtherInfo: {
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push(InapprConsumerInputEntities.consOtherInfo);
                    }
                    break;
                }
                // TODO: Többi esetre.
            }
        });
        if (arr.length > 0) {
            let inputs = [];
            let entities = [];
            fixable.forEach((i) => {
                inputs.push(i.input);
                entities.push(i.entity);
            });
            return new InappropriateConsumerInputException('There was/were inappropriate Customer inputs!', 500, inputs, entities);
        }
    }
    static checkIfInputsCorrupted(fixable) {
        let arr = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprConsumerInputEntities.consId:
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({ input: i.input, entity: InapprConsumerInputEntities.consId });
                    }
                    break;
                case InapprConsumerInputEntities.consName:
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({ input: i.input, entity: InapprConsumerInputEntities.consName });
                    }
                    break;
                case InapprConsumerInputEntities.consPhone:
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({ input: i.input, entity: InapprConsumerInputEntities.consPhone });
                    }
                    break;
                case InapprConsumerInputEntities.consOtherInfo:
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({ input: i.input, entity: InapprConsumerInputEntities.consOtherInfo });
                    }
                    break;
                default:
                    if (!validationCheckers_1.ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({ input: i.input, entity: i.entity });
                    }
                // TODO: Többi esetre.
            }
        });
        if (arr.length > 0) {
            return arr;
        }
        else {
            return null;
        }
    }
}
exports.InappropriateConsumerInputException = InappropriateConsumerInputException;
//# sourceMappingURL=inappropriateConsumerInputException.js.map