'use strict'

/*
Loading environmental variables from .env file
*/
require('dotenv').config()

const express = require('express')
const favicon = require('express-favicon')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const moment = require('moment')
const passport = require('./middlewares/passport')
const router = require('./controllers/routes')
moment().format()
// const jwt = require("jsonwebtoken");
// const pug = require("pug");
// var SteamStrategy = require("passport-steam");
const session = require('express-session')

app.use(session({ secret: process.env.PASSPORT_SECRET || 'anything',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '../public/views'))
// app.use(express.static(__dirname+"/public/views"));
app.use(express.static(path.join(__dirname, '../public/images'), {
  maxage: '48h'
}))
app.use(express.static(path.join(__dirname, '../public/js'), {
  maxage: '48h'
}))
app.use(express.static(path.join(__dirname, '../public/css'), {
  maxage: '48h'
}))
app.use(express.static(path.join(__dirname, '../public/fonts'), {
  maxage: '48h'
}))
app.use(favicon(path.join(__dirname, '../public/favicon.png')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(require('cookie-parser')())

// const authenticationMiddleware = (req, res, next) => {
//   return req.isAuthenticated()
//     ? next()
//     : res.redirect('/')
// }

app.use(router)

module.exports = app
