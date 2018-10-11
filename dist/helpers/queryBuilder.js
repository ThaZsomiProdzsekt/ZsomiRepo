"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ez is szar
class QueryBuilder {
    static createQueryFromNonNullFields(isntance) {
        let ret = [];
        Object.keys(isntance).forEach((key, value) => {
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
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=queryBuilder.js.map