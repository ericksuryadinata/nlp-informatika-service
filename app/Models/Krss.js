'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Krss extends Model {
  static get table() {
    return 'krs'
  }
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = Krss
