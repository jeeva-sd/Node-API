import http from "http";
import express from "express";
import { App } from "./app";
import { appConfig } from "./config";

class Server {
  private app: express.Express;
  private server: http.Server;
  private port: any;

  constructor() {
    this.onListening = this.onListening.bind(this);
    this.onError = this.onError.bind(this);
  }

  public run(): void {
    this.app = new App().app;
    this.port = appConfig.app.PORT;
    this.app.set("port", this.port);

    this.server = http.createServer(this.app);
    this.server.listen(this.port);
    this.server.on("error", this.onError);
    this.server.on("listening", this.onListening);
  }

  private onError(error: any): void {
    if (error.syscall !== "listen") throw error;
    const bind = typeof this.port === "string" ? "Pipe " + this.port : "Port " + this.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private onListening(): void {
    const addr = this.server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + this.port;
    console.info("Listening on " + bind);
  }
}

// Run HTTP server
new Server().run();
