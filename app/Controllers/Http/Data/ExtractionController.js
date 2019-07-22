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
          logMessage.intent = 'No intent'
          logMessage.step = 'No intent'
          await logMessage.save()

          return response.json({
            'status': 'success',
            'result': result
          })
        }

        if(process.intent === 'None' && process.entities.length === 0){
          result = await this.Handler.entitiesHandler()
          logMessage.messages = process.utterance
          logMessage.answer = result
          logMessage.intent = process.intent
          logMessage.step = 'check entities'
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
        }

        console.log(entities)
        // find the intent for next process
        const intent = process.intent
        console.log(intent)
        // get the results
        result = await this.getResponse(intent, entities, process.utterance, process.srcAnswer, process.answer)
        // save this for some reason
        logMessage.messages = process.utterance
        logMessage.answer = result
        logMessage.intent = intent
        logMessage.step = 'finished'
        await logMessage.save()
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
   * @param {utterance} utterance
   * @param {srcAnswer} srcAnswer
   * @param {answer} answer
   */
  async getResponse(intent, entities, utterance, srcAnswer, answer) {
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
          if(typeof entities.mataKuliah === 'undefined'){
            result = 'Tidak ada jadwal pada mata kuliah pada hari tersebut'
          }
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
          if (typeof entities.mataKuliah === 'undefined') {
            result = 'Tidak ada jadwal pada mata kuliah pada hari ini'
          }
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
          if (typeof entities.mataKuliah === 'undefined') {
            result = 'Tidak ada jadwal pada mata kuliah pada hari ini'
          }
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
          if (typeof entities.mataKuliah === 'undefined') {
            result = 'Tidak ada jadwal pada mata kuliah pada hari ini'
          }
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
          if (typeof entities.mataKuliah === 'undefined') {
            result = 'Tidak ada jadwal pada mata kuliah pada hari ini'
          }
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
          result = answer + " " + Moment(seminarTA.tanggal).format("dddd, D MMMM YYYY") + ", Ruang " + seminarTA.ruang + "\r\n" + " Dengan Ketua Penguji " + seminarTA.ketua_penguji +
          "\r\n anggota penguji : \r\n1. " + seminarTA.anggota_penguji_1 +
          "\r\n2. " + seminarTA.anggota_penguji_2
        }
      }

      if (intent === 'cariJadwalUjianTA') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const ujianTA = await InformasiUjianTa.query().where('tahun', year).first()
        if (ujianTA == null) {
          result = 'Tidak ada jadwal seminar Tugas Akhir'
        } else {
          result = answer + " " + Moment(ujianTA.tanggal).format("dddd, D MMMM YYYY")
        }
      }

      if (intent === 'cariJadwalUjianTANbi') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const UjianTA = await InformasiUjianTa.query().where('tahun', year).where('nbi', entities.nbi).first()
        if (UjianTA == null) {
          result = 'Tidak ada jadwal seminar Tugas Akhir'
        } else {
          result = answer + " " + Moment(UjianTA.tanggal).format("dddd, D MMMM YYYY") + ", Ruang " + UjianTA.ruang + "\r\n" + " Dengan Ketua Penguji " + UjianTA.ketua_penguji +
            "\r\n anggota penguji : \r\n1. " + UjianTA.anggota_penguji_1 +
            "\r\n2. " + UjianTA.anggota_penguji_2
        }
      }

      if (intent === 'cariJadwalSidangKerjaPraktek') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const kerjaPraktek = await KerjaPraktek.query().where('tahun', year).first()
        if (kerjaPraktek == null) {
          result = 'Tidak ada jadwal sidang Kerja Praktek'
        } else {
          result = answer + " " + Moment(kerjaPraktek.tanggal).format("dddd, D MMMM YYYY")
        }
      }

      if (intent === 'cariJadwalSidangKerjaPraktekNbi') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const kerjaPraktek = await KerjaPraktek.query().where('tahun', year).where('nbi', entities.nbi).first()
        if (kerjaPraktek == null) {
          result = 'Tidak ada jadwal sidang Kerja Praktek'
        } else {
          result = answer + " " + Moment(kerjaPraktek.tanggal).format("dddd, D MMMM YYYY") + ", Ruang " + kerjaPraktek.ruang + "\r\n" + " Dengan Ketua Penguji " + kerjaPraktek.ketua_penguji +
            "\r\n anggota penguji : \r\n1. " + kerjaPraktek.anggota_penguji_1 +
            "\r\n2. " + kerjaPraktek.anggota_penguji_2
        }
      }

      if (intent === 'cariPraktikumNama') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const praktikumLaboratorium = await PraktikumLaboratorium.query().whereRaw('nama like ?', entities.namaPraktikum).first()
        let kelasLaboratorium = await KelasLaboratorium.query().where('praktikum_laboratorium_kode', praktikumLaboratorium.kode).where(function () {
          this.where('tahun_ajaran', year).orWhere('tahun_ajaran', year + 1)
        }).fetch()
        if (kelasLaboratorium == null) {
          result = 'Tidak ada jadwal praktikum ' + entities.namaPraktikum
        } else {
          kelasLaboratorium = kelasLaboratorium.toJSON()
          for (const element of kelasLaboratorium) {
            let hari = await Hari.query().where('kode', element.hari_kode).first()
            let jam_kode = element.jam.split("-")
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += "Kelas "+element.nama+" hari "+ hari.nama +" Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }

      if (intent === 'cariPraktikumHari') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        let hari = await Hari.query().where('nama', entities.hari).first()
        let kelasLaboratorium = await KelasLaboratorium.query().where('hari_kode', hari.kode).where(function(){
          this.where('tahun_ajaran', year).orWhere('tahun_ajaran', year+1)
        }).fetch()
        if (kelasLaboratorium == null) {
          result = 'Tidak ada jadwal praktikum pada hari ' + entities.hari
        } else {
          kelasLaboratorium = kelasLaboratorium.toJSON()
          console.log(kelasLaboratorium)
          for (const element of kelasLaboratorium) {
            let jam_kode = element.jam.split("-")
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += "Kelas " + element.nama + " hari " + hari.nama + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }
      if (intent === 'cariPraktikum') {
        let year = Moment().format('YYYY')
        let month = Moment().format('M')
        if (month < 8) {
          year = year - 1
        }
        const now = Moment().format('dddd')
        const hari = await Hari.query().where('nama', now.toUpperCase()).first()
        let kelasLaboratorium = await KelasLaboratorium.query().where('hari_kode', hari.kode).where(function () {
          this.where('tahun_ajaran', year).orWhere('tahun_ajaran', year + 1)
        }).fetch()
        if (kelasLaboratorium == null) {
          result = 'Tidak ada jadwal praktikum pada hari ' + entities.hari
        } else {
          kelasLaboratorium = kelasLaboratorium.toJSON()
          for (const element of kelasLaboratorium) {
            let jam_kode = element.jam.split("-")
            let mengajar_jam_ke = ""
            let jam = await Jam.query().where('kode', jam_kode[0]).first()
            mengajar_jam_ke = jam.jam_kuliah_masuk + "-"
            jam = await Jam.query().where('kode', jam_kode[1]).first()
            mengajar_jam_ke = mengajar_jam_ke + jam.jam_kuliah_keluar
            result += "Kelas " + element.nama + " hari " + hari.nama + " Jam : " + mengajar_jam_ke + "\r\n"
          }
        }
      }
      if (intent === 'cariNilaiPraktikum') {
        if(typeof entities.nbi === 'undefined'){
          result = "Data nbi belum dimasukkan, lengkapi pertanyaan dengan memasukkan nbi"
        }else{
          let kelasLaboratoriumMahasiswa = await KelasLaboratoriumMahasiswa.query().where('nbi', entities.nbi).fetch()
          kelasLaboratoriumMahasiswa = kelasLaboratoriumMahasiswa.toJSON()
          if(kelasLaboratoriumMahasiswa.length == 0){
            result = entities.nbi + " masih belum mengikuti praktikum"
          }else{
            for (const element of kelasLaboratoriumMahasiswa) {
              let kelasLaboratorium = await KelasLaboratorium.query().where('id',element.kelas_laboratorium_id).first()
              let praktikumLaboratorium = await PraktikumLaboratorium.query().where('kode',kelasLaboratorium.praktikum_laboratorium_kode).first()
              result += "Praktikum " + praktikumLaboratorium.nama + " Nilai " + element.grade + "\r\n"
            }
          }
        }
      }

      if (intent === 'cariNilaiPraktikumNama') {
        if(typeof entities.nbi === 'undefined'){
          result = "Data nbi belum dimasukkan, lengkapi pertanyaan dengan memasukkan nbi"
        }else{
          const praktikumLaboratorium = await PraktikumLaboratorium.query().whereRaw('nama like ?', entities.namaPraktikum).first()
          console.log(praktikumLaboratorium.kode)
          const kelasLaboratorium = await KelasLaboratorium.query().where('praktikum_laboratorium_kode', praktikumLaboratorium.kode).first()
          console.log(kelasLaboratorium.id)
          const kelasLaboratoriumMahasiswa = await KelasLaboratoriumMahasiswa.query()
          .where('kelas_laboratorium_id', kelasLaboratorium.id)
          .where('nbi', entities.nbi).first()
          result = answer + ' ' + kelasLaboratoriumMahasiswa.grade
        }
      }

      if (intent === 'cariJadwalPendaftaranSeminarTA') {
        const prosedur = await Prosedur.query().where('key',intent).first()
        if(prosedur == null || typeof prosedur === 'undefined'){
          result = 'Tidak ditemukan prosedur'
        }else{
          result = answer + ' ' + prosedur.value
        }
      }

      if (intent === 'cariJadwalPendaftaranUjianTA') {
        const prosedur = await Prosedur.query().where('key', intent).first()
        result = answer + ' ' + prosedur.value
      }

      if (intent === 'cariJadwalPendaftaranKerjaPraktek') {
        const prosedur = await Prosedur.query().where('key', intent).first()
        result = answer + ' ' + prosedur.value
      }

      if (intent === 'cariProsedurTA') {
        const prosedur = await Prosedur.query().where('key', intent).first()
        result = answer + ' ' + prosedur.value
      }

      if (intent === 'cariProsedurSeminarTA') {
        const prosedur = await Prosedur.query().where('key', intent).first()
        result = answer + ' ' + prosedur.value
      }

      if (intent === 'cariProsedurKerjaPraktek') {
        const prosedur = await Prosedur.query().where('key', intent).first()
        result = answer + ' ' + prosedur.value
      }

      if (intent === 'cariProsedurYudisium') {
        const prosedur = await Prosedur.query().where('key',intent).first()
        result = answer + ' ' + prosedur.value
      }
      if (result == '') {
        result = this.Handler.entitiesHandler()
      }

      return result;
    } catch (error){
      // save this for some reason
      const logMessage = new LogMessage()
      logMessage.messages = utterance
      logMessage.answer = JSON.stringify(error)
      logMessage.intent = intent
      logMessage.step = 'error building result'
      await logMessage.save()
      return await this.Handler.entitiesHandler() + error
    }

  }
}

module.exports = ExtractionController
