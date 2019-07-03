'use strict'

const Dosen = use('App/Models/Dosen')
const Moment = use('moment')

class DosenController {

  async random({
    request,
    response
  }){
    const req = request.all()
    return req.NIDN
  }

  async android({
    request,
    response
  }){
    const req = request.all()
    try {
      const dosenPhone = await Dosen.query().where('phone_number', req.phone_number).first();
      if (dosenPhone) {
        dosenPhone.latitude = req.latitude;
        dosenPhone.longitude = req.longitude;
        dosenPhone.geocode = req.geocode;
        dosenPhone.lat_long_timestamp = req.timestamp;
        dosenPhone.imei = req.imei;
        await dosenPhone.save();
        return response.json({
          'status': 'success'
        })
      }
      const dosenImei = await Dosen.query().where('imei', imei).first()
      if (dosenImei) {
        dosenImei.latitude = req.latitude;
        dosenImei.longitude = req.longitude;
        dosenImei.geocode = req.geocode;
        dosenImei.lat_long_timestamp = req.timestamp;
        dosenImei.imei = req.imei;
        await dosenImei.save();
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
      const dosen = await Dosen.query().where('nidn', req.nidn).first()
      if (dosen) {
        dosen.location_rfid = req.location_rfid;
        dosen.location_rfid_timestamp = Moment().format('Y-MM-DD HH:mm:ss');
        await dosen.save();
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
