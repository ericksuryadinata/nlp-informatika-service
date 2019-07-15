'use strict'

const Dosen = use('App/Models/Dosen')
const LokasiDosen = use('App/Models/LokasiDosen')
const Moment = use('moment')

class DosenController {

  async random({
    request,
    response
  }){
    const req = request.all()
    return req.nidn
  }

  async android({
    request,
    response
  }){
    const req = request.all()
    try {
      const dosen = await Dosen.query().where('nip', req.nip).first()
      if (dosen) {
          const lokasiDosen = new LokasiDosen()
          return response.json({
            'status': 'success'
          })
        await dosenPhone.save()
        return response.json({
          'status': 'success'
        })
      }
      const dosenImei = await Dosen.query().where('imei', imei).first()
      if (dosenImei) {
        dosenImei.latitude = req.latitude
        dosenImei.longitude = req.longitude
        dosenImei.geocode = req.geocode
        dosenImei.lat_long_timestamp = req.timestamp
        dosenImei.imei = req.imei
        await dosenImei.save()
        return response.json({
          'status': 'success'
        })
      }

      return response.json({
        'status':'failed'
      })
    } catch (error) {
      return response.status(500).json({
        'status' : 'failed',
        'error' : error.message
      })
    }

  }

  async rfid({
    request,
    response
  }){
    const req = request.all()
    try {
      const dosen = await Dosen.query().where('nip', req.nip).first()
      if (dosen) {
        await LokasiDosen.query().where('nip',req.nip).update({
          location_timestamp : Moment().format('Y-MM-DD HH:mm:ss'),
          location_rfid : req.location_rfid
        })
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
