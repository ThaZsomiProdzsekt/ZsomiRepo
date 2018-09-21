"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
exports.universalValidatorPath = path.join(__dirname, '..', 'ts', 'universalValidators.js');
// tslint:disable-next-line:no-var-requires
const newRawValidators = require(exports.universalValidatorPath);
/**
 * @namespace Validators
 */
exports.validators = newRawValidators.validators;
exports.regexps = newRawValidators.regexps;
//# sourceMappingURL=validators.js.map