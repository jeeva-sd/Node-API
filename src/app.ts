import express, { Request, Response, NextFunction, Router } from "express";
import path from "path";
import { json, urlencoded } from "body-parser";

// import { combineRouters } from "./routes";
import { appConfig } from "./config";
import { take } from "./helpers";
import { combineRouter } from "./routes";
import { Route, getMetaData } from "./helpers/decorators";
import { ApiResult } from "./helpers/results/types";

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.middlewareHandler();
    this.routesHandler();
    this.errorHandler();
  }

  private middlewareHandler(): void {
    this.app.all("/*", (req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,X-Access-Token,Authorization,X-Key"
      );

      if (req.method == "OPTIONS") res.status(200).end();
      else next();
    });

    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ limit: "50mb", extended: true }));
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  private routesHandler(): void {
    this.app.use((req: Request, res: express.Response, next: NextFunction) => {
      if (req.url === "/") {
        const appInfo = {
          env: appConfig.app.NODE_ENV,
          name: appConfig.app.APP_NAME,
        };

        res.send(take(200, appInfo));
      }
      else next();
    });

    this.combineRouterss();
  }

  private combineRouterss() {
    combineRouter.forEach((instance: any) => {
      const controllerInstance: any = new instance();
      const metaData = getMetaData(controllerInstance);
      const controllerPath = metaData.controller;
      const routes = metaData.routes;

      Object.keys(routes).forEach((methodName: string) => {
        const router: any = Router();
        const route: Route = routes[methodName];
        const routeMethod = route.method;

        // Check if middleware is defined for this route
        const middleware = route.middleware || [];

        // Apply middleware to the route
        router[routeMethod](route.url, ...middleware, async (req: Request, res: Response) => {
          const response = controllerInstance[methodName](req, res);

          if (response instanceof Promise) return response.then((data: ApiResult) => res.send(data));
          else res.send(response);
        });

        this.app.use(controllerPath, router);
      });
    });
  }

  private errorHandler(): void {
    this.app.use(
      (err: Error, _req: Request, res: Response, _next: NextFunction) => {
        res.send(err);
      }
    );

    // catch 404 and forward to error handler
    // this.app.use((_: Request, res: Response) => {
    //   res.apiNotFound();
    // });

    // handle unexpected errors
    process.on("uncaughtException", (err: any) => {
      console.log(err);
    });
  }
}
