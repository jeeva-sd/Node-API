export interface Route {
    method: string;
    url: string;
    middleware?: any;
    customResponse?: boolean;
}

export interface MetaData {
    controller: string;
    controllerMiddleware: any;
    routes: {
        [key: string]: Route;
    };
}

export interface TargetData {
    meta_data?: MetaData;
}

export const getMetaData = (target: TargetData): MetaData => {
    if (!target.meta_data) {
        target.meta_data = {
            controller: '',
            controllerMiddleware: [],
            routes: {},
        };
    }
    return target.meta_data;
};