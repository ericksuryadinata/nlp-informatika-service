'use strict'

const { NlpManager } = use('node-nlp')
const { validate } = use('Validator')
class ExtractionController {
  async index ({
    request,
    response
  }) {
    const req = request.all()
    const rules = {
      sentence: 'required'
    }
    const validation = await validate({
      sentence: req.sentence
    }, rules)

    if (!validation.fails()) {
      try {
        const manager = new NlpManager()
        manager.load('source/model.nlp')
        const process = await manager.process('id', req.sentence)
        return response.json({
          'status': 'success',
          'result': process
        })
      } catch (error) {
        return response.status(500).json({
          'status': 'failed',
          'error': error.message
        })
      }
    } else {
      return response.status(401).json({
        'status': 'failed',
        'message': validation.messages()
      })
    }
  }
}

module.exports = ExtractionController
