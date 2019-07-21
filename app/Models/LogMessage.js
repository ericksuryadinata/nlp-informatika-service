'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class LogMessage extends Model {
  static get table () {
    return 'log_messages'
  }
}

module.exports = LogMessage
