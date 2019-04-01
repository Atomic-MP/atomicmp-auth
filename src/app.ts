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
    const whitelist = ["http://localhost:3000", "https://www.atomicmp.com", "https://atomicmp.com"];
    const corsOptions = {
      credentials: true,
      optionsSuccessStatus: 200,
      origin: (origin: any, callback: any) => {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          logger.error(`CORS blocked request from: ${origin}`)
          callback(null, false);
        }
      },
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(jwtMiddleware);
  }

  private initializeRoutes() {
    this.app.use(router);
  }
}

export default App;
