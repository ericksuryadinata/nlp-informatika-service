'use strict'
const {
  NlpManager,
  ConversationContext
} = use('node-nlp')

const {
  validate
} = use('Validator')
class TrainingController {

  /**
   * Training data
   * @method POST
   * @param {request} request
   * @param {response} response
   */
  async index({
    request,
    response
  }) {

    const req = request.all()
    const rules = {
      name: 'required',
      password: 'required'
    }

    const validation = await validate({
      name: req.name,
      password: req.password
    }, rules)
    if (!validation.fails()) {

      if (req.name === 'erick' && req.password === 'erick') {
        const manager = new NlpManager({
          languages: ['id'],
          threshold: 0.9
        })
        // entitity
        manager.addNamedEntityText('kondisiSalam', 'Pagi', ['id'], ['pagi', 'Pagi'])
        manager.addNamedEntityText('kondisiSalam', 'Siang', ['id'], ['siang', 'Siang'])
        manager.addNamedEntityText('kondisiSalam', 'Malam', ['id'], ['malam', 'Malam'])
        manager.addNamedEntityText('kondisiNetral', 'Alhamdulillah', ['id'], ['alhamdulillah', 'Alhamdulillah'])
        manager.addNamedEntityText('kondisiNetral', 'Semangat', ['id'], ['semangat', 'Semangat'])
        manager.addNamedEntityText('kondisiBaik', 'Baik', ['id'], ['baik', 'Baik'])
        manager.addNamedEntityText('kondisiBuruk', 'Buruk', ['id'], ['buruk', 'Buruk'])
        manager.addNamedEntityText('kondisiBuruk', 'Sedih', ['id'], ['sedih', 'Sedih'])
        manager.addNamedEntityText('kondisiBuruk', 'Gawat', ['id'], ['Gawat', 'gawat'])
        manager.addNamedEntityText('hari', 'Senin', ['id'], ['Senin', 'senin'])
        manager.addNamedEntityText('hari', 'Selasa', ['id'], ['Selasa', 'selasa'])
        manager.addNamedEntityText('hari', 'Rabu', ['id'], ['Rabu', 'rabu'])
        manager.addNamedEntityText('hari', 'Kamis', ['id'], ['Kamis', 'kamis'])
        manager.addNamedEntityText('hari', 'Jumat', ['id'], ['Jumat', 'jumat'])
        manager.addNamedEntityText('hari', 'Sabtu', ['id'], ['Sabtu', 'sabtu'])
        manager.addNamedEntityText('hari', 'Minggu', ['id'], ['Minggu', 'minggu'])
        manager.addNamedEntityText('kataKerja', 'Cari', ['id'], ['Carikan', 'carikan', 'Cari', 'cari'])
        manager.addNamedEntityText('kataKerja', 'Lihat', ['id'], ['Lihatkan', 'lihatkan', 'lihat', 'Lihat'])
        manager.addNamedEntityText('kataNomina', 'Jadwal', ['id'], ['Jadwal', 'jadwal', 'jdwl', 'jadual', 'Jadual', 'Jdwl'])
        manager.addNamedEntityText('kataNomina', 'Dosen', ['id'], ['Dosen', 'dosen', 'dsn', 'dosn'])
        manager.addNamedEntityText('kataNomina', 'Lokasi', ['id'], ['Lokasi', 'lokasi', 'lksi'])
        manager.addNamedEntityText('subjekGender', 'Bapak', ['id'], ['Pak', 'Bapak', 'pak', 'bapak'])
        manager.addNamedEntityText('subjekGender', 'Ibu', ['id'], ['Buk', 'buk', 'Ibu', 'ibu', 'bu', 'Bu'])
        manager.addNamedEntityText('subjekDosen', 'Ahmad Habib, S.Kom., M.M.', ['id'], ['Habib', 'Ahmad Habib', 'habib', 'ahmad habib'])
        manager.addNamedEntityText('subjekDosen', 'Supangat, S.Kom., M.MKom.', ['id'], ['Supangat', 'Pangat', 'supangat', 'pangat'])
        manager.addNamedEntityText('subjekDosen', 'Fridy Mandita, S.Kom., M.Sc.', ['id'], ['Fridy', 'fridy'])
        manager.addNamedEntityText('subjekDosen', 'Roenadi Koesdijarto, Ir.', ['id'], ['Roenadi', 'Roen', 'roenadi', 'roen', 'roe', 'Roe'])
        manager.addNamedEntityText('subjekDosen', 'Geri Kusnanto, S.Kom., MM.', ['id'], ['Geri', 'geri', 'gery', 'Gery'])
        manager.addNamedEntityText('subjekDosen', 'Agus Darwanto, Ir.', ['id'], ['Agus', 'Adar', 'dar', 'Dar', 'adar', 'agus dar', 'Agus Dar'])
        manager.addNamedEntityText('subjekDosen', 'Moh. Sidqon, S.Si., M.Si.', ['id'], ['Sidqon', 'sidqon'])
        manager.addNamedEntityText('subjekDosen', 'Mohammad Firdaus, S.Kom., M.Kom.', ['id'], ['Firdaus', 'firdaus', 'Fir', 'fir'])
        manager.addNamedEntityText('subjekDosen', 'Ir. Sugiono, MT', ['id'], ['Sugiono', 'sugiono', 'sugi', 'Sugi', 'gik', 'Gik', 'sgk', 'SGK', 'Sgk', 'sugik'])
        manager.addNamedEntityText('subjekDosen', 'Muaffaq A. Jani, Dr., Ir., M.Eng.', ['id'], ['Muaffaq', 'muaffaq', 'Muaffak', 'muaffak', 'muafaq', 'Muafaq'])
        manager.addNamedEntityText('subjekDosen', 'Ery Sadewa Yudha, W., S.Kom, M.M.', ['id'], ['Ery', 'ery', 'eri', 'Eri'])
        manager.addNamedEntityText('subjekDosen', 'Fajar Astuti H., S.Kom., M.Kom.', ['id'], ['Fajar', 'fajar'])
        manager.addNamedEntityText('subjekDosen', 'Agyl Ardi Rahmadi, S.Kom., M.A', ['id'], ['Agyl', 'agil'])
        manager.addNamedEntityText('subjekDosen', 'Agung Kridoyono, S.ST., MT.', ['id'], ['Agung', 'agung'])
        manager.addNamedEntityText('subjekDosen', 'Agus Hermanto, S.KOM., M.MT., ITIL, COBIT', ['id'], ['Aher', 'aher', 'agus', 'Agus'])
        manager.addNamedEntityText('subjekDosen', 'Berlian Al Kindhi, S.ST., MT.', ['id'], ['Berlian', 'berlian'])

        // possible questions

        // general questions
        // =================
        manager.addDocument('id', 'Selamat %kondisiSalam%', 'sapaanKabar')
        manager.addDocument('id', 'Met %kondisiSalam%', 'sapaanKabar')
        manager.addDocument('id', 'Slmt %kondisiSalam%', 'sapaanKabar')
        manager.addDocument('id', 'Hai, selamat %kondisiSalam%', 'sapaanKabar')
        manager.addDocument('id', '%kondisiSalam%', 'sapaanKabar')
        manager.addDocument('id', '%kondisiSalam% bos', 'sapaanKabar')
        manager.addDocument('id', '%kondisiSalam% bot', 'sapaanKabar')
        manager.addDocument('id', 'Halo, %kondisiSalam%', 'sapaanKabar')
        manager.addDocument('id', 'Hai', 'sapaanKabar')
        manager.addDocument('id', 'hi', 'sapaanKabar')
        manager.addDocument('id', 'Hey', 'sapaanKabar')
        manager.addDocument('id', 'Halo', 'sapaanKabar')
        manager.addDocument('id', 'Oy', 'sapaanKabar')
        manager.addDocument('id', 'Hai, Apa Kabar ?', 'sapaanKabarTanya')
        manager.addDocument('id', 'Bagaimana kabarmu ?', 'sapaanKabarTanya')
        manager.addDocument('id', 'Gimana kabarmu ?', 'sapaanKabarTanya')
        manager.addDocument('id', 'Bagaimana kondisimu ?', 'sapaanKabarTanya')

        // Lokasi Dosen
        // ============
        // General
        manager.addDocument('id', 'lokasi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana posisi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana posisi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana posisi %subjekGender% %subjekDosen% sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'carikan lokasi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'Tolong, carikan lokasi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% ada dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% ada dimana sekarang?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimanakah %subjekGender% %subjekDosen% ?', 'cariLokasiDosenGeneral')

        // Bapak
        manager.addDocument('id', 'posisi pak %subjekDosen%', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% sekarang ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'dimana posisi pak %subjekDosen%', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'dimana posisi pak %subjekDosen% sekarang', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'carikan lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'Tolong, carikan lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% ada dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana sekarang ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% ada dimana sekarang?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'dimanakah pak %subjekDosen% ?', 'cariLokasiDosenLaki')

        // Ibu
        manager.addDocument('id', 'bu %subjekDosen% ada dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana sekarang ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'dimana posisi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% sekarang ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'dimana posisi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'dimana posisi bu %subjekDosen% sekarang', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'carikan lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'Tolong, carikan lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% ada dimana sekarang?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'dimanakah bu %subjekDosen% ?', 'cariLokasiDosenPerempuan')

        // End Lokasi Dosen
        // ================

        // jadwal dosen
        // ============
        manager.addDocument('id', 'jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% sekarang ?', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'dimana posisi %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'dimana posisi %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'carikan Jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'Tolong, carikan Jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% ada dimana ?', 'cariJadwalDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana sekarang ?', 'cariJadwalDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% ada dimana sekarang?', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'dimanakah %subjekGender% %subjekDosen% ?', 'cariJadwalDosenGeneral')


        // possible answer
        manager.addAnswer('id', 'sapaanKabar', '{{kondisiSalam}}')
        manager.addAnswer('id', 'sapaanKabar', 'Selamat {{kondisiSalam}} juga')
        manager.addAnswer('id', 'sapaanKabar', '{{kondisiSalam}} juga')
        manager.addAnswer('id', 'sapaanKabarTanya', 'Baik - Baik')
        manager.addAnswer('id', 'sapaanKabarTanya', 'Selalu sehat :)')
        manager.addAnswer('id', 'sapaanKabarTanya', 'Selalu Semangat')
        manager.addAnswer('id', 'sapaanKabar', 'Hi Juga')
        manager.addAnswer('id', 'sapaanKabar', 'Hey')
        manager.addAnswer('id', 'sapaanKabar', 'Aye Aye')

        // Lokasi Dosen
        manager.addAnswer('id', 'cariLokasiDosenGeneral', 'lokasi {{subjekGender}} {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenGeneral', 'posisi {{subjekGender}} {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenGeneral', '{{subjekGender}} {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenGeneral', '{{subjekGender}} {{subjekDosen}} sekarang ada di')
        manager.addAnswer('id', 'cariLokasiDosenGeneral', '{{subjekGender}} {{subjekDosen}} saat ini ada di')

        manager.addAnswer('id', 'cariLokasiDosenLaki', 'lokasi pak {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenLaki', 'posisi pak {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenLaki', 'pak {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenLaki', 'pak {{subjekDosen}} sekarang ada di')
        manager.addAnswer('id', 'cariLokasiDosenLaki', 'pak {{subjekDosen}} saat ini ada di')

        manager.addAnswer('id', 'cariLokasiDosenPerempuan', 'lokasi bu {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenPerempuan', 'posisi bu {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenPerempuan', 'bu {{subjekDosen}} berada di')
        manager.addAnswer('id', 'cariLokasiDosenPerempuan', 'bu {{subjekDosen}} sekarang ada di')
        manager.addAnswer('id', 'cariLokasiDosenPerempuan', 'bu {{subjekDosen}} saat ini ada di')

        manager.addAnswer('id', 'cariJadwalDosen', 'jadwal pak {{subjekDosen}} adalah')
        await manager.train()
        manager.save('source/model.nlp')
        return response.status(200).json({
          'status': 'success'
        })
      } else {
        return response.status(401).json({
          'status': 'failed',
          'message': 'username atau password salah'
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

module.exports = TrainingController
