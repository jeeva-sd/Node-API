import { NextFunction, Response } from "express";
import { RequestX } from "../wrappers";

export interface MetaData {
    controller: string;
    controllerMiddleware: any;
    routes: {
        [key: string]: Route;
    };
}

export interface Route {
    method: string;
    url: string;
    middleware?: any;
    customResponse?: boolean;
}

export interface TargetData {
    meta_data?: MetaData;
}

export type RepoResult = {
    success?: boolean;
    data: any;
    error?: any;
    code?: number;
};

export type MiddlewareFunction = (req: RequestX, res: Response, next: NextFunction) => void;
export type ClassPrototype = Record<string, any>;