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
        manager.addNamedEntityText('kataTelepon', 'Telepon', ['id'], ['telpon', 'telepon', 'Telepon', 'Telpon', 'phone'])
        manager.addNamedEntityText('kataTelepon', 'Whatsapp', ['id'], ['wa', 'Whatsapp', 'WA', 'whatsapp'])
        manager.addNamedEntityText('kataCari', 'Cari', ['id'], ['Carikan', 'carikan', 'Cari', 'cari'])
        manager.addNamedEntityText('kataLihat', 'Lihat', ['id'], ['Lihatkan', 'lihatkan', 'lihat', 'Lihat'])
        manager.addNamedEntityText('kataJadwal', 'Jadwal', ['id'], ['Jadwal', 'jadwal', 'jdwl', 'jadual', 'Jadual', 'Jdwl'])
        manager.addNamedEntityText('kataLokasi', 'Lokasi', ['id'], ['Lokasi', 'lokasi', 'lksi'])
        manager.addNamedEntityText('tugasAkhir', 'Tugas Akhir', ['id'], ['TA', 'ta', 'tugas akhir', 'Tugas Akhir'])
        // manager.addRegexEntity('nbi', 'id', /^\d{9}$|^\d{10}$/gi)
        manager.addNamedEntityText('subjekGender', 'Bapak', ['id'], ['Pak', 'Bapak', 'pak', 'bapak'])
        manager.addNamedEntityText('subjekGender', 'Ibu', ['id'], ['Buk', 'buk', 'Ibu', 'ibu', 'bu', 'Bu'])
        manager.addNamedEntityText('subjekDosen', 'Geri Kusnanto, S.Kom.,MM.', ['id'], ['Geri', 'geri', 'gery', 'Gery'])
        manager.addNamedEntityText('subjekDosen', 'Ir. Sugiono, MT', ['id'], ['Sugiono', 'sugiono', 'sugi', 'Sugi', 'gik', 'Gik', 'sgk', 'SGK', 'Sgk', 'sugik'])
        manager.addNamedEntityText('subjekDosen', 'Dr. Ir. Muaffaq Achmad Jani, M.Eng', ['id'], ['Muaffaq', 'muaffaq', 'Muaffak', 'muaffak', 'muafaq', 'Muafaq'])
        manager.addNamedEntityText('subjekDosen', 'Ery Sadewa Yudha Wrahatnala, S.Kom., MM', ['id'], ['Ery', 'ery', 'eri', 'Eri'])
        manager.addNamedEntityText('subjekDosen', 'Dr. Fajar Astuti Hermawati, S.Kom., M.Kom', ['id'], ['Fajar', 'fajar'])
        manager.addNamedEntityText('subjekDosen', 'Ir. Roenadi Koesdijarto, MM', ['id'], ['Roenadi', 'Roen', 'roenadi', 'roen', 'roe', 'Roe'])
        manager.addNamedEntityText('subjekDosen', 'Muhamad Firdaus, ST., M.Kom', ['id'], ['Firdaus', 'firdaus', 'Fir', 'fir'])
        manager.addNamedEntityText('subjekDosen', 'Mochamad Sidqon, S.Si., M.Si', ['id'], ['Sidqon', 'sidqon'])
        manager.addNamedEntityText('subjekDosen', 'Ir. Agus Darwanto, MM', ['id'], ['Agus', 'Adar', 'dar', 'Dar', 'adar', 'agus dar', 'Agus Dar'])
        manager.addNamedEntityText('subjekDosen', 'Anton Breva Yunanda, ST., M.MT.', ['id'], ['Anton', 'anton', 'breva'])
        manager.addNamedEntityText('subjekDosen', 'Supangat, M.Kom.,ITIL., COBIT', ['id'], ['Supangat', 'Pangat', 'supangat', 'pangat'])
        manager.addNamedEntityText('subjekDosen', 'Fridy Mandita, S.Kom., M.Sc', ['id'], ['Fridy', 'fridy'])
        manager.addNamedEntityText('subjekDosen', 'Ahmad Habib, S.Kom., MM', ['id'], ['Habib', 'Ahmad Habib', 'habib', 'ahmad habib'])
        manager.addNamedEntityText('subjekDosen', 'Agyl Ardi Rahmadi, S.Kom., M.A', ['id'], ['Agyl', 'agil'])
        manager.addNamedEntityText('subjekDosen', 'Agung Kridoyono, S.ST., MT', ['id'], ['Agung', 'agung'])
        manager.addNamedEntityText('subjekDosen', 'Agus Hermanto, S.Kom., M.MT', ['id'], ['Aher', 'aher', 'agus', 'Agus'])
        manager.addNamedEntityText('subjekDosen', 'Berlian Al Kindhi, S.ST., MT.', ['id'], ['Berlian', 'berlian'])
        manager.addNamedEntityText('subjekDosen', 'Luvia Friska Narulita, S.ST., MT', ['id'], ['Luvia', 'luvia', 'Friska', 'friska'])
        manager.addNamedEntityText('subjekDosen', 'Anang Pramono, S.Kom., MM', ['id'], ['Anang', 'anang', 'Anang Pramono', 'anang pramono'])


        // possible questions

        // Lokasi Dosen
        // ============

        // General
        manager.addDocument('id', '%subjekDosen% sekarang dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% ada dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% lokasinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% lokasinya dimana sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% posisinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% sekarang berada dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% sekarang posisinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% sekarang lokasinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana lokasinya', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana posisinya', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen% sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen% dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen% sekarang dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekDosen% dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekDosen% sekarang dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% sekarang dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% ada dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% lokasinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% lokasinya dimana sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% posisinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% sekarang berada dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% sekarang posisinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% sekarang lokasinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana lokasinya ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekDosen% dimana posisinya ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen% ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen% sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen% dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekDosen% sekarang dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekDosen% dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekDosen% sekarang dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekDosen% ?', 'cariLokasiDosenGeneral')

        // Bapak
        manager.addDocument('id', 'pak %subjekDosen% sekarang dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana sekarang ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% ada dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana sekarang ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% posisinya dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% sekarang berada dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% sekarang posisinya dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% sekarang lokasinya dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana lokasinya ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana posisinya ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% sekarang ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% sekarang dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'lokasi pak %subjekDosen% dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'lokasi pak %subjekDosen% sekarang dimana ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'lokasi pak %subjekDosen% ?', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% sekarang dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana sekarang', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% ada dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana sekarang', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% posisinya dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% sekarang berada dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% sekarang posisinya dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% sekarang lokasinya dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana lokasinya', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'pak %subjekDosen% dimana posisinya', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen%', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% sekarang', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'posisi pak %subjekDosen% sekarang dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'lokasi pak %subjekDosen% dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'lokasi pak %subjekDosen% sekarang dimana', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'tolong carikan lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')
        manager.addDocument('id', 'carikan lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')


        // Ibu
        manager.addDocument('id', 'bu %subjekDosen% sekarang dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana sekarang ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% ada dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana sekarang ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% posisinya dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% sekarang berada dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% sekarang posisinya dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% sekarang lokasinya dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana lokasinya ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana posisinya ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% sekarang ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% sekarang dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'lokasi bu %subjekDosen% dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'lokasi bu %subjekDosen% sekarang dimana ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'lokasi bu %subjekDosen% ?', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% sekarang dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana sekarang', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% ada dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana sekarang', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% posisinya dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% sekarang berada dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% sekarang posisinya dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% sekarang lokasinya dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana lokasinya', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'bu %subjekDosen% dimana posisinya', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% sekarang', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'posisi bu %subjekDosen% sekarang dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'lokasi bu %subjekDosen% dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'lokasi bu %subjekDosen% sekarang dimana', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'tolong carikan lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        manager.addDocument('id', 'carikan lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')

        // End Lokasi Dosen
        // ================

        // jadwal dosen
        // ============

        // general
        manager.addDocument('id', 'jadwal %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'carikan jadwal %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong carikan jadwal %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'carikan jadwal %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong carikan jadwal %subjekDosen% sekarang', 'cariJadwalDosenGeneral')

        manager.addDocument('id', 'jadwal %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'jadwal mengajar %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'carikan jadwal %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'tolong jadwal %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'jadwal %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'jadwal mengajar %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'tolong jadwal %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'tolong carikan jadwal %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')

        // bapak
        manager.addDocument('id', 'jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'jadwal mengajar pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'carikan jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'tolong jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'jadwal mengajar pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'tolong jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'tolong carikan jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'carikan jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'tolong jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'tolong jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        manager.addDocument('id', 'tolong carikan jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')

        manager.addDocument('id', 'jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        manager.addDocument('id', 'carikan jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        manager.addDocument('id', 'tolong jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        manager.addDocument('id', 'jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        manager.addDocument('id', 'tolong jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        manager.addDocument('id', 'tolong carikan jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')

        // ibu
        manager.addDocument('id', 'jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'jadwal mengajar bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'carikan jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'tolong jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'jadwal mengajar bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'tolong jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'tolong carikan jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'carikan jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'tolong jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'tolong jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        manager.addDocument('id', 'tolong carikan jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')

        manager.addDocument('id', 'jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        manager.addDocument('id', 'carikan jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        manager.addDocument('id', 'tolong jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        manager.addDocument('id', 'jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        manager.addDocument('id', 'tolong jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        manager.addDocument('id', 'tolong carikan jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')

        // End Jadwal Dosen
        // ================

        // Nomor WA / Telepon Dosen
        // ========================
        manager.addDocument('id', 'nomor %kataTelepon% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'nomor %kataTelepon% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'carikan nomor %kataTelepon% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'carikan nomor %kataTelepon% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa nomor %kataTelepon% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa nomor %kataTelepon% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa nomor %kataTelepon% %subjekDosen% ?', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa nomor %kataTelepon% %subjekDosen% ?', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        manager.addDocument('id', 'nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        manager.addDocument('id', 'carikan nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        manager.addDocument('id', 'carikan nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        manager.addDocument('id', 'berapa nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        manager.addDocument('id', 'berapa nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        manager.addDocument('id', 'berapa nomor %kataTelepon% pak %subjekDosen% ?', 'cariNomorDosenLaki')
        manager.addDocument('id', 'berapa nomor %kataTelepon% pak %subjekDosen% ?', 'cariNomorDosenLaki')
        manager.addDocument('id', 'nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        manager.addDocument('id', 'nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        manager.addDocument('id', 'carikan nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        manager.addDocument('id', 'carikan nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        manager.addDocument('id', 'berapa nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        manager.addDocument('id', 'berapa nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        manager.addDocument('id', 'berapa nomor %kataTelepon% bu %subjekDosen% ?', 'cariNomorDosenPerempuan')
        manager.addDocument('id', 'berapa nomor %kataTelepon% bu %subjekDosen% ?', 'cariNomorDosenPerempuan')

        // End Nomor WA / Telepon Dosen
        // ========================

        // Jadwal Kuliah
        // =============
        manager.addDocument('id','%kataJadwal% kuliah hari ini', 'cariJadwalKuliah')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah hari', 'cariJadwalKuliah')
        manager.addDocument('id','tolong %kataJadwal% kuliah hari', 'cariJadwalKuliah')
        manager.addDocument('id','carikan %kataJadwal% kuliah hari ini', 'cariJadwalKuliah')
        manager.addDocument('id','%kataJadwal% kuliah sekarang', 'cariJadwalKuliah')
        manager.addDocument('id','carikan %kataJadwal% kuliah sekarang', 'cariJadwalKuliah')
        manager.addDocument('id','tolong %kataJadwal% kuliah sekarang', 'cariJadwalKuliah')
        manager.addDocument('id','carikan %kataJadwal% kuliah sekarang', 'cariJadwalKuliah')

        manager.addDocument('id','%kataJadwal% kuliah hari %hari%','cariJadwalKuliahHari')
        manager.addDocument('id','carikan %kataJadwal% kuliah hari %hari%','cariJadwalKuliahHari')
        manager.addDocument('id','tolong %kataJadwal% kuliah hari %hari%','cariJadwalKuliahHari')
        manager.addDocument('id','carikan %kataJadwal% kuliah hari %hari%','cariJadwalKuliahHari')
        // End Jadwal Kuliah
        // =================

        // Jadwal Seminar TA
        // =================
        manager.addDocument('id','jadwal seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id','informasi seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id','tanggal seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id','kapan jadwal seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id','kapan pelaksanaan seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id','tanggal berapa jadwal seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id','kapan tanggal pelaksanaan seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id','pelaksanaan seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id','tanggal berapa seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'kapan seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'kapan seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'seminar %tugasAkhir% kapan ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'seminar %tugasAkhir% kapan', 'cariJadwalSeminarTA')

        // manager.addDocument('id', 'jadwal seminar %tugasAkhir% %nbi%', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'informasi seminar %tugasAkhir% %nbi%', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'tanggal seminar %tugasAkhir% %nbi%', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'kapan jadwal seminar %tugasAkhir% %nbi% ?', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'kapan pelaksanaan seminar %tugasAkhir% %nbi% ?', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'tanggal berapa jadwal seminar %tugasAkhir% %nbi% ?', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'kapan tanggal pelaksanaan seminar %tugasAkhir% %nbi% ?', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'pelaksanaan seminar %tugasAkhir% %nbi%', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'tanggal berapa seminar %tugasAkhir% %nbi%?', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'kapan seminar %tugasAkhir% %nbi% ?', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'kapan seminar %tugasAkhir% %nbi%', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'seminar %tugasAkhir% %nbi% kapan ?', 'cariJadwalSeminarTANbi')
        // manager.addDocument('id', 'seminar %tugasAkhir% %nbi% kapan', 'cariJadwalSeminarTANbi')

        manager.addDocument('id', 'jadwal seminar %tugasAkhir% nbi', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'informasi seminar %tugasAkhir% nbi', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'tanggal seminar %tugasAkhir% nbi', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan jadwal seminar %tugasAkhir% nbi ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan pelaksanaan seminar %tugasAkhir% nbi ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'tanggal berapa jadwal seminar %tugasAkhir% nbi ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan tanggal pelaksanaan seminar %tugasAkhir% nbi ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'pelaksanaan seminar %tugasAkhir% nbi', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'tanggal berapa seminar %tugasAkhir% nbi?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan seminar %tugasAkhir% nbi ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan seminar %tugasAkhir% nbi', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'seminar %tugasAkhir% nbi kapan ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'seminar %tugasAkhir% nbi kapan', 'cariJadwalSeminarTANbi')

        // End Jadwal Seminar TA
        // =====================

        // Ujian Seminar TA
        // ================
        manager.addDocument('id', 'jadwal ujian %tugasAkhir%', 'cariJadwalUjianTA')
        manager.addDocument('id', 'informasi ujian %tugasAkhir%', 'cariJadwalUjianTA')
        manager.addDocument('id', 'tanggal ujian %tugasAkhir%', 'cariJadwalUjianTA')
        manager.addDocument('id', 'kapan jadwal ujian %tugasAkhir% ?', 'cariJadwalUjianTA')
        manager.addDocument('id', 'kapan pelaksanaan ujian %tugasAkhir% ?', 'cariJadwalUjianTA')
        manager.addDocument('id', 'tanggal berapa jadwal ujian %tugasAkhir% ?', 'cariJadwalUjianTA')
        manager.addDocument('id', 'kapan tanggal pelaksanaan ujian %tugasAkhir% ?', 'cariJadwalUjianTA')
        manager.addDocument('id', 'pelaksanaan ujian %tugasAkhir%', 'cariJadwalUjianTA')
        manager.addDocument('id', 'tanggal berapa ujian %tugasAkhir% ?', 'cariJadwalUjianTA')
        manager.addDocument('id', 'kapan ujian %tugasAkhir% ?', 'cariJadwalUjianTA')
        manager.addDocument('id', 'kapan ujian %tugasAkhir%', 'cariJadwalUjianTA')
        manager.addDocument('id', 'ujian %tugasAkhir% kapan ?', 'cariJadwalUjianTA')
        manager.addDocument('id', 'ujian %tugasAkhir% kapan', 'cariJadwalUjianTA')

        manager.addDocument('id', 'jadwal ujian %tugasAkhir% %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'informasi ujian %tugasAkhir% %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'tanggal ujian %tugasAkhir% %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan jadwal ujian %tugasAkhir% %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan pelaksanaan ujian %tugasAkhir% %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'tanggal berapa jadwal ujian %tugasAkhir% %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan tanggal pelaksanaan ujian %tugasAkhir% %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'pelaksanaan ujian %tugasAkhir% %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'tanggal berapa ujian %tugasAkhir% %nbi%?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan ujian %tugasAkhir% %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan ujian %tugasAkhir% %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'ujian %tugasAkhir% %nbi% kapan ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'ujian %tugasAkhir% %nbi% kapan', 'cariJadwalUjianTANbi')

        manager.addDocument('id', 'jadwal ujian %tugasAkhir% nbi %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'informasi ujian %tugasAkhir% nbi %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'tanggal ujian %tugasAkhir% nbi %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan jadwal ujian %tugasAkhir% nbi %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan pelaksanaan ujian %tugasAkhir% nbi %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'tanggal berapa jadwal ujian %tugasAkhir% nbi %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan tanggal pelaksanaan ujian %tugasAkhir% nbi %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'pelaksanaan ujian %tugasAkhir% nbi %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'tanggal berapa ujian %tugasAkhir% nbi %nbi%?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan ujian %tugasAkhir% nbi %nbi% ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'kapan ujian %tugasAkhir% nbi %nbi%', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'ujian %tugasAkhir% nbi %nbi% kapan ?', 'cariJadwalUjianTANbi')
        manager.addDocument('id', 'ujian %tugasAkhir% nbi %nbi% kapan', 'cariJadwalUjianTANbi')

        // End Ujian Seminar TA
        // ====================


        // informasi lainnya
        manager.addDocument('id','informasi pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranTA')
        manager.addDocument('id','pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranTA')
        manager.addDocument('id','kapan pendaftaran seminar %tugasAkhir% ?', 'cariJadwalPendaftaranTA')
        manager.addDocument('id','tanggal berapa pendaftaran seminar %tugasAkhir% ?', 'cariJadwalPendaftaranTA')
        manager.addDocument('id','kapan tanggal pendaftaran seminar %tugasAkhir% ?', 'cariJadwalPendaftaranTA')
        manager.addDocument('id','tanggal berapa pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranTA')
        manager.addDocument('id','kapan tanggal pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranTA')

        // general questions
        // =================
        manager.addDocument('id', 'Selamat %kondisiSalam%', 'sapaanKabar')
        manager.addDocument('id', 'Hai, Apa Kabar ?', 'sapaanKabarTanya')
        manager.addDocument('id', 'Bagaimana kabarmu ?', 'sapaanKabarTanya')
        manager.addDocument('id', 'Gimana kabarmu ?', 'sapaanKabarTanya')
        manager.addDocument('id', 'Bagaimana kondisimu ?', 'sapaanKabarTanya')

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

        // jadwal dosen
        manager.addAnswer('id', 'cariJadwalDosenGeneral', 'jadwal {{subjekDosen}} adalah')
        manager.addAnswer('id', 'cariJadwalDosenGeneral', 'jadwal {{subjekDosen}} sekarang adalah')
        manager.addAnswer('id', 'cariJadwalDosenGeneral', '{{subjekDosen}} mengajar di ')
        manager.addAnswer('id', 'cariJadwalDosenGeneralHari', 'jadwal {{subjekDosen}} hari {{hari}} adalah')
        manager.addAnswer('id', 'cariJadwalDosenGeneralHari', 'hari {{hari}} {subjekDosen}} mengajar di ')

        manager.addAnswer('id', 'cariJadwalDosenLaki', 'jadwal pak {{subjekDosen}} adalah')
        manager.addAnswer('id', 'cariJadwalDosenLaki', 'jadwal pak {{subjekDosen}} sekarang adalah')
        manager.addAnswer('id', 'cariJadwalDosenLaki', 'pak {{subjekDosen}} mengajar di ')
        manager.addAnswer('id', 'cariJadwalDosenLakiHari', 'jadwal pak {{subjekDosen}} hari {{hari}} adalah')
        manager.addAnswer('id', 'cariJadwalDosenLakiHari', 'hari {{hari}} pak {subjekDosen}} mengajar di ')

        manager.addAnswer('id', 'cariJadwalDosenPerempuan', 'jadwal bu {{subjekDosen}} adalah')
        manager.addAnswer('id', 'cariJadwalDosenPerempuan', 'jadwal bu {{subjekDosen}} sekarang adalah')
        manager.addAnswer('id', 'cariJadwalDosenPerempuan', 'bu {{subjekDosen}} mengajar di ')
        manager.addAnswer('id', 'cariJadwalDosenPerempuanHari', 'jadwal bu {{subjekDosen}} hari {{hari}} adalah')
        manager.addAnswer('id', 'cariJadwalDosenPerempuanHari', 'hari {{hari}} bu {subjekDosen}} mengajar di ')

        // nomor telepon / WA dosen
        manager.addAnswer('id', 'cariNomorDosenGeneral', 'nomor {{kataTelepon}} {{subjekDosen}} adalah')
        manager.addAnswer('id', 'cariNomorDosenGeneral', '{{subjekDosen}} nomor {{kataTelepon}}nya adalah')
        manager.addAnswer('id', 'cariNomorDosenLaki', 'nomor {{kataTelepon}} pak {{subjekDosen}} adalah')
        manager.addAnswer('id', 'cariNomorDosenLaki', 'pak {{subjekDosen}} nomor {{kataTelepon}}nya adalah')
        manager.addAnswer('id', 'cariNomorDosenPerempuan', 'nomor {{kataTelepon}} bu {{subjekDosen}} adalah')
        manager.addAnswer('id', 'cariNomorDosenPerempuan', 'bu {subjekDosen}} nomor {{kataTelepon}}nya adalah')

        // jadwal kuliah
        manager.addAnswer('id', 'cariJadwalKuliah', 'Jadwal kuliah sekarang adalah')
        manager.addAnswer('id', 'cariJadwalKuliah', 'Jadwal kuliah hari ini adalah')
        manager.addAnswer('id', 'cariJadwalKuliah', 'kuliah sekarang adalah')
        manager.addAnswer('id', 'cariJadwalKuliah', 'Hari ini jadwal kuliahnya adalah')
        manager.addAnswer('id', 'cariJadwalKuliahHari', 'Jadwal kuliah hari {{hari}} adalah')
        manager.addAnswer('id', 'cariJadwalKuliahHari', 'kuliah hari {{hari}} adalah')
        manager.addAnswer('id', 'cariJadwalKuliahHari', 'Hari {{hari}} jadwal kuliahnya adalah')

        // jadwal seminar TA
        manager.addAnswer('id','cariJadwalSeminarTA','Jadwal Seminar {{tugasAkhir}} adalah')
        manager.addAnswer('id','cariJadwalSeminarTA','Seminar {{tugasAkhir}} dilaksanakan pada')
        manager.addAnswer('id','cariJadwalSeminarTA','Seminar {{tugasAkhir}} akan dilaksanakan pada')
        manager.addAnswer('id','cariJadwalSeminarTA','Seminar {{tugasAkhir}} dijadwalkan pada')

        manager.addAnswer('id', 'cariJadwalSeminarTANbi', 'Jadwal Seminar {{tugasAkhir}} NBI {{nbi}} adalah')
        manager.addAnswer('id', 'cariJadwalSeminarTANbi', 'Seminar {{tugasAkhir}}  NBI {{nbi}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSeminarTANbi', 'Seminar {{tugasAkhir}}  NBI {{nbi}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSeminarTANbi', 'Seminar {{tugasAkhir}}  NBI {{nbi}} dijadwalkan pada')

        // ujian seminar TA
        manager.addAnswer('id', 'cariJadwalUjianTA', 'Jadwal Ujian {{tugasAkhir}} adalah')
        manager.addAnswer('id', 'cariJadwalUjianTA', 'Ujian {{tugasAkhir}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalUjianTA', 'Ujian {{tugasAkhir}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalUjianTA', 'Ujian {{tugasAkhir}} dijadwalkan pada')

        manager.addAnswer('id', 'cariJadwalUjianTANbi', 'Jadwal Ujian {{tugasAkhir}} NBI {{nbi}} adalah')
        manager.addAnswer('id', 'cariJadwalUjianTANbi', 'Ujian {{tugasAkhir}} NBI {{nbi}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalUjianTANbi', 'Ujian {{tugasAkhir}} NBI {{nbi}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalUjianTANbi', 'Ujian {{tugasAkhir}} NBI {{nbi}} dijadwalkan pada')


        // Informasi Lainnya
        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Seminar {{tugasAkhir}} pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Seminar {{tugasAkhir}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Seminar {{tugasAkhir}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Seminar {{tugasAkhir}} dijadwalkan pada')

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
