require('dotenv').config();
const db = require('../services/database');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');
const readline = require('readline');

var username;
const usernameIn = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Please input user name: ',
});

usernameIn.prompt();

usernameIn
  .on('line', line => {
    username = line.trim();
    usernameIn.close();
  })
  .on('close', () => {
    var password;
    const passwordIn = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Please input user password: ',
    });
    passwordIn.prompt();
    passwordIn
      .on('line', line => {
        password = line.trim();
        passwordIn.close();
      })
      .on('close', () => {
        // Check if username exists; case insensitive
        db.raw(`SELECT * FROM users WHERE LOWER(username)=LOWER('${username}')`)
          .then(data => {
            let rows = data.rows;
            if (rows.length > 0)
              throw new Error(`User ${rows[0].username} already exists`);
            bcrypt.hash(password, SALT_ROUNDS).then(hash => {
              // Store this in the DB
              // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
              db('users')
                .returning('user_id')
                .insert({
                  username,
                  hash,
                  role: 5,
                  faction: null,
                  created_at: new Date(),
                })
                .then(data => {
                  console.log('User added successfully!');
                  process.exit(0);
                })
                .catch(err => {
                  console.log(err);
                  process.exit(1);
                });
            });
          })
          .catch(err => {
            console.log(err);
            process.exit(1);
          });
      });
  });
