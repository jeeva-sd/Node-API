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

export type DbResponse = {
    success: boolean;
    data: any;
    error: any;
  };