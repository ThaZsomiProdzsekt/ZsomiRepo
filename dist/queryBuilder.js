"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    static createQueryFromNonNullFields(isntance) {
        let ret = [];
        Object.keys(isntance).forEach((key, value) => {
            if (value && key) {
                console.log(value);
                console.log(key);
            }
        });
        console.log('ret értéke: ');
        console.log(ret);
        return ret;
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=queryBuilder.js.map