'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class KerjaPraktek extends Model {
  static get table() {
    return 'kerja_praktek'
  }
}

module.exports = KerjaPraktek
