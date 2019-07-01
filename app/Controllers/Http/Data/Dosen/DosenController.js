'use strict'

class DosenController {

  async index({
    request,
    response
  }){
    const req = request.all()
    return req.NIDN
  }
}

module.exports = DosenController
