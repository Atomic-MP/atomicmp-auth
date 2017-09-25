"use strict";

/*
Loading environmental variables from .env file
*/
require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
var SteamStrategy = require("passport-steam");

/*
MySQL Configuration
*/
var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.MYSQL_Host,
		user: process.env.MYSQL_User,
		password: process.env.MYSQL_Password,
		database: process.env.MYSQL_Database_Name
	}
})

/*
Steam oAuth
*/
passport.use(new SteamStrategy({
		returnURL: `http://localhost:${process.env.PORT}/auth/steam/return`,
		realm: `http://localhost:${process.env.PORT}/`,
		apiKey: process.env.Steam_Key
	},
	function(identifier, profile, done) {
		User.findByOpenID({ openId: identifier }, function (err, user) {
			return done(err, user);
		});
	}
));


const bcrypt = require("bcrypt");
const saltRounds = 10;


app.use(express.static(__dirname+"/public/views"));
app.use(express.static(__dirname+"/public/js"));
app.use(express.static(__dirname+"/public/css"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("cookie-parser")())

//Cookie middleware
app.use(function (req, res, next) {
	if (req.cookies.cookieName === undefined) {
		// no: set a new cookie
		var randomNumber=Math.random().toString();
		randomNumber=randomNumber.substring(2,randomNumber.length);
		res.cookie('cookieName',randomNumber);
		console.log('cookie created successfully');
	}  else {
		// yes, cookie was already present 
		console.log('cookie exists', req.cookies);
	} 
	next();
});


app.get('/', function (req,res){
	console.log(req.cookies)
	res.sendFile("index.html");
})

app.post("/login", function (req,res,next) {
	if (!req.body||!req.body.username||!req.body.password) return res.sendStatus(400);
	knex('users').select().where("username",req.body.username).then((data)=>{
		if (data.length>0) {
			bcrypt.compare( req.body.password, data[0].hash, function(err,bool) {
				if (!err){
					if (req.cookies.id === undefined) {
						// no: set a new cookie
						var randomNumber=Math.random().toString();
						randomNumber=randomNumber.substring(2,randomNumber.length);
						res.cookie('id',randomNumber);
						console.log('cookie created successfully');
					}  else {
						// yes, cookie was already present 
						console.log('cookie exists', req.cookies);
					} 
					res.send(bool);
				} else {
					console.log(err)
				}
			});
		} else {
			res.sendStatus(400)
		}
	})
	
})


app.post("/signup", function (req,res,next) {
	if (!req.body||!req.body.username||!req.body.password) return res.sendStatus(400);
	var username = req.body.username;
	knex('users').select().where("username",req.body.username).then((data)=>{
		console.log(data)
		if (data.length>0) {
			console.log("User already exists")
			res.redirect("/")
		} else {
			bcrypt.hash(req.body.password,saltRounds).then(function(hash) {
				// Store this in the DB
				knex('users').insert({username,hash}).then(()=>{
					res.redirect("/")
				})
			})
		}
	})
})

app.get('/auth/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

app.get('/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// console.log(hash);
// bcrypt.compare(password,hash,function(err,res){
// 	if (!err){
// 		console.log(res);
// 	}
// });
app.listen(PORT, function () {
	console.log("Ready on "+PORT)
})