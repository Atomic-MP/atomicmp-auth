"use strict";

import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import moment from "moment";
import router from "./controllers/routes";
import errorMiddleware from "./middlewares/error-handler";
import jwtMiddleware from "./middlewares/jwt-middleware";
import { logger } from "./services";
moment().format();

class App {
  public app: express.Application;
  public port?: number;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen(port: number) {
    this.port = port;
    this.app.listen(this.port, () => {
      logger.info("Ready on " + this.port);
    });
  }

  private initializeMiddlewares() {
    const corsOptions = {
      allowHeaders: ["Content-Type", "Authorization"],
      optionsSuccessStatus: 200,
      origin: "*",
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(jwtMiddleware);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes() {
    this.app.use(router);
  }
}

export default App;
