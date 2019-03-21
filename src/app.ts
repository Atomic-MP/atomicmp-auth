"use strict";

import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import * as favicon from "express-favicon";
import moment from "moment";
import * as path from "path";
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
    this.initializeViewEngine();
    this.initializeStaticRoutes();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info("Ready on " + this.port);
    });
  }

  private initializeViewEngine() {
    this.app.set("view engine", "pug");
    this.app.set("views", path.join(__dirname, "../public/views"));
  }

  private initializeStaticRoutes() {
    this.app.use(
      express.static(path.join(__dirname, "../public/images"), {
        maxAge: "48h",
      }),
    );
    this.app.use(
      express.static(path.join(__dirname, "../public/js"), {
        maxAge: "48h",
      }),
    );
    this.app.use(
      express.static(path.join(__dirname, "../public/css"), {
        maxAge: "48h",
      }),
    );
    this.app.use(
      express.static(path.join(__dirname, "../public/fonts"), {
        maxAge: "48h",
      }),
    );
    this.app.use(favicon(path.join(__dirname, "../public/favicon.png")));
  }

  private initializeMiddlewares() {
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
