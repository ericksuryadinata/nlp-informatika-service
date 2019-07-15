'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InformasiSeminarTa extends Model {
  static get table() {
    return 'informasi_seminar_ta'
  }
}

module.exports = InformasiSeminarTa
