import http from 'http';
import express from 'express';
import { App } from './app';
import { appConfig } from './config';

class Server {
    private app: express.Express;
    private server: http.Server;
    private port: string | number;

    constructor() {
        this.app = new App().app;
        this.port = appConfig.app.port;
        this.onListening = this.onListening.bind(this);
        this.onError = this.onError.bind(this);
    }

    public run(): void {
        this.app.set('port', this.port);

        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);

        // Graceful shutdown on process termination
        process.on('SIGTERM', () => this.shutdown());
        process.on('SIGINT', () => this.shutdown());
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        const bind = typeof this.port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            console.error('Unhandled server error:', error);
            process.exit(1);
            break;
        }
    }

    private onListening(): void {
        const addr = this.server.address();
        const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + this.port;
        console.info('Listening on ' + bind);
    }

    private shutdown(): void {
        console.info('Received termination signal. Closing server...');
        this.server.close((err) => {
            if (err) {
                console.error('Error during server shutdown:', err);
                process.exit(1);
            } else {
                console.info('Server closed. Exiting process.');
                process.exit(0);
            }
        });
    }
}

// Run HTTP server
new Server().run();
