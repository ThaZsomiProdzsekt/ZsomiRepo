import * as mongoose from 'mongoose';

// ez is szar
export class QueryBuilder {
    public static createQueryFromNonNullFields(isntance): Object[] {
        let ret: Object[] = [];

        Object.keys(isntance).forEach( (key, value) => {
            if (value && key) {
                console.log(value);
                console.log(key);
            }
        });

        console.log(Object.getOwnPropertyNames(isntance));
        console.log('ret értéke: ');
        console.log(ret);
        return ret;
    }

}