import { GetMetaData } from './prototype';
import { serverError } from '../wrappers';
import { extractErrorMessage } from '../common';
import { ClassPrototype, RepoResult, MiddlewareFunction } from './type';

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
export const Get = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('get', path, middleware);
export const Post = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('post', path, middleware);
export const Put = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('put', path, middleware);
export const Delete = (path: string, middleware?: MiddlewareFunction[]) => MethodDecorator('delete', path, middleware);

// Custom response decorator for handling responses
export const CUSTOM_RESPONSE = () => CustomMethodDecorator();

// GUARD decorator for error handling in methods
export function CoreGuard(_target: ClassPrototype, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: ClassPrototype[]) {
    try {
      const result = await originalMethod.apply(this, args);
      return result;
    } catch (err) {
      const error = extractErrorMessage(err);
      console.error(`\nError in core at "${propertyKey}":\n${error}`);
      return serverError(error);
    }
  };

  return descriptor;
};

export function RepoGuard(_target: ClassPrototype, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: ClassPrototype[]) {
    try {
      const result = await originalMethod.apply(this, args);
      const code = result?.code;
      const data = result?.data;
      return { success: code ? false : true, data, error: null, code } as RepoResult;
    } catch (err) {
      const error = extractErrorMessage(err);
      console.error(`\nError in repository at "${propertyKey}":\n${error}`);
      return { success: false, data: null, error } as RepoResult;
    }
  };

  return descriptor;
};