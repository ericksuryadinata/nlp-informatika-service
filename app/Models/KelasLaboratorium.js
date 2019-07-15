'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class KelasLaboratorium extends Model {
  static get table() {
    return 'kelas_laboratorium'
  }
}

module.exports = KelasLaboratorium
