'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hari extends Model {
  static get table() {
    return 'hari'
  }
}

module.exports = Hari
