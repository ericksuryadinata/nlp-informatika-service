'use strict'

const Dosen = use('App/Models/Dosen')
const LokasiDosen = use('App/Models/LokasiDosen')
const Moment = use('moment')

class DosenController {
  async random ({
    request,
    response
  }) {
    const req = request.all()
    return req.nidn
  }

  async android ({
    request,
    response
  }) {
    const req = request.all()
    try {
      let dosen = await Dosen.query().where('imei', req.imei).first()
      let lokasiDosen = new LokasiDosen()
      if (dosen) {
        lokasiDosen.nip = dosen.nip
        lokasiDosen.latitude = req.latitude
        lokasiDosen.longitude = req.longitude
        lokasiDosen.geocode = req.geocode
        lokasiDosen.timestamp = Moment().format('Y-MM-DD HH:mm:ss')
        await lokasiDosen.save()
        return response.json({
          'status': 'success'
        })
      }
      return response.json({
        'status': 'failed'
      })
    } catch (error) {
      return response.status(500).json({
        'status': 'failed',
        'error': error.message
      })
    }
  }

  async rfid ({
    request,
    response
  }) {
    const req = request.all()
    try {
      const dosen = await Dosen.query().where('nip', req.nip).first()
      let lokasiDosen = new LokasiDosen()
      if (dosen) {
        lokasiDosen.nip = dosen.nip
        lokasiDosen.location_rfid = req.location_rfid
        lokasiDosen.timestamp = Moment().format('Y-MM-DD HH:mm:ss')
        await lokasiDosen.save()
        return response.json({
          'status': 'success'
        })
      }
      return response.json({
        'status': 'failed'
      })
    } catch (error) {
      return response.status(500).json({
        'status': 'failed',
        'error': error.message
      })
    }
  }
}

module.exports = DosenController
