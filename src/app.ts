import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import path from "path";
import { take } from "./helpers";
import { appConfig } from "./config";
import { applicationRoutes } from "./routes";

export class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.middlewareHandler();
    this.routeHandler();
    this.errorHandler();
  }

  private middlewareHandler(): void {
    this.app.all("/*", (req: Request, res: Response, next: NextFunction) => {
      // For CORS
      // const origin: string = req.headers.origin;
      // const allowedDomains: string[] = appConfig.general.ALLOWED_DOMAINS.split(',');
      // if (allowedDomains.includes(origin)) res.header("Access-Control-Allow-Origin", origin);
      // else return res.status(403).send(take(403));

      res.header("Access-Control-Allow-Origin", '*');
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Access-Token, Authorization, X-Key");

      // Handle preflight requests
      if (req.method === "OPTIONS") {
        return res.status(200).end();
      }

      next();
    });

    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ limit: "50mb", extended: true }));
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  private routeHandler(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.url === "/") {
        res.send(take(200, {
          env: appConfig.app.NODE_ENV,
          name: appConfig.app.APP_NAME,
        }));
      }
      else next();
    });

    this.combineRoutes();
  }

  private combineRoutes() {
    this.app.use('/api', applicationRoutes);
  }


  private errorHandler(): void {
    // catch 404 and forward to error handler
    this.app.use('*', (req: Request, res: Response) => {
      const notFoundResponse = take(404, `${req.originalUrl} not found!`);
      res.status(404).send(notFoundResponse);
    });

    // handle unexpected errors
    process.on("uncaughtException", (err: any) => {
      console.info(err);
    });
  }
}
