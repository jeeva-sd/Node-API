import axiosService from './axiosService';
import { HttpInstance } from './types';

// Configs
const jsonPlaceholderConfig: HttpInstance = {
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeOut: 20000
};

// Instances
const jsonHttp = axiosService.getInstance(jsonPlaceholderConfig);

export { jsonHttp };