'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class KelasLaboratoriumMahasiswa extends Model {
  static get table() {
    return 'kelas_laboratorium_mahasiswa'
  }
  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }
}

module.exports = KelasLaboratoriumMahasiswa
