export interface HttpInstance {
    baseURL: string;
    timeOut: number;
}

export interface RequestParams {
    url: string;
    data?: any;
    config?: any;
}