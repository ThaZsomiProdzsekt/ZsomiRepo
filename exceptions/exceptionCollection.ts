import {GenericException} from "./genericException";
import {Entities} from "./missingNameException";

// TODO: meg kéne csinálni hogy beadom az inputokat, és az alapján felépíti az Exceptiont.
export class ExceptionCollection extends GenericException{
    private _exceptions: GenericException[] = [];

    constructor(message, status) {
        super(message, status);

        // Saving class name in the property of our customer error as a shortcut
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }

    public addNewException<T extends GenericException>(ex: T) {
        this._exceptions.push(ex);
    }

    public buildExceptions<

    get exceptions(){
        return this._exceptions
    }
}