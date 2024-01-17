import { MetaData, TargetData } from './type';

export function GetMetaData(target: TargetData): MetaData {
    if (!target.meta_data) {
        target.meta_data = {
            controller: '',
            controllerMiddleware: [],
            routes: {},
        };
    }

    return target.meta_data;
}