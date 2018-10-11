import {Class} from "babel-types";
//hát ez gecier nem müxik
export class CustomStringifiers {
    /**
     * Creates "key-value pair" type string from the props of a certain class' instance.
     * @param cls ze klasse
     */
    public static createSetUpdateString(cls): string {
        let ret: string = '';

        Object.keys(cls).forEach( (key, value) => {
           if (value && key) {
               // What it will look like: <<<"field": "value", >>>
               ret +='"' + value + '"' + ': ' + '"' + value + '"' + ', ';
           }
        });

        console.log('ret értéke: ');
        console.log(ret);
        return ret;
    }

    // TODO: Ide be kéne baszni azt hogy hogyan nézne ki az amikor a német ügyfél nem diktálja be a 06-ot meg ilyenek, nem vágom ott mi a konvenció
    public static removeWhitespaces(phoneNum: string): string {
        return phoneNum.replace(/\D/g, '');
    }

}