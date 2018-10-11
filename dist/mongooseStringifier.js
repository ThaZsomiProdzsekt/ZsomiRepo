"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//hát ez gecier nem müxik
class MongooseStringifier {
    /**
     * Creates "key-value pair" type string from the props of a certain class' instance.
     * @param cls ze klasse
     */
    static createSetUpdateString(cls) {
        let ret = '';
        Object.keys(cls).forEach((key, value) => {
            if (value && key) {
                // What it will look like: <<<"field": "value", >>>
                ret += '"' + value + '"' + ': ' + '"' + value + '"' + ', ';
            }
        });
        console.log('ret értéke: ');
        console.log(ret);
        return ret;
    }
}
exports.MongooseStringifier = MongooseStringifier;
//# sourceMappingURL=mongooseStringifier.js.map