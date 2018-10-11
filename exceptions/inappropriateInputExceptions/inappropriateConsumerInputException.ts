import {InappropriateInputException} from "./InappropriateInputException";

export enum InapprConsumerInputEntities {
    consId,
    consName,
    consPhone,
    consOrderLocation,
    consOrderDate,
    consOtherInfo,
    consTableBooking
}

/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
export class InappropriateConsumerInputException extends InappropriateInputException {
    // TODO: A message-re be kéne lőni egy default message-t, ha null-adnak be, + típusok meg ilyenek + azt ha üres tömböt adnak be missingEntity-be akkor mindegyiket dobja
    // TODO: meg kéne csinálni hogy input-ba string[] legyen
    constructor(message, status, input: string[], missingEntity: any[]) {
        super(message, status, input, missingEntity);

        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }

    get stackTrace() {
        return this.stackTrace;
    }

}
