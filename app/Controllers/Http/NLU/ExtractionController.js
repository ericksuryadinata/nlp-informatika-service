'use strict'

class ExtractionController {
  async index({response}){
    let messages = {
      'messages':'You get this service'
    }
    return response.status(200).json(messages)
  }
}

module.exports = ExtractionController
