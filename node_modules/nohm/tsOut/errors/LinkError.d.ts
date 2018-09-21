import { ILinkSaveResult } from '../model.header';
export interface ILinkError extends Error {
    errors: Array<ILinkSaveResult>;
}
/**
 * Details about which part of linking failed.
 *
 * @type { Array.<{ success: boolean, child: NohmModel, parent: NohmModel, error: null | Error | LinkError | ValidationError}> }
 * @name errors
 * @memberof NohmErrors.LinkError#
 */
/**
 * Error thrown whenever linking failed during {@link NohmModel#save}.
 *
 * @class LinkError
 * @memberof NohmErrors
 * @extends {Error}
 */
export declare class LinkError extends Error implements ILinkError {
    errors: Array<ILinkSaveResult>;
    constructor(errors: Array<ILinkSaveResult>, errorMessage?: string);
}
//# sourceMappingURL=LinkError.d.ts.map