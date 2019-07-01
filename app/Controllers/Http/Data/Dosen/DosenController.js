'use strict'

class DosenController {

  async index({
    request,
    response
  }){
    const req = request.all()
    return response.json(req.NIDN)
  }
}

module.exports = DosenController
