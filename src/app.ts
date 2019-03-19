"use strict";

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as favicon from "express-favicon";
import * as moment from "moment";
import * as path from "path";
import * as jwtMiddleware from "./middlewares/jwt-middleware";
const router = require("./controllers/routes");
const app = express();
moment().format();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../public/views"));
app.use(
  express.static(path.join(__dirname, "../public/images"), {
    maxage: "48h",
  }),
);
app.use(
  express.static(path.join(__dirname, "../public/js"), {
    maxage: "48h",
  }),
);
app.use(
  express.static(path.join(__dirname, "../public/css"), {
    maxage: "48h",
  }),
);
app.use(
  express.static(path.join(__dirname, "../public/fonts"), {
    maxage: "48h",
  }),
);
app.use(favicon(path.join(__dirname, "../public/favicon.png")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwtMiddleware);
app.use(router);

export default app;
