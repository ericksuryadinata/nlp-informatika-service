'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InformasiUjianTa extends Model {
  static get table() {
    return 'informasi_ujian_ta'
  }
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = InformasiUjianTa
