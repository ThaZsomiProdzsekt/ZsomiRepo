import {DocumentNotFoundException} from "./documentNotFoundException";

/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */

export enum ConsumerNotFoundEntities {
    consName,
    consPhone,
    consOrderLocation,
    consOrderDate,
    consOtherInfo,
    consTableBooking
}

export class ConsumerDocNotFoundException extends DocumentNotFoundException {
    private _missingEntity;

    constructor(message, status, missingEntity: ConsumerNotFoundEntities[]) {
        super(message, status);

        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
        this._missingEntity = missingEntity;
    }

    getMissingEntity(): any {
        return this._missingEntity;
    }

}
