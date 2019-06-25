'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Dosen extends Model {
  static get table () {
    return 'dosens'
  }
}

module.exports = Dosen
