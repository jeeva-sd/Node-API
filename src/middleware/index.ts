import { NextFunction, Request, Response } from "express";

export const exampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.hasOwnProperty('page')) next();
    else return res.send('No Query Found');
};