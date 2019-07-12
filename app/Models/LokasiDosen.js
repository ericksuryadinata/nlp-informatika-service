'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LokasiDosen extends Model {
  static get table() {
    return 'lokasi_dosen'
  }
}

module.exports = LokasiDosen
