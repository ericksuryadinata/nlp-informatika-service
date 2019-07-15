'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PraktikumLaboratorium extends Model {
  static get table() {
    return 'praktikum_laboratorium'
  }
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = PraktikumLaboratorium
