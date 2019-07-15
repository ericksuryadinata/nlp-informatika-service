'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Laboratorium extends Model {
  static get table() {
    return 'laboratorium'
  }
}

module.exports = Laboratorium
