"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPrefix(prefix) {
    return {
        channel: prefix + ':channel:',
        hash: prefix + ':hash:',
        idsets: prefix + ':idsets:',
        incrementalIds: prefix + ':ids:',
        index: prefix + ':index:',
        meta: {
            idGenerator: prefix + ':meta:idGenerator:',
            properties: prefix + ':meta:properties:',
            version: prefix + ':meta:version:',
        },
        relationKeys: prefix + ':relationKeys:',
        relations: prefix + ':relations:',
        scoredindex: prefix + ':scoredindex:',
        unique: prefix + ':uniques:',
    };
}
exports.getPrefix = getPrefix;
function checkEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (!obj1 || (obj1 && !obj2)) {
        return false;
    }
    if (Object.hasOwnProperty.call(obj1, 'modelName') &&
        Object.hasOwnProperty.call(obj2, 'modelName') &&
        obj1.modelName === obj2.modelName) {
        // both must have the same id.
        if (obj1.id && obj2.id && obj1.id === obj2.id) {
            return true;
        }
    }
    return false;
}
exports.checkEqual = checkEqual;
function callbackError(...args) {
    if (args.length > 0) {
        const lastArgument = args[args.length - 1];
        if (typeof lastArgument === 'function') {
            throw new Error('Callback style has been removed. Use the returned promise.');
        }
    }
}
exports.callbackError = callbackError;
//# sourceMappingURL=helpers.js.map