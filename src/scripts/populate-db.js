const db = require('../utils/database.js')

db.schema.hasTable('roles').then(exists => {
  if (!exists) {
    db.schema.createTable('roles', t => {
      t.increments('role_id')
        .primary()
      t.string('role_name', 20)
        .notNullable()
    })
  }
})
db.schema.hasTable('factions').then(exists => {
  if (!exists) {
    db.schema.createTable('factions', t => {
      t.increments('faction_id')
        .primary()
      t.string('faction_name', 30)
        .notNullable()
    })
  }
})
db.schema.hasTable('users').then(exists => {
  if (!exists) {
    db.schema.createTable('users', t => {
      t.increments('user_id')
        .primary()
      t.string('username', 24)
        .notNullable()
      t.binary('hash')
        .notNullable()
      t.integer('role')
        .unsigned()
        .notNullable()
      t.integer('faction')
        .unsigned()
      t.timestamp('created_at')
        .defaultTo(db.fn.now())
      t.timestamp('last_seen')
        .defaultTo(db.fn.now())

      t.foreign('role')
        .references('role_id').inTable('roles')
      t.foreign('faction')
        .references('faction_id').inTable('factions')
    })
  }
})
db.schema.hasTable('keys').then(exists => {
  if (!exists) {
    db.schema.createTable('keys', t => {
      t.increments('key_id')
        .primary()
      t.string('key', 23)
        .notNullable()
      t.integer('owner')
        .unsigned()
        .notNullable()
      t.integer('created_by')
        .unsigned()
        .notNullable()

      t.foreign('owner')
        .references('user_id').inTable('users')
        .notNullable()
      t.foreign('created_by')
        .references('user_id').inTable('users')
    })
  }
})

const roles = [
  'banned',
  'kicked',
  'user',
  'moderator',
  'admin'
]
