import { Request, Response } from 'express';
import { buildApiResult, dataFound, exception } from '../results/apiResult';

export function ResponseX() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async (req: Request, res: Response) => {
      try {
        const data = await originalMethod(req, res);
        res.send(data);

        console.log(data);

      } catch (error) {
        console.log(error, 'error');
        res.status(500).send(exception(error));
      }
    };

    return descriptor;
  };
}



export * from './meta';
export { Controller, GET } from './lib';
