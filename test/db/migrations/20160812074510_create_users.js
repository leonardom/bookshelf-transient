'use strict'

exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id')
  table.string('name')
  table.string('email')
  table.string('hashed_password')
  table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('users')
