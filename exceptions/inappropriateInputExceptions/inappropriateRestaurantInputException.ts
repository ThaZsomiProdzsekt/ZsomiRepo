import {InappropriateInputException} from "./InappropriateInputException";
import {InapprOrderInputEntities} from "./inappropriateOrderInputException";
import {ValidationCheckers} from "../../helpers/validationCheckers";

export enum InapprRestaurantInputEntities {
    restName,
    restLoc,
    restPhone,
    restEmail,
    restSite,
    additionalInfo,
    openHoursOnHolidays,
    defaultHoursPerDay
}

/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
export class InappropriateRestaurantInputException extends InappropriateInputException<InapprRestaurantInputEntities> {
    // TODO: A message-re be kéne lőni egy default message-t, ha null-adnak be, + típusok meg ilyenek + azt ha üres tömböt adnak be missingEntity-be akkor mindegyiket dobja
    // TODO: meg kéne csinálni hogy input-ba string[] legyen
    constructor(message, status, input: any[], missingEntity: InapprRestaurantInputEntities[]) {
        super(message, status, input, missingEntity);

        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }

    get stackTrace() {
        return this.stackTrace;
    }

    checkIfCorrupted(fixable: { input: any, entity: InapprRestaurantInputEntities }[]): InapprRestaurantInputEntities[] {
        let ret: InapprRestaurantInputEntities[] = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprRestaurantInputEntities.restName: {
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        ret.push(InapprRestaurantInputEntities.restName);
                    }
                    break;
                }
                // TODO: Többi esetre.
            }
        });

        return ret;
    }

    public static checkIfInputsCorrupted(fixable: { input: any, entity: InapprRestaurantInputEntities }[])
        : { input: any, entity: InapprRestaurantInputEntities }[] {

        let arr: { input: any, entity: InapprRestaurantInputEntities }[] = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprRestaurantInputEntities.restName: {
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: InapprRestaurantInputEntities.restName})
                    }
                    break;
                }
                default: {
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: i.entity});
                    }
                }
            }
            // TODO: Többi esetre.
        });

        if (arr.length > 0) {
            return arr;
        } else {
            return null;
        }
    }

}
