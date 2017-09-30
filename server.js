"use strict";

/*
Loading environmental variables from .env file
*/
require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const pug = require("pug");
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
				if (err) return done(err);
				return ((!isValid) ? done(null, false) : done(null, user))
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
	return (
		obj.username 							&&
		obj.password 							&&
		/^[a-zA-Z\ ]*$/.test(obj.username) 		&&
		/^[a-zA-Z0-9_]*$/.test(obj.password)	&&
		obj.username.length >= 3 				&&
		obj.username.length <= 24 				&&
		obj.password.length >= 8
	) ? true : false;
}


app.set('view engine','pug');
app.set('views', path.join(__dirname+"/public/views"));
// app.use(express.static(__dirname+"/public/views"));
app.use(express.static(__dirname+"/public/js"));
app.use(express.static(__dirname+"/public/css"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("cookie-parser")());


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
	var user;
	if (req.isAuthenticated()){
		user = req.user;
	}
	res.render('index.pug',{
		title: "Fommo Auth"
	})
})

// // TODO make me real shit
// app.get('/get/user', authenticationMiddleware, function (req,res){
// 	res.sendJSON("{user:1}")
// })


app.get('/login', function(req,res) {
	res.render("login.pug")
})


app.get('/register', function(req,res) {
	res.render("register.pug")
})

app.post('/login', passport.authenticate('local'), (req, res)=>{
	
	console.log(req.user);
	res.redirect("/")
});


app.post("/register", function (req,res,next) {
	if (!req.body||!req.body.username||!req.body.password) return res.sendStatus(400);
	
	if (isValidSignupCredentials(req.body)){
		var username = req.body.username;
		// Check if username exists; case insensitive
		knex.raw(`SELECT * FROM users WHERE LOWER(username)=LOWER('${req.body.username}')`).then((data)=>{
			let rows = data.rows;
			if (rows.length>0) {
				console.log(`User ${rows[0].username} already exists`)
				res.sendStatus(409)
			} else {
				bcrypt.hash(req.body.password,saltRounds).then(function(hash) {
					// Store this in the DB
					let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
					console.log(ip)
					knex('users').insert({
						username,
						hash,
						role:1,
						faction: null,
						created_at: new Date()
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