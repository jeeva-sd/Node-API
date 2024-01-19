import { ClassPrototype, MetaData, MiddlewareFunction, TargetData } from './type';

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

export const setRoutes = (method: string, path: string, middleware?: MiddlewareFunction[]): MethodDecorator => {
    return (target: ClassPrototype, methodName: string, descriptor: PropertyDescriptor) => {
      const meta = GetMetaData(target);
      meta.routes[methodName] = { ...meta.routes[methodName], method, url: path, middleware };
      return descriptor;
    };
  };