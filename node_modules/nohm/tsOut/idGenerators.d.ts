import * as redis from 'redis';
export interface IGenerators {
    [key: string]: (client: redis.RedisClient, idPrefix: string) => Promise<string>;
}
export declare const idGenerators: IGenerators;
//# sourceMappingURL=idGenerators.d.ts.map