import { NextFunction, Response } from 'express';
import * as yup from 'yup';
import { RequestX, clientError } from 'utils';
import { MiddlewareFunction } from './type';

export const validateParams = (schema: yup.AnyObjectSchema): MiddlewareFunction => {
    return async (req: RequestX, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = { ...req.parameters, ...req.params, ...req.query };
            const validatedParams = await schema.validate(params, { abortEarly: false });
            req.parameters = validatedParams;
            next();
        } catch (error) {
            const response = clientError(error.errors);
            res.status(400).send(response);
        }
    };
};