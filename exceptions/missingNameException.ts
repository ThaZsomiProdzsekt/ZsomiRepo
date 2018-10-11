import {GenericException} from "./genericException";

export enum Entities {
    mealName,
    drinkName,
    streetName,
    consumerName,
    restaurantName,
    discountName,
    courierName,
    orderId,
    phone
}

/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
export class MissingNameException extends GenericException {
    private _inputName;
    private _missingEntity;

    constructor(message, status, missingEntity: Entities[]) {
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
