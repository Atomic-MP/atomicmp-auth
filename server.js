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
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
// var SteamStrategy = require("passport-steam");

/*
MySQL Configuration
*/
const knex = require('knex')({
	client: 'pg',
	connection: process.env.DATABASE_URL+"?ssl=true"
})
const bcrypt = require("bcrypt");
const saltRounds = 10;


app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	(username, password, done) => {
		knex('users').select().where("username",username).then((rows)=>{
			console.log(rows[0])
			// if (err) {
			// 	return done(err)
			// }
			var user = rows[0];
			// User not found
			if (!user) {
				return done(null, false)
			}

			// Always use hashed passwords and fixed time comparison
			bcrypt.compare(password, user.hash.toString('utf-8'), (err, isValid) => {
				if (err) {
					return done(err)
				}
				if (!isValid) {
					return done(null, false)
				}
				return done(null, user)
			})
		})
	}
))

passport.serializeUser((user, done)=>{
    console.log("serialize ", user);
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done)=>{
    console.log("deserualize ", id);
    db.one("SELECT user_id, user_name, user_email, user_role FROM users " +
            "WHERE user_id = $1", [id])
    .then((user)=>{
      //log.debug("deserializeUser ", user);
      done(null, user);
    })
    .catch((err)=>{
      done(new Error(`User with the id ${id} does not exist`));
    })
  });



/*
Model for valid signup credentials.
*/
function isValidSignupCredentials(obj) {
	console.log(obj);
	return (
		obj.username 							&&
		obj.password 							&&
		/^[a-zA-Z\ ]*$/.test(obj.username) 		&&
		/^[a-zA-Z0-9_]*$/.test(obj.password)	&&
		obj.username.length > 3 				&&
		obj.username.length < 24 				&&
		obj.password.length >= 8
	) ? true : false;
}



app.use(express.static(__dirname+"/public/views"));
app.use(express.static(__dirname+"/public/js"));
app.use(express.static(__dirname+"/public/css"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("cookie-parser")())

// //Cookie middleware
// app.use(function (req, res, next) {
// 	if (!req.cookies.userid) {
// 		// no: set a new cookie
// 		console.log('cookie not found');
// 	}  else {
// 		// yes, cookie was already present 
// 		console.log('cookie exists', req.cookies);
// 	} 
// 	next();
// });

function authenticationMiddleware () {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			console.log("Yes")
			return next()
		}
		res.redirect('/')
	}
}


app.get('/', function (req,res){
	console.log(req.cookies)
	res.sendFile("index.html");
})

// TODO make me real shit
app.get('/get/user', authenticationMiddleware, function (req,res){
	res.sendJSON("{user:1}")
})


app.post('/login', passport.authenticate('local'), (req, resp)=>{
  console.log(req.user);
  resp.send(req.user);
});

// app.post("/login", function (req,res,next) {
// 	if (!req.body||!req.body.username||!req.body.password) return res.sendStatus(400);
// 	knex('users').select().where("username",req.body.username).then((rows)=>{
// 		// Username found in DB: Attempting to process...
// 		if (rows.length>0) {

// 			let entry = rows[0];
// 			let hash = entry.hash.toString('utf-8');
// 			bcrypt.compare( req.body.password, hash, function(err,bool) {
// 				if (!err){
// 					// Was bcrypt compare successful?
// 					if (bool){
// 						// no: set a new cookie
// 						if (req.cookies.userid === undefined) {
// 							var randomNumber=Math.random().toString();
// 							randomNumber=randomNumber.substring(2,randomNumber.length);
// 							res.cookie('userid',randomNumber);
// 							console.log('cookie created successfully');
// 						}  else {
// 							// yes, cookie was already present 
// 							console.log('cookie exists', req.cookies);
// 						}
// 						res.sendStatus(200);
// 					}  
// 					else {
// 						res.sendStatus(400);
// 					}
// 				} else {
// 					console.log("Error Logging in:",err)
// 				}
// 			});
// 		} 
// 		// Username not found in DB: Send Vague Fail Message.
// 		else {
// 			res.sendStatus(400)
// 		}
// 	})
	
// })


app.post("/register", function (req,res,next) {
	if (!req.body||!req.body.username||!req.body.password) return res.sendStatus(400);
	
	if (isValidSignupCredentials(req.body)){
		console.log("Valid signup")
		var username = req.body.username;
		knex('users').select().where("username",req.body.username).then((rows)=>{
			if (rows.length>0) {
				console.log(`User ${username} already exists`)
				res.sendStatus(409)
			} else {
				bcrypt.hash(req.body.password,saltRounds).then(function(hash) {
					// Store this in the DB
					knex('users').insert({
						username,
						hash,
						role:0,
						faction:0
					}).then(()=>{
						res.redirect("/")
					}).catch(err=> {
						console.log(err)
					})
				})
			}
		})
	} else {
		console.log("Nah")
		res.sendStatus(400)
		res.end();
	}
})


app.get('/auth/steam',
	passport.authenticate('steam'),
	function(req, res) {
		// The request will be redirected to Steam for authentication, so
		// this function will not be called.
	}
);


app.get('/auth/steam/return',
	passport.authenticate('steam', { failureRedirect: '/login' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
	}
);



app.use(function(req,res) { 
    res.sendStatus('404');
});
app.listen(PORT, function () {
	console.log("Ready on "+PORT)
})