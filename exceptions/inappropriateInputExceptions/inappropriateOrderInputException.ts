import {InappropriateInputException} from "./InappropriateInputException";
import {InapprConsumerInputEntities} from "./inappropriateConsumerInputException";
import {InapprRestaurantInputEntities} from "./inappropriateRestaurantInputException";
import {ValidationCheckers} from "../../helpers/validationCheckers";

export enum InapprOrderInputEntities {
    orderId,
    orderDate,
    orderMeal,
    orderDrink,
    orderDiscounted,
    ordererName,
    ordererAddress,
    ordererPhone,
    ordererTableReservations
}

/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
export class InappropriateOrderInputException extends InappropriateInputException<InapprOrderInputEntities> {
    // TODO: A message-re be kéne lőni egy default message-t, ha null-adnak be, + típusok meg ilyenek + azt ha üres tömböt adnak be missingEntity-be akkor mindegyiket dobja
    // TODO: meg kéne csinálni hogy input-ba string[] legyen

    constructor(message, status, input: any[], missingEntity: InapprOrderInputEntities[]) {
        super(message, status, input, missingEntity);

        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

    }

    get stackTrace() {
        return this.stackTrace;
    }

    checkIfCorrupted(fixable: { input: any, entity: InapprOrderInputEntities }[]): InapprOrderInputEntities[] {
        let ret: InapprOrderInputEntities[] = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprOrderInputEntities.orderId: {
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        ret.push(InapprOrderInputEntities.orderId);
                    }
                    break;
                }
                // TODO: Többi esetre.
            }
        });

        return ret;
    }

    // TODO: Meg kéne csinálni, hogy a konstrucktor egy ilyen "{ input: any, entity: InapprOrderInputEntities }[])" struktúrát vegyen be és itt mindjárt errotr dobni
    public static checkIfInputsCorrupted(fixable: { input: any, entity: InapprOrderInputEntities }[]): { input: any, entity: InapprOrderInputEntities }[] {
        let arr: { input: any, entity: InapprOrderInputEntities }[] = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprOrderInputEntities.orderId: {
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: InapprOrderInputEntities.orderId})
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
