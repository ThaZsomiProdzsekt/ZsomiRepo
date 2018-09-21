"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-line-length
/**
 * Details about which part of linking failed.
 *
 * @type { Array.<{ success: boolean, child: NohmModel, parent: NohmModel, error: null | Error | LinkError | ValidationError}> }
 * @name errors
 * @memberof NohmErrors.LinkError#
 */
// tslint:enable:max-line-length
/**
 * Error thrown whenever linking failed during {@link NohmModel#save}.
 *
 * @class LinkError
 * @memberof NohmErrors
 * @extends {Error}
 */
class LinkError extends Error {
    constructor(errors, errorMessage = 'Linking failed. See .errors on this Error object for an Array of failures.') {
        super(errorMessage);
        this.errors = errors;
    }
}
exports.LinkError = LinkError;
//# sourceMappingURL=LinkError.js.map