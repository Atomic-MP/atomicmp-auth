"use strict";

import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import moment from "moment";
import router from "./controllers/routes";
import jwtMiddleware from "./middlewares/jwt-middleware";
import { logger } from "./services";
moment().format();

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info("Ready on " + this.port);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(jwtMiddleware);
    this.app.options('*', cors({
        credentials: true,
        origin: true,
        optionsSuccessStatus: 200
      }))
  }

  private initializeRoutes() {
    this.app.use(router);
  }
}

export default App;
