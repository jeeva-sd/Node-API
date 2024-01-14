import express, { Response } from 'express';
import { Route, GetMetaData, ApiResult, serverError, RequestX } from '..';

const attachRouter = (appRoutes: any[]) => {
    return appRoutes.map((Controller) => {
        const router: any = express.Router();
        const controllerInstance: any = new Controller();
        const metaData = GetMetaData(controllerInstance);

        const { controllerMiddleware = [], controller: controllerPath, routes } = metaData;

        // Apply route-level middleware
        if (controllerMiddleware.length > 0) router.use(...controllerMiddleware);

        Object.keys(routes).forEach((methodName: string) => {
            const route: Route = routes[methodName];
            const { method: routeMethod, middleware: routeMiddleware = [] } = route;

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
                        .then((data: ApiResult) => {
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