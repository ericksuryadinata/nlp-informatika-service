'use strict'

const Dosen = use('App/Models/Dosen')
const LokasiDosen = use('App/Models/LokasiDosen')
const Moment = use('moment')
const Twilio = use('twilio')
const Env = use('Env')
const AccountSID = Env.get('TWILIO_ACCOUNT_SID')
const AuthToken = Env.get('TWILIO_AUTH_TOKEN')

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

  async register({
    request,
    response
  }){
    const req = request.all()
    return response.json({
      nip: req.nip,
      nama: req.nama,
      telp: req.telp
    })
    // request.nip, request.nama, request.telp
    try {
      // const dosen = await Dosen.query().where('nip', request.nip).first()
      // if (dosen == null) {
      //   return response.json({
      //     'status': 'failed',
      //     'message': 'dosen tidak ada'
      //   })
      // }
      // const client = new Twilio(AccountSID, AuthToken)
      // client.messages.create({
      //   body: "test",
      //   to: "+628994443444",
      //   from: "+12182170845"
      // }).then((message) => console.log(message.sid))

    } catch (error) {
      return response.status(500).json({
        'status': 'failed',
        'error': error.message
      })
    }

  }
}

module.exports = DosenController
