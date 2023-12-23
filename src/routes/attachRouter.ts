import express, { Request, Response } from "express";
import { Route, getMetaData } from "../helpers/decorators";
import { ApiResult } from "../helpers/results/types";
import { exception } from "../helpers";

const attachRouter = (appRoutes: any[]) => {
    return appRoutes.map((Controller) => {
        const router: any = express.Router();
        const controllerInstance: any = new Controller();
        const metaData = getMetaData(controllerInstance);

        const controllerMiddleware = metaData.controllerMiddleware || [];
        const controllerPath = metaData.controller;
        const routes = metaData.routes;

        // Apply route-level middleware
        if (controllerMiddleware?.length > 0) router.use(...controllerMiddleware);

        Object.keys(routes).forEach((methodName: string) => {
            const route: Route = routes[methodName];
            const routeMethod = route.method;
            const routeMiddleware = route?.middleware || [];

            // Use router[routeMethod] instead of router.use
            router[routeMethod](controllerPath + route.url, ...routeMiddleware, async (req: Request, res: Response) => {
                try {
                    const response = controllerInstance[methodName](req, res);

                    if (route.hasOwnProperty('customResponse')) return null;
                    if (!(response instanceof Promise)) return res.send(response);

                    response.then((data: ApiResult) => {
                        if (data.code === 400) return res.status(400).send(data);
                        return res.send(data);
                    });
                } catch (error) {
                    res.status(500).send(exception(error));
                }
            });
        });

        return router;
    });
};

export { attachRouter };