import { NextFunction, Response } from 'express';
import { RequestX } from 'helpers';

export type MiddlewareFunction = (
    req: RequestX,
    res: Response,
    next: NextFunction
) => Promise<void>;