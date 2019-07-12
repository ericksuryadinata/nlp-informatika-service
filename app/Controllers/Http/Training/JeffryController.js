'use strict'
const {
  NlpManager
} = use('node-nlp')

class JeffryController {
  async index({
    request,
    response
  }){
    const manager = new NlpManager({
      languages: ['id'],
      threshold: 0.9
    })
  }
}

module.exports = JeffryController
