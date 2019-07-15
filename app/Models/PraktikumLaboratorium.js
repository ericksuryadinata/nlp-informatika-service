'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PraktikumLaboratorium extends Model {
  static get table() {
    return 'praktikum_laboratorium'
  }
}

module.exports = PraktikumLaboratorium
