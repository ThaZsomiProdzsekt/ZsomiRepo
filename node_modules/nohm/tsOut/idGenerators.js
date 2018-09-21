"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Debug = require("debug");
const debug = Debug('nohm:idGenerator');
exports.idGenerators = {
    default: async function defaultGenerator() {
        const newId = uuid_1.v1();
        debug('Generated default (uuid) id: %s.', newId);
        return newId;
    },
    increment: function incrementGenerator(client, idPrefix) {
        return new Promise((resolve, reject) => {
            client.incr(idPrefix, (err, newId) => {
                if (err) {
                    reject(err);
                }
                else {
                    debug('Generated incremental id: %s.', newId);
                    resolve(newId.toString(10));
                }
            });
        });
    },
};
//# sourceMappingURL=idGenerators.js.map