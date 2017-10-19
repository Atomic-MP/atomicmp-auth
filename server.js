"use strict";

/*
Loading environmental variables from .env file
*/
require("dotenv").config();
const PORT = process.env.PORT;

const express = require("express");
const favicon = require('express-favicon');
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

app.use(session({ secret: 'anything',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
	(username, password, done) =>
		knex('users').select().where("username",username).then((rows)=>
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
	knex('users').select().where("user_id",id)
	.then((data)=>{
		let user = data[0];
		//log.debug("deserializeUser ", user);
		done(null, user);
	})
	.catch((err)=>{
		done(new Error(`User with the id ${id} does not exist`));
	})
});
/*
Global data.
*/
const brand = "Atomic MP"
const slogan = "A Multiplayer Fallout Roleplay Experience"

/*
Model for valid signup credentials.
*/
function isValidSignupCredentials(obj) {
	return (
		obj.username 									&&
		obj.password 									&&
		obj.confirmPassword 							&&
		obj.key 										&&
		(obj.username.replace(/ /g,'').length >= 3) 	&&
		(!obj.username.startsWith(" ")) 				&&
		/^[a-zA-Z\ ]*$/.test(obj.username) 				&&
		/^[a-zA-Z0-9_!%]*$/.test(obj.password) 			&&
		obj.username.length >= 3 						&&
		obj.username.length <= 24 						&&
		obj.password.length >= 8 						&&
		obj.password ==obj.confirmPassword
	) ? true : false;
}


app.set('view engine','pug');
app.set('views', path.join(__dirname+"/public/views"));
// app.use(express.static(__dirname+"/public/views"));
app.use(express.static(__dirname+"/public/images", {
  maxage: '48h'
}));
app.use(express.static(__dirname+"/public/js", {
  maxage: '48h'
}));
app.use(express.static(__dirname+"/public/css", {
  maxage: '48h'
}));
app.use(express.static(__dirname+"/public/fonts", {
  maxage: '48h'
}));
app.use(favicon(__dirname + '/public/favicon.png'));
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
		title: brand + " - " + slogan,
		user:user
	})
})


app.route('/login')
.get(function(req,res) {
	var user;
	if (req.isAuthenticated()){
		user = req.user;
	}
	res.render('login.pug',{
		title: brand + " - " + slogan,
		user:user
	})
})
.post(passport.authenticate('local'), (req, res)=>{
	res.sendStatus(200);
});


app.route('/register')
.get(function(req,res) {
	var user;
	if (req.isAuthenticated()){
		user = req.user;
	}
	res.render('register.pug',{
		title: brand + " - " + slogan,
		user:user
	})
})
.post(function (req,res,next) {
	if (!req.body||!req.body.username||!req.body.password) return res.sendStatus(400);
	req.body.username = req.body.username.trim();
	if (isValidSignupCredentials(req.body)){
		var username = req.body.username;
		// Check if username exists; case insensitive
		knex.raw(`SELECT * FROM users WHERE LOWER(username)=LOWER('${req.body.username}')`).then((data)=>{
			let rows = data.rows;
			if (rows.length>0) {
				console.log(`User ${rows[0].username} already exists`)
				res.sendStatus(409)
			} else {
				knex('keys').select('key_id')
				.where('key',req.body.key)
				.andWhere('owner',null)
				.then((data)=> {
					if (data.length > 0) {
						var keyID = data[0].key_id;
						bcrypt.hash(req.body.password,saltRounds).then(function(hash) {
							// Store this in the DB
							let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
							knex('users')
							.returning('user_id')
							.insert({
								username,
								hash,
								role:3,
								faction: null,
								created_at: new Date()
							})
							.then((returning)=>{
								knex('keys')
								.where('key_id',keyID)
								.update('owner', returning[0])
								.then(()=>{
									res.redirect("/");
								})
							})
							.catch(err=> {
								console.log(err);
							})
						})
					} else {
						res.sendStatus(409);
					}
				})
			}
		})
	} else {
		console.log("Nah");
		res.sendStatus(400);
		res.end();
	}
});


app.get('/user/:id', function(req,res) {

	if (req.isAuthenticated()){
		var user = req.user;
		var targetUserID = req.params.id;
		knex("users")
		.join('roles', 'users.role', '=', 'roles.role_id')
		.select('user_id','username','role_name', 'faction', 'created_at')
		.where('user_id',targetUserID)
		.then((data)=> {
			console.log(data);
			var targetUser;
			if (data.length > 0) {
				targetUser = data[0];
			}

			res.render('users.pug',{
				title: brand + " - " + slogan,
				user:user,
				targetUser
			})
		}).catch((err)=> console.log(err))
	} else {
		res.redirect("/");
	}
})


app.get('/logout', function(req,res) {
	req.session.destroy()
	req.logout()
	res.redirect('/')
})


app.get("/keygen", function (req, res) {
	if (req.isAuthenticated() && req.user.role === 5) {
		var randomString = function (len, bits) {
			bits = bits || 36;
			var outStr = "", newStr;
			while (outStr.length < len) {
				newStr = Math.random().toString(bits).slice(2);
				outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
			}
			return outStr.toUpperCase();
		};


		function createKey (){
			return ("AMP-"+randomString(4,16)+"-"+randomString(4,16)+"-"+randomString(4,16)+"-"+randomString(4,16));
		}

		(function addKey(key){
			knex("keys").where('key',key).then(data=> {
				if (data.length === 0) {
					knex('keys').insert({
						key,
						created_by: req.user.id,
					}).then( res.send(key) );
				} else{
					// Key already exists! Recursively try again.
					addKey(createKey());
				}
			})
		})(createKey())
	} else {
		res.redirect("/")
	}
})

app.get('/download',function(req,res) {
	if (req.isAuthenticated()){
		res.redirect("http://www.mediafire.com/file/8x1l3pl4bp6agpl/WindowsNoEditor.zip");
	}
})

app.use(function(req,res) {
	res.redirect("/");
});
app.listen(PORT, function () {
	console.log("Ready on "+PORT)
})
