"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationCheckers {
    /**
     * Returns true if the given parameters' type is neither undefined nor null.
     * @param value The must-be-existing parameter.
     */
    static isDefined(value) {
        return value !== undefined && value !== null;
    }
    /**
     * Returns true if the given parameter exists AND its type is "string" (and Not null Or undefined), AND its not an empty string!
     * @param value the parameter.
     */
    static stringExistsAndNotEmpty(value) {
        return this.isDefined(value) && (typeof value === 'string') && value != '';
    }
    /**
     * Returns true if the given parameter exists AND its type is "string" (and Not null Or undefined), AND its not an empty string!
     * @param value the parameter.
     * @param typ
     */
    static typedArrayExistsAndNotEmpty(value, typ) {
        let ret = this.isDefined(value) && (Array.isArray(value)) && value.length > 0;
        try {
            value.forEach((element) => {
                if (typeof element !== typ)
                    ret = false;
            });
        }
        catch (err) {
            console.log('Itt valszeg egy castolási error van, vagy pedig az element typ faszság!');
            ret = false;
        }
        return ret;
    }
    /**
     * Always about the children. Usually what they do is to grow up under my rule or dedicate their pathetic lives for revenge. Usually both.
     * @param value the parameter.
     */
    static numberExistsAndNotNull(value) {
        return this.isDefined(value) && (typeof value === 'number') && value > 0;
    }
}
exports.ValidationCheckers = ValidationCheckers;
//# sourceMappingURL=validationCheckers.js.map