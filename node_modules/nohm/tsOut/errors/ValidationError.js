"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-line-length
/**
 * Details about which properties failed to validate in which way.
 *
 * The type is an object with property names as keys and then an array with validation
 * names of the validations that failed
 *
 * @type { Object.<string, Array<string>> }
 * @name errors
 * @memberof NohmErrors.ValidationError#
 */
// tslint:enable:max-line-length
/**
 * Error thrown whenever validation failed during {@link NohmModel#validate} or {@link NohmModel#save}.
 *
 * @class ValidationError
 * @memberof NohmErrors
 * @extends {Error}
 */
class ValidationError extends Error {
    constructor(errors, modelName, errorMessage = 'Validation failed. See .errors on this Error or the Nohm model instance for details.') {
        super(errorMessage);
        const emptyErrors = {};
        this.modelName = modelName;
        this.errors = Object.keys(errors).reduce((obj, key) => {
            const error = errors[key];
            if (error && error.length > 0) {
                obj[key] = error;
            }
            return obj;
        }, emptyErrors);
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=ValidationError.js.map