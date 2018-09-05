'use strict';

require('dotenv').config();

const express = require('express');
const favicon = require('express-favicon');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment');
const router = require('./controllers/routes');
const jwtAuthentication = require('./middlewares/jwt-authentication')
moment().format();

function jwtMiddleware(req, res, next) {
  jwtAuthentication.authenticate('jwt', (err, user, info) => {
    if (!res.locals) res.locals = {}
    if (err) {
      res.sendStatus(503)
    }
    req.user = user

    next()
  })(req, res)
}



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../public/views'));
app.use(
  express.static(path.join(__dirname, '../public/images'), {
    maxage: '48h',
  })
);
app.use(
  express.static(path.join(__dirname, '../public/js'), {
    maxage: '48h',
  })
);
app.use(
  express.static(path.join(__dirname, '../public/css'), {
    maxage: '48h',
  })
);
app.use(
  express.static(path.join(__dirname, '../public/fonts'), {
    maxage: '48h',
  })
);
app.use(favicon(path.join(__dirname, '../public/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')());
app.use(jwtMiddleware)
app.use(router);

module.exports = app;
