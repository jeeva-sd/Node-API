import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { clientError } from "../helpers";

export const validateParams = (schema: yup.AnyObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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