import express, { Response } from 'express';
import { GetMetaData, CustomRoute } from '../decorators';
import { serverError } from './apiResults';
import { RequestX, ResponseX } from './types';
import { validateParams } from '~/middlewares';

const attachRouter = (appRoutes: any[]) => {
    return appRoutes.map((Controller) => {
        const router: any = express.Router();
        const controllerInstance: any = new Controller();
        const metaData = GetMetaData(controllerInstance);

        const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

        // Apply route-level middleware
        if (controllerMiddleware.length > 0) router.use(...controllerMiddleware);

        Object.keys(routes).forEach((methodName: string) => {
            const route: CustomRoute = routes[methodName];
            const paramValidationMiddleware = route?.sanitizeSchema ? [validateParams(route?.sanitizeSchema)] : [];
            const { method: routeMethod, middleware: routeMiddleware = [...paramValidationMiddleware] } = route;

            // Use router.route() for route chaining
            router.route(controllerPath + route.url)
            [routeMethod](...routeMiddleware, (req: RequestX, res: Response) => {
                try {
                    const response = controllerInstance[methodName](req, res);

                    if (Object.prototype.hasOwnProperty.call(route, 'customResponse')) {
                        return null;
                    }
                    if (!(response instanceof Promise)) return res.send(response);

                    response
                        .then((data: ResponseX) => {
                            if (data.status !== 'success') return res.status(400).send(data);
                            return res.send(data);
                        })
                        .catch((error: any) => {
                            res.status(500).send(serverError(error));
                        });
                } catch (error) {
                    res.status(500).send(serverError(error));
                }
            });
        });

        return router;
    });
};

export { attachRouter };