'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LokasiDosen extends Model {
  static get table() {
    return 'lokasi_dosen'
  }
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = LokasiDosen
