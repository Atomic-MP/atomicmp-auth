/*
MySQL Configuration
*/
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || 'localhost'
})

module.exports = knex
