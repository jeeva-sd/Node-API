import Http from './axiosInstance';
import { HttpInstance } from './types';

// Configs
const jsonPlaceholderConfig: HttpInstance = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeOut: 20000
};

// Instances
const jsonHttp = new Http(jsonPlaceholderConfig);

export { jsonHttp };