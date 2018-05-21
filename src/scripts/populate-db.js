const db = require('../utils/database.js')

const createTablePromises = [
  new Promise(async (resolve, reject) => {
    const tableName = 'roles'
    const exists = await db.schema.hasTable(tableName)
    if (!exists) {
      db.schema.createTable(tableName, t => {
        t.increments('role_id').primary()
        t.string('role_name', 20).notNullable()
      })
        .then(resolve(tableName))
        .catch(reject)
    }
  }),
  new Promise(async (resolve, reject) => {
    const tableName = 'factions'
    const exists = await db.schema.hasTable(tableName)
    if (!exists) {
      db.schema.createTable(tableName, t => {
        t.increments('faction_id').primary()
        t.string('faction_name', 30).notNullable()
      })
        .then(resolve(tableName))
        .catch(reject)
    }
  }),
  new Promise(async (resolve, reject) => {
    const tableName = 'users'
    const exists = await db.schema.hasTable(tableName)
    if (!exists) {
      db.schema.createTable(tableName, t => {
        t.increments('user_id').primary()
        t.string('username', 24).notNullable()
        t.binary('hash').notNullable()
        t.integer('role').unsigned().notNullable()
        t.integer('faction').unsigned()
        t.timestamp('created_at').defaultTo(db.fn.now())
        t.timestamp('last_seen').defaultTo(db.fn.now())

      })
        .then(resolve(tableName))
        .catch(reject)
    }
  }),
  new Promise(async (resolve, reject) => {
    const tableName = 'keys'
    const exists = await db.schema.hasTable(tableName)
    if (!exists) {
      await db.schema.createTable(tableName, t => {
        t.increments('key_id').primary()
        t.string('key', 23).notNullable()
        t.integer('owner').unsigned().notNullable()
        t.integer('created_by').unsigned().notNullable()
      })
        .then(resolve(tableName))
        .catch(reject)
    }
  })
]

const foreignTablePromises = [
  new Promise(async (resolve, reject) => {
    const tableName = 'users'
    console.log('test')
    await db.schema.alterTable(tableName, t => {
      t.foreign('role').references('role_id').inTable('roles')
      t.foreign('faction').references('faction_id').inTable('factions')
    })
  }),
  new Promise(async (resolve, reject) => {
    const tableName = 'keys'
    console.log('test')
    await db.schema.alterTable(tableName, t => {
      t.foreign('owner').references('user_id').inTable('users')
      t.foreign('created_by').references('user_id').inTable('users')
    })
  })
]

async function main () {
  const tableList = await Promise.all(createTablePromises)
  await Promise.all(foreignTablePromises)
  console.log(tableList)
  const batchRoles = [
    { role_id: 1, role_name: 'banned' },
    { role_id: 2, role_name: 'kicked' },
    { role_id: 3, role_name: 'user' },
    { role_id: 4, role_name: 'moderator' },
    { role_id: 5, role_name: 'admin' }
  ]

  const ids = await db.batchInsert('roles', batchRoles)
    .returning('role_id')
  console.log(ids)
  process.exit(0)
}

main()
