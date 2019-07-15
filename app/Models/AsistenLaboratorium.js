'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AsistenLaboratorium extends Model {
  static get table() {
    return 'asisten_laboratorium'
  }
}

module.exports = AsistenLaboratorium
