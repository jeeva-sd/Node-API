import { getMetaData } from './meta';

export const Controller = (controller: string): ClassDecorator => {
    return (target: any) => {
        const meta = getMetaData(target.prototype);
        meta.controller = controller;
    };
};

export const MethodDecorator = (method: string, path: string): MethodDecorator => {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const meta = getMetaData(target);
        meta.routes[methodName] = { method, url: path };
        return descriptor;
    };
};

export const GET = (path: string) => MethodDecorator('get', path);
export const POST = (path: string) => MethodDecorator('post', path);
export const PUT = (path: string) => MethodDecorator('put', path);
export const DELETE = (path: string) => MethodDecorator('delete', path);