import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { clientError } from "../helpers/results/apiResult";

export const validate = (schema: yup.AnyObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = { ...req.parameters, ...req.params };
            const validatedParams = await schema.validate(params, { abortEarly: false });
            req.parameters = validatedParams;
            next();
        } catch (error) {
            const response = clientError(error.errors);
            res.status(400).send(response);
        }
    };
};