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
        manager.addNamedEntityText('kerjaPraktek', 'Kerja Praktek', ['id'], ['KP', 'kp', 'kerja praktek', 'Kerja Praktek'])
        manager.addRegexEntity('nbi', 'id', /(?<=\s|^)\d{10}|(?<=\s|^)\d{9}/g)
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
        manager.addNamedEntityText('namaPraktikum', 'Dasar Komputer dan Internet', ['id'], ['daskom', 'dasar komputer', 'dasar komputer internet'])
        manager.addNamedEntityText('namaPraktikum', 'Pengembangan Teknologi Website', ['id'], ['PTW', 'web', 'pengembangan teknologi website', 'ptw'])
        manager.addNamedEntityText('namaPraktikum', 'Pengembangan Teknologi Mobile', ['id'], ['PTM', 'android', 'ptm', 'teknologi mobile'])
        manager.addNamedEntityText('namaPraktikum', 'Pemrograman Dasar', ['id'], ['progdas', 'program dasar'])
        manager.addNamedEntityText('namaPraktikum', 'Komputer Aplikasi', ['id'], ['Komputer Aplikasi', 'kompapp'])
        manager.addNamedEntityText('namaPraktikum', 'Pemrograman Lanjut', ['id'], ['proglan', 'java', 'pbo', 'pemrograman lanjut'])
        manager.addNamedEntityText('namaPraktikum', 'Pemrograman Web', ['id'], ['progweb', 'Pemrograman Web'])
        manager.addNamedEntityText('namaPraktikum', 'Sistem Operasi', ['id'], ['SO', 'sistem operasi', 'OS'])
        manager.addNamedEntityText('namaPraktikum', 'Manajemen Data dan Informasi', ['id'], ['mandatin', 'database', 'manajemen data dan informasi'])
        manager.addNamedEntityText('namaPraktikum', 'Manajemen Jaringan Komputer', ['id'], ['manjarkom', 'mjk', 'manajemen jarkom'])
        manager.addNamedEntityText('namaPraktikum', 'Sistem Jaringan Komputer', ['id'], ['sistem jarkom', 'sjk'])
        manager.addNamedEntityText('namaPraktikum', 'Rangkaian Logika', ['id'], ['rl', 'RL', 'rangkaian logika'])
        manager.addNamedEntityText('namaPraktikum', 'Mikroprosessor', ['id'], ['mikro', 'hardware'])
        manager.addNamedEntityText('namaPraktikum', 'Sistem Digital', ['id'], ['sisdig', 'sistem digital'])
        manager.addNamedEntityText('namaPraktikum', 'Komputer Grafik dan Visualisasi Data', ['id'], ['kompgraf', 'komputer grafik'])
        manager.addNamedEntityText('namaPraktikum', 'Pengolahan Citra Digital', ['id'], ['KCBV', 'PCD', 'pengolahan citra'])

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
        manager.addDocument('id', 'dimana %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana %subjekDosen% sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana %subjekDosen% sekarang ?', 'cariLokasiDosenGeneral')

        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% ada dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% lokasinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% lokasinya dimana sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% posisinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang berada dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang posisinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang lokasinya dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana lokasinya', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana posisinya', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% sekarang dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekGender% %subjekDosen% dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekGender% %subjekDosen% sekarang dimana', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% ada dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% lokasinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% lokasinya dimana sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% posisinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang berada dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang posisinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% sekarang lokasinya dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana lokasinya ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', '%subjekGender% %subjekDosen% dimana posisinya ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% sekarang ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'posisi %subjekGender% %subjekDosen% sekarang dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekGender% %subjekDosen% dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekGender% %subjekDosen% sekarang dimana ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'lokasi %subjekGender% %subjekDosen% ?', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana %subjekGender% %subjekDosen%', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana %subjekGender% %subjekDosen% sekarang', 'cariLokasiDosenGeneral')
        manager.addDocument('id', 'dimana %subjekGender% %subjekDosen% sekarang ?', 'cariLokasiDosenGeneral')

        // Bapak
        // manager.addDocument('id', 'pak %subjekDosen% sekarang dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana sekarang ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% ada dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana sekarang ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% posisinya dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% sekarang berada dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% sekarang posisinya dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% sekarang lokasinya dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana lokasinya ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana posisinya ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen% ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen% sekarang ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen% dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen% sekarang dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'lokasi pak %subjekDosen% dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'lokasi pak %subjekDosen% sekarang dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'lokasi pak %subjekDosen% ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% sekarang dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana sekarang', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% ada dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% lokasinya dimana sekarang', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% posisinya dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% sekarang berada dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% sekarang posisinya dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% sekarang lokasinya dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana lokasinya', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'pak %subjekDosen% dimana posisinya', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen%', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen% sekarang', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen% dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'posisi pak %subjekDosen% sekarang dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'lokasi pak %subjekDosen% dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'lokasi pak %subjekDosen% sekarang dimana', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'tolong carikan lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'carikan lokasi pak %subjekDosen%', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'dimana pak %subjekDosen%', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'dimana pak %subjekDosen% sekarang ?', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'dimana pak %subjekDosen% sekarang', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'dimanakah pak %subjekDosen%', 'cariLokasiDosenLaki')
        // manager.addDocument('id', 'sekarang pak %subjekDosen% dimana', 'cariLokasiDosenLaki')

        // // Ibu
        // manager.addDocument('id', 'bu %subjekDosen% sekarang dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% dimana sekarang ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% ada dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana sekarang ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% posisinya dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% sekarang berada dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% sekarang posisinya dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% sekarang lokasinya dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% dimana lokasinya ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% dimana posisinya ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen% ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen% sekarang ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen% dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen% sekarang dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'lokasi bu %subjekDosen% dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'lokasi bu %subjekDosen% sekarang dimana ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'lokasi bu %subjekDosen% ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% sekarang dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% dimana sekarang', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% ada dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% lokasinya dimana sekarang', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% posisinya dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% sekarang berada dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% sekarang posisinya dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% sekarang lokasinya dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'bu %subjekDosen% dimana lokasinya', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen% sekarang', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen% dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'posisi bu %subjekDosen% sekarang dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'lokasi bu %subjekDosen% dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'lokasi bu %subjekDosen% sekarang dimana', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'tolong carikan lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'carikan lokasi bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'dimana bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'dimana bu %subjekDosen% sekarang ?', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'dimana bu %subjekDosen% sekarang', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'dimanakah bu %subjekDosen%', 'cariLokasiDosenPerempuan')
        // manager.addDocument('id', 'sekarang bu %subjekDosen% dimana', 'cariLokasiDosenPerempuan')

        // End Lokasi Dosen
        // ================

        // jadwal dosen
        // ============

        // general
        manager.addDocument('id', 'jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'carikan jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong carikan jadwal %subjekGender% %subjekDosen%', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'carikan jadwal %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'jadwal mengajar %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong jadwal %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')
        manager.addDocument('id', 'tolong carikan jadwal %subjekGender% %subjekDosen% sekarang', 'cariJadwalDosenGeneral')

        manager.addDocument('id', 'jadwal %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'jadwal mengajar %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'carikan jadwal %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'tolong jadwal %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'jadwal %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'jadwal mengajar %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'tolong jadwal %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')
        manager.addDocument('id', 'tolong carikan jadwal %subjekGender% %subjekDosen% hari %hari%', 'cariJadwalDosenGeneralHari')

        // bapak
        // manager.addDocument('id', 'jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'jadwal mengajar pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'carikan jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'tolong jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'jadwal mengajar pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'tolong jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'tolong carikan jadwal pak %subjekDosen%', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'carikan jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'tolong jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'tolong jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')
        // manager.addDocument('id', 'tolong carikan jadwal pak %subjekDosen% sekarang', 'cariJadwalDosenLaki')

        // manager.addDocument('id', 'jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        // manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        // manager.addDocument('id', 'carikan jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        // manager.addDocument('id', 'tolong jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        // manager.addDocument('id', 'jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        // manager.addDocument('id', 'jadwal mengajar pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        // manager.addDocument('id', 'tolong jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')
        // manager.addDocument('id', 'tolong carikan jadwal pak %subjekDosen% hari %hari%', 'cariJadwalDosenLakiHari')

        // ibu
        // manager.addDocument('id', 'jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'jadwal mengajar bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'carikan jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'tolong jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'jadwal mengajar bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'tolong jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'tolong carikan jadwal bu %subjekDosen%', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'carikan jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'tolong jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'tolong jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')
        // manager.addDocument('id', 'tolong carikan jadwal bu %subjekDosen% sekarang', 'cariJadwalDosenPerempuan')

        // manager.addDocument('id', 'jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        // manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        // manager.addDocument('id', 'carikan jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        // manager.addDocument('id', 'tolong jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        // manager.addDocument('id', 'jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        // manager.addDocument('id', 'jadwal mengajar bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        // manager.addDocument('id', 'tolong jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')
        // manager.addDocument('id', 'tolong carikan jadwal bu %subjekDosen% hari %hari%', 'cariJadwalDosenPerempuanHari')

        // End Jadwal Dosen
        // ================

        // Nomor WA / Telepon Dosen
        // ========================
        manager.addDocument('id', 'nomor %kataTelepon% %subjekGender% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', '%kataTelepon% %subjekGender% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'carikan nomor %kataTelepon% %subjekGender% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'carikan %kataTelepon% %subjekGender% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa nomor %kataTelepon% %subjekGender% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa %kataTelepon% %subjekGender% %subjekDosen%', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa nomor %kataTelepon% %subjekGender% %subjekDosen% ?', 'cariNomorDosenGeneral')
        manager.addDocument('id', 'berapa %kataTelepon% %subjekGender% %subjekDosen% ?', 'cariNomorDosenGeneral')

        // manager.addDocument('id', 'nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        // manager.addDocument('id', '%kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        // manager.addDocument('id', 'carikan nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        // manager.addDocument('id', 'carikan %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        // manager.addDocument('id', 'berapa nomor %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        // manager.addDocument('id', 'berapa %kataTelepon% pak %subjekDosen%', 'cariNomorDosenLaki')
        // manager.addDocument('id', 'berapa nomor %kataTelepon% pak %subjekDosen% ?', 'cariNomorDosenLaki')
        // manager.addDocument('id', 'berapa %kataTelepon% pak %subjekDosen% ?', 'cariNomorDosenLaki')

        // manager.addDocument('id', 'nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        // manager.addDocument('id', '%kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        // manager.addDocument('id', 'carikan nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        // manager.addDocument('id', 'carikan %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        // manager.addDocument('id', 'berapa nomor %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        // manager.addDocument('id', 'berapa %kataTelepon% bu %subjekDosen%', 'cariNomorDosenPerempuan')
        // manager.addDocument('id', 'berapa nomor %kataTelepon% bu %subjekDosen% ?', 'cariNomorDosenPerempuan')
        // manager.addDocument('id', 'berapa %kataTelepon% bu %subjekDosen% ?', 'cariNomorDosenPerempuan')

        // End Nomor WA / Telepon Dosen
        // ========================

        // Jadwal Kuliah
        // =============
        manager.addDocument('id', '%kataJadwal% kuliah hari ini', 'cariJadwalKuliah')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah hari', 'cariJadwalKuliah')
        manager.addDocument('id', 'tolong %kataJadwal% kuliah hari', 'cariJadwalKuliah')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah hari ini', 'cariJadwalKuliah')
        manager.addDocument('id', '%kataJadwal% kuliah sekarang', 'cariJadwalKuliah')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah sekarang', 'cariJadwalKuliah')
        manager.addDocument('id', 'tolong %kataJadwal% kuliah sekarang', 'cariJadwalKuliah')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah sekarang', 'cariJadwalKuliah')

        manager.addDocument('id', '%kataJadwal% kuliah nbi %nbi% hari ini', 'cariJadwalKuliahNbi')
        manager.addDocument('id', 'carikan %kataJadwal% nbi %nbi% kuliah hari', 'cariJadwalKuliahNbi')
        manager.addDocument('id', 'tolong %kataJadwal% nbi %nbi% kuliah hari', 'cariJadwalKuliahNbi')
        manager.addDocument('id', 'carikan %kataJadwal% nbi %nbi% kuliah hari ini', 'cariJadwalKuliahNbi')
        manager.addDocument('id', '%kataJadwal% kuliah nbi %nbi% sekarang', 'cariJadwalKuliahNbi')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah nbi %nbi% sekarang', 'cariJadwalKuliahNbi')
        manager.addDocument('id', 'tolong %kataJadwal% kuliah nbi %nbi% sekarang', 'cariJadwalKuliahNbi')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah nbi %nbi% sekarang', 'cariJadwalKuliahNbi')

        manager.addDocument('id', '%kataJadwal% kuliah hari %hari%', 'cariJadwalKuliahHari')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah hari %hari%', 'cariJadwalKuliahHari')
        manager.addDocument('id', 'tolong %kataJadwal% kuliah hari %hari%', 'cariJadwalKuliahHari')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah hari %hari%', 'cariJadwalKuliahHari')

        manager.addDocument('id', '%kataJadwal% kuliah hari %hari% nbi %nbi%', 'cariJadwalKuliahHariNbi')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah hari %hari% nbi %nbi%', 'cariJadwalKuliahHariNbi')
        manager.addDocument('id', 'tolong %kataJadwal% kuliah hari %hari% nbi %nbi%', 'cariJadwalKuliahHariNbi')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah hari %hari% nbi %nbi%', 'cariJadwalKuliahHariNbi')
        manager.addDocument('id', '%kataJadwal% kuliah nbi %nbi% hari %hari% ', 'cariJadwalKuliahHariNbi')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah nbi %nbi% hari %hari%', 'cariJadwalKuliahHariNbi')
        manager.addDocument('id', 'tolong %kataJadwal% kuliah nbi %nbi% hari %hari%', 'cariJadwalKuliahHariNbi')
        manager.addDocument('id', 'carikan %kataJadwal% kuliah nbi %nbi% hari %hari%', 'cariJadwalKuliahHariNbi')
        // End Jadwal Kuliah
        // =================

        // Jadwal Seminar TA
        // =================
        manager.addDocument('id', 'jadwal seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'informasi seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'tanggal seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'kapan jadwal seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'kapan pelaksanaan seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'tanggal berapa jadwal seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'kapan tanggal pelaksanaan seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'pelaksanaan seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'tanggal berapa seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'kapan seminar %tugasAkhir% ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'kapan seminar %tugasAkhir%', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'seminar %tugasAkhir% kapan ?', 'cariJadwalSeminarTA')
        manager.addDocument('id', 'seminar %tugasAkhir% kapan', 'cariJadwalSeminarTA')

        manager.addDocument('id', 'jadwal seminar %tugasAkhir% nbi %nbi%', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'informasi seminar %tugasAkhir% nbi %nbi%', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'tanggal seminar %tugasAkhir% nbi %nbi%', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan jadwal seminar %tugasAkhir% nbi %nbi% ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan pelaksanaan seminar %tugasAkhir% nbi %nbi% ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'tanggal berapa jadwal seminar %tugasAkhir% nbi %nbi% ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan tanggal pelaksanaan seminar %tugasAkhir% nbi %nbi% ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'pelaksanaan seminar %tugasAkhir% nbi %nbi%', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'tanggal berapa seminar %tugasAkhir% nbi %nbi%?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan seminar %tugasAkhir% nbi %nbi% ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'kapan seminar %tugasAkhir% nbi %nbi%', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'seminar %tugasAkhir% nbi %nbi% kapan ?', 'cariJadwalSeminarTANbi')
        manager.addDocument('id', 'seminar %tugasAkhir% nbi %nbi% kapan', 'cariJadwalSeminarTANbi')

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

        // Jadwal Kerja Praktek
        // =================
        manager.addDocument('id', 'jadwal sidang %kerjaPraktek%', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'informasi sidang %kerjaPraktek%', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'tanggal sidang %kerjaPraktek%', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'kapan jadwal sidang %kerjaPraktek% ?', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'kapan pelaksanaan sidang %kerjaPraktek% ?', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'tanggal berapa jadwal sidang %kerjaPraktek% ?', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'kapan tanggal pelaksanaan sidang %kerjaPraktek% ?', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'pelaksanaan sidang %kerjaPraktek%', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'tanggal berapa sidang %kerjaPraktek% ?', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'kapan sidang %kerjaPraktek% ?', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'kapan sidang %kerjaPraktek%', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'sidang %kerjaPraktek% kapan ?', 'cariJadwalSidangKerjaPraktek')
        manager.addDocument('id', 'sidang %kerjaPraktek% kapan', 'cariJadwalSidangKerjaPraktek')

        manager.addDocument('id', 'jadwal sidang %kerjaPraktek% nbi %nbi%', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'informasi sidang %kerjaPraktek% nbi %nbi%', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'tanggal sidang %kerjaPraktek% nbi %nbi%', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'kapan jadwal sidang %kerjaPraktek% nbi %nbi% ?', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'kapan pelaksanaan sidang %kerjaPraktek% nbi %nbi% ?', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'tanggal berapa jadwal sidang %kerjaPraktek% nbi %nbi% ?', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'kapan tanggal pelaksanaan sidang %kerjaPraktek% nbi %nbi% ?', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'pelaksanaan sidang %kerjaPraktek% nbi %nbi%', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'tanggal berapa sidang %kerjaPraktek% nbi %nbi% ?', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'kapan sidang %kerjaPraktek% nbi %nbi% ?', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'kapan sidang %kerjaPraktek% nbi %nbi%', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'sidang %kerjaPraktek% kapan nbi %nbi% ?', 'cariJadwalSidangKerjaPraktekNbi')
        manager.addDocument('id', 'sidang %kerjaPraktek% kapan nbi %nbi%', 'cariJadwalSidangKerjaPraktekNbi')

        // jadwal praktikum nama
        manager.addDocument('id', 'jadwal praktikum %namaPraktikum%', 'cariPraktikumNama')
        manager.addDocument('id', 'jadwal praktikum %namaPraktikum% hari ini', 'cariPraktikumNama')
        manager.addDocument('id', 'jadwal praktikum %namaPraktikum% sekarang', 'cariPraktikumNama')
        manager.addDocument('id', 'tolong jadwal praktikum %namaPraktikum% sekarang', 'cariPraktikumNama')

        // jadwal praktikum hari
        manager.addDocument('id', 'jadwal praktikum hari %hari%', 'cariPraktikumHari')
        manager.addDocument('id', 'carikan jadwal praktikum hari %hari%', 'cariPraktikumHari')
        manager.addDocument('id', 'jadwal praktikum %hari%', 'cariPraktikumHari')
        manager.addDocument('id', 'carikan jadwal praktikum %hari%', 'cariPraktikumHari')

        // jadwal praktikum sekarang
        manager.addDocument('id', 'jadwal praktikum hari ini', 'cariPraktikum')
        manager.addDocument('id', 'carikan jadwal praktikum hari', 'cariPraktikum')

        manager.addDocument('id', 'nilai praktikum nbi {{nbi}}', 'cariNilaiPraktikum')
        manager.addDocument('id', 'nilai praktikum {{nbi}}', 'cariNilaiPraktikum')
        manager.addDocument('id', 'carikan nilai praktikum nbi {{nbi}}', 'cariNilaiPraktikum')
        manager.addDocument('id', 'carikan nilai praktikum {{nbi}}', 'cariNilaiPraktikum')
        manager.addDocument('id', 'nilai praktikum {{praktikum}} nbi {{nbi}}', 'cariNilaiPraktikumNama')
        manager.addDocument('id', 'nilai praktikum {{praktikum}} {{nbi}}', 'cariNilaiPraktikumNama')
        manager.addDocument('id', 'carikan nilai praktikum {{praktikum}} nbi {{nbi}}', 'cariNilaiPraktikumNama')
        manager.addDocument('id', 'carikan nilai praktikum {{praktikum}} {{nbi}}', 'cariNilaiPraktikumNama')

        // informasi lainnya
        manager.addDocument('id', 'informasi pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranSeminarTA')
        manager.addDocument('id', 'pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranSeminarTA')
        manager.addDocument('id', 'kapan pendaftaran seminar %tugasAkhir% ?', 'cariJadwalPendaftaranSeminarTA')
        manager.addDocument('id', 'tanggal berapa pendaftaran seminar %tugasAkhir% ?', 'cariJadwalPendaftaranSeminarTA')
        manager.addDocument('id', 'kapan tanggal pendaftaran seminar %tugasAkhir% ?', 'cariJadwalPendaftaranSeminarTA')
        manager.addDocument('id', 'tanggal berapa pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranSeminarTA')
        manager.addDocument('id', 'kapan tanggal pendaftaran seminar %tugasAkhir%', 'cariJadwalPendaftaranSeminarTA')

        manager.addDocument('id', 'informasi pendaftaran ujian %tugasAkhir%', 'cariJadwalPendaftaranUjianTA')
        manager.addDocument('id', 'pendaftaran ujian %tugasAkhir%', 'cariJadwalPendaftaranUjianTA')
        manager.addDocument('id', 'kapan pendaftaran ujian %tugasAkhir% ?', 'cariJadwalPendaftaranUjianTA')
        manager.addDocument('id', 'tanggal berapa pendaftaran ujian %tugasAkhir% ?', 'cariJadwalPendaftaranUjianTA')
        manager.addDocument('id', 'kapan tanggal pendaftaran ujian %tugasAkhir% ?', 'cariJadwalPendaftaranUjianTA')
        manager.addDocument('id', 'tanggal berapa pendaftaran ujian %tugasAkhir%', 'cariJadwalPendaftaranUjianTA')
        manager.addDocument('id', 'kapan tanggal pendaftaran ujian %tugasAkhir%', 'cariJadwalPendaftaranUjianTA')

        manager.addDocument('id', 'informasi pendaftaran %kerjaPraktek%', 'cariJadwalPendaftaranKerjaPraktek')
        manager.addDocument('id', 'pendaftaran %kerjaPraktek%', 'cariJadwalPendaftaranKerjaPraktek')
        manager.addDocument('id', 'kapan pendaftaran %kerjaPraktek% ?', 'cariJadwalPendaftaranKerjaPraktek')
        manager.addDocument('id', 'tanggal berapa pendaftaran %kerjaPraktek% ?', 'cariJadwalPendaftaranKerjaPraktek')
        manager.addDocument('id', 'kapan tanggal pendaftaran %kerjaPraktek% ?', 'cariJadwalPendaftaranKerjaPraktek')
        manager.addDocument('id', 'tanggal berapa pendaftaran %kerjaPraktek%', 'cariJadwalPendaftaranKerjaPraktek')
        manager.addDocument('id', 'kapan tanggal pendaftaran %kerjaPraktek%', 'cariJadwalPendaftaranKerjaPraktek')


        manager.addDocument('id', 'syarat pendaftaran %tugasAkhir%', 'cariSyaratTA')
        manager.addDocument('id', 'apa saja syarat pendaftaran %tugasAkhir%?', 'cariSyaratTA')
        manager.addDocument('id', 'pendaftaran %tugasAkhir% syaratnya', 'cariSyaratTA')
        manager.addDocument('id', 'prosedur pendaftaran %tugasAkhir%', 'cariProsedurTA')
        manager.addDocument('id', 'Bagaimana prosedur pendaftaran %tugasAkhir%', 'cariProsedurTA')

        manager.addDocument('id', 'syarat pendaftaran %kerjaPraktek%', 'cariSyaratKerjaPraktek')
        manager.addDocument('id', 'apa saja syarat pendaftaran %kerjaPraktek%?', 'cariSyaratKerjaPraktek')
        manager.addDocument('id', 'pendaftaran %kerjaPraktek% syaratnya', 'cariSyaratKerjaPraktek')
        manager.addDocument('id', 'prosedur pendaftaran %kerjaPraktek', 'cariProsedurKerjaPraktek')
        manager.addDocument('id', 'Bagaimana prosedur pendafran %kerjaPraktek', 'cariProsedurKerjaPraktek')

        manager.addDocument('id', 'syarat pendaftaran yudisium', 'cariSyaratYudisium')
        manager.addDocument('id', 'apa saja syarat pendaftaran yudisium?', 'cariSyaratYudisium')
        manager.addDocument('id', 'pendaftaran yudisium syaratnya', 'cariSyaratYudisium')

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
        manager.addAnswer('id', 'cariJadwalKuliahNbi', 'Jadwal kuliah nbi {{nbi}} adalah')
        manager.addAnswer('id', 'cariJadwalKuliahNbi', 'kuliah nbi {{nbi}} adalah')
        manager.addAnswer('id', 'cariJadwalKuliahNbi', 'nbi{{nbi}} jadwal kuliahnya adalah')
        manager.addAnswer('id', 'cariJadwalKuliahHariNbi', 'Jadwal kuliah nbi {{nbi}} hari {{hari}} adalah')
        manager.addAnswer('id', 'cariJadwalKuliahHariNbi', 'kuliah nbi {{nbi}} hari {{hari}} adalah')
        manager.addAnswer('id', 'cariJadwalKuliahHariNbi', 'nbi{{nbi}} jadwal kuliahnya hari {{hari}} adalah')

        // jadwal seminar TA
        manager.addAnswer('id', 'cariJadwalSeminarTA', 'Jadwal Seminar {{tugasAkhir}} adalah')
        manager.addAnswer('id', 'cariJadwalSeminarTA', 'Seminar {{tugasAkhir}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSeminarTA', 'Seminar {{tugasAkhir}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSeminarTA', 'Seminar {{tugasAkhir}} dijadwalkan pada')

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

        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktek', 'Jadwal Sidang {{kerjaPraktek}} adalah')
        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktek', 'Sidang {{kerjaPraktek}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktek', 'Sidang {{kerjaPraktek}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktek', 'Sidang {{kerjaPraktek}} dijadwalkan pada')

        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktekNbi', 'Jadwal Sidang {{kerjaPraktek}} nbi {{nbi}} adalah')
        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktekNbi', 'Sidang {{kerjaPraktek}} nbi {{nbi}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktekNbi', 'Sidang {{kerjaPraktek}} nbi {{nbi}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalSidangKerjaPraktekNbi', 'Sidang {{kerjaPraktek}} nbi {{nbi}} dijadwalkan pada')

        manager.addAnswer('id', 'cariPraktikumNama', 'Praktikum {{namaPraktikum}} jadwalnya adalah')
        manager.addAnswer('id', 'cariPraktikumNama', 'Jadwal Praktikum {{namaPraktikum}} adalah')
        manager.addAnswer('id', 'cariPraktikum', 'Praktikum hari ini adalah')
        manager.addAnswer('id', 'cariPraktikum', 'Jadwal Praktikum hari ini adalah')
        manager.addAnswer('id', 'cariPraktikumHari', 'Praktikum hari {{hari}} adalah')
        manager.addAnswer('id', 'cariPraktikumHari', 'Jadwal Praktikum hari {{hari}} adalah')
        manager.addAnswer('id', 'cariNilaiPraktikum', 'Nilai praktikum nbi {{nbi}} adalah')
        manager.addAnswer('id', 'cariNilaiPraktikum', 'Nilai praktikum {{nbi}} adalah')
        manager.addAnswer('id', 'cariNilaiPraktikumNama', 'Nilai praktikum {{praktikum}} nbi {{nbi}} adalah')
        manager.addAnswer('id', 'cariNilaiPraktikumNama', 'Nilai praktikum {{praktikum}} {{nbi}} adalah')
        manager.addAnswer('id', 'cariNilaiPraktikumNama', 'praktikum {{praktikum}} {{nbi}} nilainya')

        // Informasi Lainnya
        manager.addAnswer('id', 'cariJadwalPendaftaranSeminarTA', 'Pendaftaran Seminar {{tugasAkhir}} pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranSeminarTA', 'Pendaftaran Seminar {{tugasAkhir}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranSeminarTA', 'Pendaftaran Seminar {{tugasAkhir}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranSeminarTA', 'Pendaftaran Seminar {{tugasAkhir}} dijadwalkan pada')

        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Ujian {{tugasAkhir}} pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Ujian {{tugasAkhir}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Ujian {{tugasAkhir}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranTA', 'Pendaftaran Ujian {{tugasAkhir}} dijadwalkan pada')

        manager.addAnswer('id', 'cariJadwalPendaftaranKerjaPraktek', 'Pendaftaran Sidang {{kerjaPraktek}} pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranKerjaPraktek', 'Pendaftaran Sidang {{kerjaPraktek}} dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranKerjaPraktek', 'Pendaftaran Sidang {{kerjaPraktek}} akan dilaksanakan pada')
        manager.addAnswer('id', 'cariJadwalPendaftaranKerjaPraktek', 'Pendaftaran Sidang {{kerjaPraktek}} dijadwalkan pada')

        manager.addAnswer('id', 'cariSyaratKerjaPraktek', 'Syarat pendaftaran {{kerjaPraktek}} adalah')
        manager.addAnswer('id', 'cariSyaratKerjaPraktek', 'Syarat untuk mengikuti {{kerjaPraktek}} yaitu')
        manager.addAnswer('id', 'cariSyaratKerjaPraktek', 'Prosedur {{kerjaPraktek}} adalah')
        manager.addAnswer('id', 'cariSyaratKerjaPraktek', 'Tata cara mengikuti {{kerjaPraktek}} adalah')

        manager.addAnswer('id', 'cariSyaratTA', 'Syarat pendaftaran {{tugasAkhir}} adalah')
        manager.addAnswer('id', 'cariSyaratTA', 'Syarat untuk mengikuti {{tugasAkhir}} yaitu')
        manager.addAnswer('id', 'cariSyaratTA', 'Prosedur {{tugasAkhir}} adalah')
        manager.addAnswer('id', 'cariSyaratTA', 'Tata cara mengikuti {{tugasAkhir}} adalah')

        manager.addAnswer('id', 'cariSyaratYudisium', 'Syarat pendaftaran yudisium adalah')
        manager.addAnswer('id', 'cariSyaratYudisium', 'Syarat untuk mengikuti yudisium yaitu')
        manager.addAnswer('id', 'cariSyaratYudisium', 'Proseduryudisium adalah')
        manager.addAnswer('id', 'cariSyaratYudisium', 'Tata cara mengikuti yudisium adalah')

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
