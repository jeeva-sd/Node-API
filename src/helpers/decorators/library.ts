import { Response, NextFunction } from 'express';
import { RequestX, extractErrorMessage, serverError } from '../results';
import { DbResponse, MetaData, TargetData } from './type';

// Define a type for middleware functions
type MiddlewareFunction = (req: RequestX, res: Response, next: NextFunction) => void;
type ClassPrototype = Record<string, any>;

// Controller decorator
export const Controller = (controller: string, middleware?: MiddlewareFunction[]): ClassDecorator => {
  return (target: ClassPrototype) => {
    const meta = GetMetaData(target.prototype);
    meta.controller = controller;
    meta.controllerMiddleware = middleware || [];
  };
};

// Method decorator for defining routes
export const MethodDecorator = (method: string, path: string, middleware?: MiddlewareFunction[]): MethodDecorator => {
  return (target: ClassPrototype, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = GetMetaData(target);
    meta.routes[methodName] = { ...meta.routes[methodName], method, url: path, middleware };
    return descriptor;
  };
};

// Custom method decorator for indicating custom response handling
export const CustomMethodDecorator = (): MethodDecorator => {
  return (target: ClassPrototype, methodName: string, descriptor: PropertyDescriptor) => {
    const meta = GetMetaData(target);
    meta.routes[methodName] = { ...meta.routes[methodName], customResponse: true };
    return descriptor;
  };
};

// HTTP method decorators for common methods
// eslint-disable-next-line 
export const GET = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('get', path, middleware);
export const POST = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('post', path, middleware);
export const PUT = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('put', path, middleware);
export const DELETE = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('delete', path, middleware);

// Custom response decorator for handling responses
export const CUSTOM_RESPONSE = () => CustomMethodDecorator();

// GUARD decorator for error handling in methods
export function Exception() {
  return function (_target: ClassPrototype, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: ClassPrototype[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        console.error(`\nError in core at "${propertyKey}":\n${extractErrorMessage(error)}`);
        return serverError(error);
      }
    };

    return descriptor;
  };
}

export function DbException() {
  return (_target: ClassPrototype, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: ClassPrototype[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return { success: true, data: result, error: null } as DbResponse;
      } catch (err) {
        const error = extractErrorMessage(err);
        console.error(`\nError in repository at "${propertyKey}":\n${extractErrorMessage(error)}`);
        return { success: false, data: null, error } as DbResponse;
      }
    };

    return descriptor;
  };
}

// ResponseX decorator for wrapping methods with error handling
export function ResponseX() {
  return (_target: ClassPrototype, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (req: RequestX, res: Response) => {
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