import express, { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middlewares';
import { Routes } from './routes';
import { setupRoutes } from '../libs/utils';
export class Server {
  private httpServer: HTTPServer;
  private app: Application;
  private readonly DEFAULT_PORT = 3001;

  constructor(private controllerInstances: any) {
    this.app = express();
    this.httpServer = createServer(this.app);

    this.configureApp();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    setupRoutes(this.app, Routes, this.controllerInstances);
  }

  private configureApp(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(errorHandler);
  }

  public listen(callback: (port: number) => void): void {
    this.httpServer.listen(this.DEFAULT_PORT, () =>
      callback(this.DEFAULT_PORT)
    );
  }
}
