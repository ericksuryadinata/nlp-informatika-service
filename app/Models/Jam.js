'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Jam extends Model {
  static get table() {
    return 'jam'
  }
}

module.exports = Jam
