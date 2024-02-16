import express, { Response, NextFunction } from 'express';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import { RequestX, attachRouter, notFound, take } from './utils';
import { appControllers } from '~/controllers';
import { appConfig } from '@/config';

export class App {
    public app: express.Express;

    constructor() {
        this.app = express();
        this.middlewareHandler();
        this.routeHandler();
        this.errorHandler();
    }

    private middlewareHandler(): void {

        this.app.all('/*', (req: RequestX, res: Response, next: NextFunction) => {
            const origin: string = req.headers.origin;

            // For CORS
            if (appConfig.app.environment === 'dev') {
                res.header('Access-Control-Allow-Origin', '*');
            }
            else {
                const allowedDomains: string[] = appConfig.general.allowedDomains.split(',');
                if (allowedDomains.includes(origin)) {
                    res.header('Access-Control-Allow-Origin', origin);
                }
                else return res.status(403).send(take(403));
            }

            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers',
                'Content-Type, Accept, X-Key, Set-Cookie');

            // Handle preflight requests
            if (req.method === 'OPTIONS') return res.status(200).end();
            next();
        });

        this.app.use(json({ limit: '50mb' }));
        this.app.use(urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(cookieParser());
    }

    private routeHandler(): void {
        this.app.use((req: RequestX, res: Response, next: NextFunction) => {
            if (req.url === '/') {
                const { environment, name } = appConfig.app;
                const response = take(200, { name, environment });
                return res.send(response);
            }

            // Grouping parameters
            req.parameters = { ...req.query, ...req.body, ...req.params };
            next();
        });

        this.combineRoutes();
    }

    private combineRoutes(): void {
        const appRoutes = attachRouter(appControllers);
        this.app.use('/api/v1', appRoutes);
    }

    private errorHandler(): void {
        // catch 404 and forward to error handler
        this.app.use('*', (req: RequestX, res: Response) => {
            res.status(404).send(notFound(`${req.originalUrl} not found!`));
        });

        // handle unexpected errors
        process.on('uncaughtException', (err: Error) => {
            console.error(err);
        });
    }
}
