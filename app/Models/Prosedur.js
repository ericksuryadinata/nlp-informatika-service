'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Prosedur extends Model {
  static get table() {
    return 'prosedur'
  }
}

module.exports = Prosedur
