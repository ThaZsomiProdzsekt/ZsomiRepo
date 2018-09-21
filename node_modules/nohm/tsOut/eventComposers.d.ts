import { NohmModel } from './model';
import { IChangeEventPayload, IDefaultEventPayload, IPropertyDiff, IRelationChangeEventPayload } from './model.header';
export declare function defaultComposer<TProps>(this: NohmModel<TProps>): IDefaultEventPayload<TProps>;
export { defaultComposer as create };
declare function changeComposer<TProps>(this: NohmModel<TProps>, diff: Array<void | IPropertyDiff<keyof TProps>>): IChangeEventPayload<TProps>;
export { changeComposer as update, changeComposer as save };
export declare function remove(this: NohmModel, id: string): any;
declare function relationComposer<TProps, TParentProps>(this: NohmModel<TProps>, parent: NohmModel<TParentProps>, relationName: string): IRelationChangeEventPayload<TProps>;
export { relationComposer as link, relationComposer as unlink };
//# sourceMappingURL=eventComposers.d.ts.map