import {GenericException} from "../genericException";
import {CheckIfInputIsCorrupted} from "../checkIfInputIsCorrupted";
import {InapprConsumerInputEntities} from "./inappropriateConsumerInputException";

export type inputEntities = {};

/**
 * Class to represent errors when the following scenario occours: The consumer does not provide an appropriate name for
 * someting (e.g.: a name of a meal, an inappropriate address etc. There are predefined needed entities for which this
 * exception class can be used for.
 */
export abstract class InappropriateInputException<T> extends GenericException {
    private _input;
    private _missingEntity;
    private _entity: T;

    constructor(message, status, input: any[], missingEntity: T[]) {
        super(message, status);

        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        this._input = input;
        this._missingEntity = missingEntity;
    }

    get stackTrace() {
        return this.stackTrace;
    }

    get inputName() {
        return this._input;
    }

    get missingEntity() {
        return this._missingEntity;
    }

    get entity() {
        return this._entity;
    }

    abstract checkIfCorrupted<E extends InappropriateInputException<T>>(fixable: {input: any, entity: T}[]): E;
}
