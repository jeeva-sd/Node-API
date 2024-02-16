import * as jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { RequestX, take } from '@/utils';
import { appConfig } from '@/config';
import { TokenData } from '~/entities';

export const basicAuth = async (
    req: RequestX,
    res: Response,
    next: NextFunction
): Promise<RequestX | Response> => {
    try {
        const token = 'x-key' in req.cookies ? req.cookies['x-key'] as string : null;
        if (!token) return res.status(401).send(take(401));

        const decodedToken = jwt.verify(token, appConfig.jwt.accessSecretKey) as TokenData;
        req.parameters = {
            ...req.parameters,
            req_user: {
                userId: decodedToken.userId,
                roleId: decodedToken.roleId,
                branchId: decodedToken.branchId,
                orgId: decodedToken.orgId
            }
        };

        next();
    } catch (error) {
        res.status(401).send(take(401));
    }
};

export const adminAuth = async (
    req: RequestX,
    res: Response,
    next: NextFunction
): Promise<Response | unknown> => {
    try {
        const token = 'x-key' in req.cookies ? req.cookies['x-key'] as string : null;
        if (!token) return res.status(401).send(take(401));

        const decodedToken = jwt.verify(token, appConfig.jwt.accessSecretKey) as TokenData;

        if ([1, 2].includes(decodedToken.roleId)) return next();
        return res.status(403).send(take(403));
    } catch (error) {
        res.status(401).send(take(401));
    }
};