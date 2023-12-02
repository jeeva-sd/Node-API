import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { json, urlencoded } from "body-parser";

// import { combineRouters } from "./routes";
import { appConfig } from "./config";
import { take } from "./helpers";

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.middlewareHandler();
    this.routesHandler();
    this.errorHandler();
  }

  private middlewareHandler(): void {
    this.app.all(
      "/*",
      (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Methods",
          "GET,PUT,POST,DELETE,OPTIONS"
        );
        res.header(
          "Access-Control-Allow-Headers",
          "Content-type,Accept,X-Access-Token,Authorization,X-Key"
        );
        if (req.method == "OPTIONS") {
          res.status(200).end();
        } else {
          next();
        }
      }
    );
    // this.app.use(apiMiddleware({ version: appConfig.app.version, messages }));
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

    // combineRouters(this.app);
  }

  private errorHandler(): void {
    // this.app.use(
    //   (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    //     res.serverError(err);
    //   }
    // );

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
