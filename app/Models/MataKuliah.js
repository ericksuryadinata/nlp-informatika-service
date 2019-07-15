'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MataKuliah extends Model {
  static get table() {
    return 'mata_kuliah'
  }
}

module.exports = MataKuliah
