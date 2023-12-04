import { Request, Response } from 'express';
import { getMetaData } from './meta';
import { exception } from '../results';

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


// Custom Response 

export function ResponseX() {
    return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = async (req: Request, res: Response) => {
            try {
                const data = await originalMethod(req, res);
                res.send(data);
            } catch (error) {
                console.log(error, 'error');
                res.status(500).send(exception(error));
            }
        };

        return descriptor;
    };
}

export function TryCatch() {
    return function (_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                const result = await originalMethod.apply(this, args);
                return result;
            } catch (error) {
                console.error(`Error in ${propertyKey}:`, error);
                return exception({ location: `Error in ${propertyKey}`, error });
            }
        };

        return descriptor;
    };
}