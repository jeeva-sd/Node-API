import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { take } from "../helpers";

export const validate = (schema: yup.AnyObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = { ...req.parameters, ...req.params };
            const validatedParams = await schema.validate(params, { abortEarly: false });
            req.parameters = validatedParams;
            next();
        } catch (error) {
            const response = take(400, error.errors);
            res.status(400).send(response);
        }
    };
};