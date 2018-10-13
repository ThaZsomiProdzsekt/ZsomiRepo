import {InappropriateInputException} from "./InappropriateInputException";
import {InapprOrderInputEntities} from "./inappropriateOrderInputException";
import {ValidationCheckers} from "../../helpers/validationCheckers";

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
export class InappropriateConsumerInputException extends InappropriateInputException<InapprConsumerInputEntities> {
    // TODO: A message-re be kéne lőni egy default message-t, ha null-adnak be, + típusok meg ilyenek + azt ha üres tömböt adnak be missingEntity-be akkor mindegyiket dobja
    // TODO: meg kéne csinálni hogy input-ba string[] legyen
    constructor(message, status, input: string[], missingEntity: InapprConsumerInputEntities[]) {
        super(message, status, input, missingEntity);

        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }

    get stackTrace() {
        return this.stackTrace;
    }

    checkIfCorrupted<InappropriateConsumerInputException>(fixable: {input: any, entity: InapprConsumerInputEntities}[]): InappropriateConsumerInputException {
        let arr: InapprConsumerInputEntities[] = [];
        fixable.forEach((i) => {
           switch (i.entity) {
               case InapprConsumerInputEntities.consId: {
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push(InapprConsumerInputEntities.consId);
                    } break;
               }
               case InapprConsumerInputEntities.consName: {
                   if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                       arr.push(InapprConsumerInputEntities.consName);
                   } break;
               }
               case InapprConsumerInputEntities.consPhone: {
                   if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                       arr.push(InapprConsumerInputEntities.consPhone);
                   } break;
               }
               case InapprConsumerInputEntities.consOtherInfo: {
                   if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                       arr.push(InapprConsumerInputEntities.consOtherInfo);
                   } break;
               }
               // TODO: Többi esetre.
           }
        });

        if (arr.length > 0) {
            let inputs: any[] = [];
            let entities: InapprConsumerInputEntities[] = [];
            fixable.forEach((i) => {
                inputs.push(i.input);
                entities.push(i.entity);
            });
            return new InappropriateConsumerInputException('There was/were inappropriate Customer inputs!',500, inputs, entities);
        }
    }

    public static checkIfInputsCorrupted(fixable: {input: any, entity: InapprConsumerInputEntities}[]):{input: any, entity: InapprConsumerInputEntities}[]  {
        let arr: { input: any, entity: InapprConsumerInputEntities }[] = [];
        fixable.forEach((i) => {
            switch (i.entity) {
                case InapprConsumerInputEntities.consId:
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: InapprConsumerInputEntities.consId}) } break;

                case InapprConsumerInputEntities.consName:
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: InapprConsumerInputEntities.consName}) } break;

                case InapprConsumerInputEntities.consPhone:
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: InapprConsumerInputEntities.consPhone}) } break;

                case InapprConsumerInputEntities.consOtherInfo:
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: InapprConsumerInputEntities.consOtherInfo}) } break;

                default:
                    if (!ValidationCheckers.stringExistsAndNotEmpty(i.input)) {
                        arr.push({input: i.input, entity: i.entity});
                    }
                // TODO: Többi esetre.
            }
        });

        if (arr.length > 0) {
            return arr;
        } else {
            return null;
        }
    }
}
