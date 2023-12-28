import { Request, Response, NextFunction } from 'express';
import { getMetaData } from './meta';
import { extractErrorMessage, serverError } from '../results/apiResult';

// Define a type for middleware functions
type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

// Controller decorator
export const controller = (controller: string, middleware?: MiddlewareFunction[]): ClassDecorator => {
  return (target: any) => {
    const meta = getMetaData(target.prototype);
    meta.controller = controller;
    meta.controllerMiddleware = middleware || [];
  };
};

// Method decorator for defining routes
export const MethodDecorator = (method: string, path: string, middleware?: MiddlewareFunction[]): MethodDecorator => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = getMetaData(target);
    meta.routes[methodName] = { ...meta.routes[methodName], method, url: path, middleware };
    return descriptor;
  };
};

// Custom method decorator for indicating custom response handling
export const CustomMethodDecorator = (): MethodDecorator => {
  return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = getMetaData(target);
    meta.routes[methodName] = { ...meta.routes[methodName], customResponse: true };
    return descriptor;
  };
};

// HTTP method decorators for common methods
export const GET = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('get', path, middleware);
export const POST = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('post', path, middleware);
export const PUT = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('put', path, middleware);
export const DELETE = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('delete', path, middleware);

// Custom response decorator for handling responses
export const CUSTOM_RESPONSE = () => CustomMethodDecorator();

// GUARD decorator for error handling in methods
export function exception() {
  return function (_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        console.error(`Error in ${propertyKey}:\n${extractErrorMessage(error)}`);
        return serverError(error);
      }
    };

    return descriptor;
  };
}

// ResponseX decorator for wrapping methods with error handling
export function ResponseX() {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (req: Request, res: Response) => {
      try {
        const data = await originalMethod(req, res);
        res.send(data);
      } catch (error) {
        console.log(error, 'error');
        res.status(500).send(serverError(error));
      }
    };

    return descriptor;
  };
}