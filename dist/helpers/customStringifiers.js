"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//hát ez gecier nem müxik
class CustomStringifiers {
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
    // TODO: Ide be kéne baszni azt hogy hogyan nézne ki az amikor a német ügyfél nem diktálja be a 06-ot meg ilyenek, nem vágom ott mi a konvenció
    static removeWhitespaces(phoneNum) {
        return phoneNum.replace(/\D/g, '');
    }
}
exports.CustomStringifiers = CustomStringifiers;
//# sourceMappingURL=customStringifiers.js.map