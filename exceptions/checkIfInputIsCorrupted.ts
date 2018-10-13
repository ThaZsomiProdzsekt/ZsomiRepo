import {GenericException} from "./genericException";

export interface CheckIfInputIsCorrupted {
    checkIfCorrupted<T>(input: any[], entities: T[]): T[];
}