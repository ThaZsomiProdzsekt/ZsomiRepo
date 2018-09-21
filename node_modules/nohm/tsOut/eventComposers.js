"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The default (base) message creator
function defaultComposer() {
    return {
        target: {
            id: this.id,
            modelName: this.modelName,
            properties: this.allProperties(),
        },
    };
}
exports.defaultComposer = defaultComposer;
exports.create = defaultComposer;
// This populates the diff property for `save` and `update` events.
function changeComposer(diff) {
    const result = defaultComposer.apply(this);
    result.target.diff = diff;
    return result;
}
exports.update = changeComposer;
exports.save = changeComposer;
// This sets the id and properties
function remove(id) {
    const result = defaultComposer.apply(this);
    result.target.id = id;
    return result;
}
exports.remove = remove;
function relationComposer(parent, relationName) {
    const childPayload = defaultComposer.call(this);
    const parentPayload = defaultComposer.call(parent);
    return {
        child: childPayload.target,
        parent: parentPayload.target,
        relation: relationName,
    };
}
exports.link = relationComposer;
exports.unlink = relationComposer;
//# sourceMappingURL=eventComposers.js.map