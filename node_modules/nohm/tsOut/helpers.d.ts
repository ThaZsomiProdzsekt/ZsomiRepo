export interface INohmPrefixes {
    channel: string;
    hash: string;
    incrementalIds: string;
    idsets: string;
    index: string;
    meta: {
        version: string;
        idGenerator: string;
        properties: string;
    };
    relationKeys: string;
    relations: string;
    scoredindex: string;
    unique: string;
}
export declare function getPrefix(prefix: string): INohmPrefixes;
export declare function checkEqual(obj1: any, obj2: any): boolean;
export declare function callbackError(...args: Array<any>): void;
//# sourceMappingURL=helpers.d.ts.map