'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DosenSchema extends Schema {
  up () {
    this.create('dosens', (table) => {
      table.increments()
      table.string('nip')
      table.string('nidn')
      table.string('nama')
      table.string('nomor_telepon')
      table.string('lokasi')
      table.timestamps()
    })
  }

  down () {
    this.drop('dosens')
  }
}

module.exports = DosenSchema
