'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Krss extends Model {
  static get table() {
    return 'krs'
  }
}

module.exports = Krss
