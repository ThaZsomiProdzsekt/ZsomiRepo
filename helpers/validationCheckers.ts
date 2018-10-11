import {types} from "util";

export class ValidationCheckers {
    /**
     * Returns true if the given parameters' type is neither undefined nor null.
     * @param value The must-be-existing parameter.
     */
    public static isDefined<T>(value: T | undefined | null): value is T {
        return <T>value !== undefined && <T>value !== null;
    }

    /**
     * Returns true if the given parameter exists AND its type is "string" (and Not null Or undefined), AND its not an empty string!
     * @param value the parameter.
     */
    public static stringExistsAndNotEmpty<T>(value: T | string): boolean {
        return this.isDefined(value) && (typeof value === 'string') && value != '';
    }

    /**
     * Returns true if the given parameter exists AND its type is "string" (and Not null Or undefined), AND its not an empty string!
     * @param value the parameter.
     * @param typ
     */
    public static typedArrayExistsAndNotEmpty<T>(value: T | Array<any>, typ: string): boolean {
        let ret: boolean = this.isDefined(value) && (Array.isArray(value)) && value.length > 0;

        try{
            (value as Array<any>).forEach((element) => {
                if (typeof element !== typ) ret = false;
            });
        } catch (err) {
            console.log('Itt valszeg egy castolási error van, vagy pedig az element typ faszság!');
            ret = false;
        }

        return ret;
    }


    /**
     * Always about the children. Usually what they do is to grow up under my rule or dedicate their pathetic lives for revenge. Usually both.
     * @param value the parameter.
     */
    public static numberExistsAndNotNull<T>(value: T | number): boolean {
        return this.isDefined(value) && (typeof value === 'number') && value > 0;
    }

    //public static propertiesAndValues()
 }