import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import path from "path";
import { notFound, take } from "./helpers";
import { appConfig } from "./config";
import { applicationRoutes } from "./routes";

declare global {
  namespace Express {
    interface Request {
      parameters?: Record<string, any>;
    }
  }
}

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
      if (req.method === "OPTIONS") return res.status(200).end();
      next();
    });

    this.app.use(json({ limit: "50mb" }));
    this.app.use(urlencoded({ limit: "50mb", extended: true }));
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  private routeHandler(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.url === "/") {
        const { NODE_ENV, APP_NAME } = appConfig.app;
        const response = take(200, { name: APP_NAME, env: NODE_ENV });
        return res.send(response);
      }

      // Grouping parameters
      req.parameters = { ...req.query, ...req.body, ...req.params };
      next();
    });

    this.combineRoutes();
  }

  private combineRoutes(): void {
    this.app.use('/api', applicationRoutes);
  }

  private errorHandler(): void {
    // catch 404 and forward to error handler
    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).send(notFound(`${req.originalUrl} not found!`));
    });

    // handle unexpected errors
    process.on("uncaughtException", (err: Error) => {
      console.error(err);
    });
  }
}
