'use strict'

const {
  NlpManager
} = use('node-nlp')
const {
  validate
} = use('Validator')
const defaultHandler = use('App/Helper/WordHandler')
const Dosen = use('App/Models/Dosen')
const LokasiDosen = use('App/Models/LokasiDosen')
const Hari = use('App/Models/Hari')
const Jam = use('App/Models/Jam')
const Krss = use('App/Models/Krss')
const MataKuliah = use('App/Models/MataKuliah')
const Mahasiswa = use('App/Models/Mahasiswa')
const InformasiSeminarTa = use('App/Models/InformasiSeminarTa')
const InformasiUjianTa = use('App/Models/InformasiUjianTa')
const KerjaPraktek = use('App/Models/KerjaPraktek')
const PraktikumLaboratorium = use('App/Models/PraktikumLaboratorium')
const KelasLaboratorium = use('App/Models/KelasLaboratorium')
const KelasLaboratoriumMahasiswa = use('App/Models/KelasLaboratoriumMahasiswa')
const Prosedur = use('App/Models/Prosedur')
const LogMessage = use('App/Models/LogMessage')
const Moment = use('moment')

class ExtractionController {
  constructor() {
    Moment.locale('id')
    this.Handler = new defaultHandler()
  }

  /**
   *
   * @param {request} request
   * @param {response} response
   */
  async index({
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
        let kata = req.sentence
        let result = ''
        let entities = {}
        let logMessage = new LogMessage()
        // const number = kata.substring(kata.search(/(?<=\s|^)\d{10}|(?<=\s|^)\d{9}/g))

        const process = await manager.process('id', kata)

        // if no intent find, we can response it with default handler
        if (process.intent === 'None') {
          result = await this.Handler.intentHandler()
          logMessage.messages = process.utterance
          logMessage.answer = result
          await logMessage.save()

          return response.json({
            'status': 'success',
            'result': result
          })
        }

        // let's build the entities for the next process
        if (process.entities.length !== 0) {
          process.entities.forEach(element => {
            if (typeof element.option === 'undefined') {
              entities[element.entity] = element.sourceText
            } else {
              entities[element.entity] = element.option
            }

          })
        } else {
          result = await this.Handler.entitiesHandler()
          logMessage.messages = process.utterance
          logMessage.answer = result
          await logMessage.save()

          return response.json({
            'status': 'success',
            'result': result
          })
        }
        console.log(entities)
        // find the intent for next process
        const intent = process.intent
        console.log(intent)
        result = await this.getResponse(intent, entities, process.srcAnswer, process.answer)
        return response.json({
          'status': 'success',
          'result': result,
          'process': process
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

  /**
   *
   * @param {intent} intent
   * @param {entities} entities
   * @param {srcAnswer} srcAnswer
   * @param {answer} answer
   */
  async getResponse(intent, entities, srcAnswer, answer) {
    // we know the intent
    // for god sake, this method is not a best practice
    // the best pratice is, looking on table, and create a dinamic query about the intent and entities
    try {
      let result = '',
        lokasi

      if (intent === 'cariLokasiDosenGeneral') {
        const dosen = await Dosen.query().whereRaw('nama like ?', entities.subjekDosen).first()
        const lokasiDosen = await LokasiDosen.query().where('nip', dosen.nip).orderBy('timestamp', 'desc').first()
        if (lokasiDosen == null) {
          result = entities.subjekDosen + " saat ini tidak diketahui keberadaannya"
        } else {
          lokasi = lokasiDosen.location_rfid
          if (lokasi == null) {
            lokasi = lokasiDosen.latitude + " " + lokasiDosen.longitude + ", " + lokasiDosen.geocode
          }
          result = answer + " " + lokasi
        }
      }


      if (intent === 'cariJadwalDosenGeneral') {
        const now = Moment().format('dddd')
        const hari = await Hari.query().where('nama', now.toUpperCase()).first()
        const dosen = await Dosen.query().whereRaw('nama like ?', entities.subjekDosen).first()
        let jadwal = await Krss.query().where('nip', dosen.nip).where('hari_kode', hari.kode).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = entities.subjekDosen + " tidak sedang mengajar"
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }


      if (intent === 'cariJadwalDosenGeneralHari') {
        const hari = await Hari.query().where('nama', entities.hari.toUpperCase()).first()
        const dosen = await Dosen.query().whereRaw('nama like ?', entities.subjekDosen).first()
        let jadwal = await Krss.query().where('nip', dosen.nip).where('hari_kode', hari.kode).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = entities.subjekDosen + " tidak mempunyai jadwal pada hari tersebut "
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariNomorDosenGeneral') {
        const dosen = await Dosen.query().whereRaw('nama like ?', entities.subjekDosen).first()
        if (dosen.nomor_telepon.indexOf('xxx') === -1) {
          result = answer + " " + dosen.nomor_telepon
        } else {
          result = entities.subjekDosen + " masih belum mempunyai kontak"
        }
      }

      if (intent === 'cariJadwalKuliah') {
        const now = Moment().format('dddd')
        const hari = await Hari.query().where('nama', now.toUpperCase()).first()
        let jadwal = await Krss.query().where('hari_kode', hari.kode).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = 'Tidak ada jadwal kuliah pada hari ini'
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariJadwalKuliahNama') {
        const mk = await MataKuliah.query().where('nama', entities.mataKuliah).first()
        let jadwal = await Krss.query().where('mata_kuliah_kode', mk.kode).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = 'Tidak ada jadwal pada mata kuliah tersebut'
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariJadwalKuliahNamaHari') {
        const hari = await Hari.query().where('nama', entities.hari.toUpperCase()).first()
        const mk = await MataKuliah.query().where('nama', entities.mataKuliah).first()
        let jadwal = await Krss.query().where('hari_kode', hari.kode).where('mata_kuliah_kode', mk.kode).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = 'Tidak ada jadwal pada mata kuliah ' + entities.mataKuliah + ' pada hari tersebut'
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariJadwalKuliahNamaNbi') {
        const now = Moment().format('dddd')
        const hari = await Hari.query().where('nama', now.toUpperCase()).first()
        const mk = await MataKuliah.query().where('nama', entities.mataKuliah).first()
        let jadwal = await Krss.query().where('hari_kode', hari.kode).where('mata_kuliah_kode', mk.kode).where('nbi', entities.nbi).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = 'Tidak ada jadwal pada mata kuliah ' + entities.mataKuliah + ' pada hari ini'
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariJadwalKuliahNbi') {
        const now = Moment().format('dddd')
        const hari = await Hari.query().where('nama', now.toUpperCase()).first()
        let jadwal = await Krss.query().where('hari_kode', hari.kode).where('nbi', entities.nbi).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = 'Tidak ada jadwal pada mata kuliah ' + entities.mataKuliah + ' pada hari ini'
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariJadwalKuliahHari') {
        const now = Moment().format('dddd')
        const hari = await Hari.query().where('nama', entities.hari).first()
        let jadwal = await Krss.query().where('hari_kode', hari.kode).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = 'Tidak ada jadwal pada mata kuliah ' + entities.mataKuliah + ' pada hari ini'
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }
      if (intent === 'cariJadwalKuliahHariNbi') {
        const now = Moment().format('dddd')
        const hari = await Hari.query().where('nama', entities.hari).first()
        let jadwal = await Krss.query().where('hari_kode', hari.kode).where('nbi', entities.nbi).groupBy('mata_kuliah_kode').groupBy('kelas').fetch()
        if (jadwal == null || jadwal.toJSON().length === 0) {
          result = 'Tidak ada jadwal pada mata kuliah ' + entities.mataKuliah + ' pada hari ini'
        } else {
          jadwal = jadwal.toJSON()
          for (const element of jadwal) {
            let jam_kode = element.jam.split("-")
            let mataKuliah = await MataKuliah.query().where('kode', element.mata_kuliah_kode).first()
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += mataKuliah.nama + " Kelas " + element.kelas + " Ruang " + element.ruang + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariJadwalSeminarTA') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const seminarTA = await InformasiSeminarTa.query().where('tahun', year).first()
        if (seminarTA == null) {
          result = 'Tidak ada jadwal seminar Tugas Akhir'
        } else {
          console.log(seminarTA.tanggal)
          result = answer + " " + Moment(seminarTA.tanggal).format("dddd, D MMMM YYYY")
        }
      }
      if (intent === 'cariJadwalSeminarTANbi') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const seminarTA = await InformasiSeminarTa.query().where('tahun', year).where('nbi', entities.nbi).first()
        if (seminarTA == null) {
          result = 'Tidak ada jadwal seminar Tugas Akhir'
        } else {
          console.log(seminarTA.tanggal)
          result = answer + " " + Moment(seminarTA.tanggal).format("dddd, D MMMM YYYY") + ", Ruang " + seminarTA.ruang + "\r\n" + " Dengan Ketua Penguji " + seminarTA.ketua_penguji +
          "\r\n anggota penguji : \r\n1. " + seminarTA.anggota_penguji_1 +
          "\r\n2. " + seminarTA.anggota_penguji_2
        }
      }
      if (intent === 'cariJadwalUjianTA') {

      }
      if (intent === 'cariJadwalUjianTANbi') {

      }
      if (intent === 'cariJadwalSidangKerjaPraktek') {

      }
      if (intent === 'cariJadwalSidangKerjaPraktekNbi') {

      }
      if (intent === 'cariPraktikumNama') {

      }
      if (intent === 'cariPraktikumHari') {

      }
      if (intent === 'cariPraktikum') {

      }
      if (intent === 'cariNilaiPraktikum') {

      }
      if (intent === 'cariNilaiPraktikumNama') {

      }
      if (intent === 'cariJadwalPendaftaranSeminarTA') {

      }
      if (intent === 'cariJadwalPendaftaranUjianTA') {

      }
      if (intent === 'cariJadwalPendaftaranKerjaPraktek') {

      }
      if (intent === 'cariSyaratTA') {

      }
      if (intent === 'cariProsedurTA') {

      }
      if (intent === 'cariSyaratKerjaPraktek') {

      }
      if (intent === 'cariProsedurKerjaPraktek') {

      }
      if (intent === 'cariSyaratYudisium') {

      }

      if (result == '') {
        result = 'Menu masih belum diaktifkan'
      }

      return result;
    } catch (error) {
      return await this.Handler.entitiesHandler() + error
    }

  }
}

module.exports = ExtractionController
