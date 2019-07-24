'use strict'

const Dosen = use('App/Models/Dosen')
const LokasiDosen = use('App/Models/LokasiDosen')
const Moment = use('moment')
const Twilio = use('twilio')
const Env = use('Env')
const AccountSID = Env.get('TWILIO_ACCOUNT_SID')
const AuthToken = Env.get('TWILIO_AUTH_TOKEN')
const MessageServiceId = Env.get('TWILIO_MESSAGE_SERVICE_ID')
const Cache = use('Cache')
const random = use('randomstring')

class DosenController {
  async nidn ({
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
      let dosen = await Dosen.query().where('imei', req.imei).where('nip', req.nip).first()
      let lokasiDosen = new LokasiDosen()
      if (dosen) {
        lokasiDosen.nip = dosen.nip
        lokasiDosen.latitude = req.lat
        lokasiDosen.longitude = req.long
        // lokasiDosen.geocode = req.geocode
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

  async getDosen ({
    params,
    response
  }) {
    try {
      let lokasiDosen = await LokasiDosen.query().where('nip', params.nip).orderBy('timestamp', 'DESC').first()
      return response.json(lokasiDosen)
    } catch (error) {
      return response.status(500).json({
        'status': 'failed',
        'error': error.message
      })
    }
  }

  async register ({
    request,
    response
  }) {
    const req = request.all()
    // request.nip, request.nama, request.telp
    try {
      const dosen = await Dosen.query().where('nip', req.nip).first()
      if (dosen == null) {
        return response.json({
          'status': 'failed',
          'message': 'dosen tidak ada'
        })
      }

      return response.json({
        'status': 'success',
        'message': 'dosen ada'
      })
    } catch (error) {
      return response.status(500).json({
        'status': 'failed',
        'error': error.message
      })
    }
  }

  async getOTP ({
    params,
    response
  }) {
    try {
      let telp = params.number
      if (telp.charAt(0) === '0') {
        telp = telp.replace('0', '+62')
      }
      const OTP = Math.floor(Math.random() * 900000) + 100000
      const sessid = random.generate(10)
      await Cache.put(sessid, OTP, 500)
      const client = new Twilio(AccountSID, AuthToken)
      client.messages
        .create({
          body: OTP + ' is Your OTP\r\n' + '#' + sessid,
          messagingServiceSid: MessageServiceId,
          to: telp
        })
        .then(message => console.log(message.sid))

      return response.status(200).json({
        'Status': 'success',
        'Details': sessid
      })
    } catch (error) {
      return response.status(500).json({
        'status': 'failed',
        'error': error.message
      })
    }
  }

  async verifyOTP ({
    params,
    response
  }) {
    const OTP = params.OTP
    const sessid = params.sess
    const OTPCache = await Cache.get(sessid)
    console.log(OTPCache)
    if (OTP == OTPCache) {
      return response.status(200).json({
        'Status': 'success',
        'Details': sessid
      })
    }

    return response.status(200).json({
      'Status': 'failed',
      'Details': 'Salah KODE OTP'
    })
  }
}

module.exports = DosenController
