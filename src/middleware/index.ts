import { NextFunction, Request, Response } from "express";
import { take } from "../helpers";
import * as yup from 'yup';

export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.hasOwnProperty('page')) next();
    else return res.send(take(400, 'No Query Found'));
};

export const validate = (schema: yup.AnyObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.parameters)
            await schema.validate(req.parameters, { abortEarly: false });
            next();
        } catch (error) {
            const response = take(400, error.errors);
            res.status(400).send(response);
        }
    };
};