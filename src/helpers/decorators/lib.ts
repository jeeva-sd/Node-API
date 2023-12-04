import { Request, Response, NextFunction } from 'express';
import { getMetaData } from './meta';
import { exception } from '../results';

// Define a new type for middleware functions
type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

// Define a key for storing middleware in metadata
const MIDDLEWARE_KEY = '__middleware__';

export const Controller = (controller: string): ClassDecorator => {
  return (target: any) => {
    const meta = getMetaData(target.prototype);
    meta.controller = controller;
  };
};

export const MethodDecorator = (method: string, path: string, middleware?: MiddlewareFunction[]): MethodDecorator => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = getMetaData(target);
    meta.routes[methodName] = { method, url: path, middleware };
    return descriptor;
  };
};

export const GET = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('get', path, middleware);
export const POST = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('post', path, middleware);
export const PUT = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('put', path, middleware);
export const DELETE = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('delete', path, middleware);

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