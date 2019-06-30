'use strict'
const {
  NlpManager,
  ConversationContext
} = use('node-nlp')

const {
  validate
} =  use('Validator')
class TrainingController {

  /**
   * Training data
   * @method POST
   * @param {request} request
   * @param {response} response
   */
  async index ({
    request,
    response
  }) {

    const req = request.all()
    const rules = {
      name: 'required',
      password: 'required'
    }

    const validation = await validate({
      name : req.name,
      password: req.password
    }, rules)
    if(!validation.fails()){

      if(req.name === 'erick' && req.password === 'erick'){
        const manager = new NlpManager({
          languages: ['id']
        })
        // entitity
        manager.addNamedEntityText('kondisi.salam', 'Pagi', ['id'], ['pagi', 'Pagi'])
        manager.addNamedEntityText('kondisi.salam', 'Siang', ['id'], ['siang', 'Siang'])
        manager.addNamedEntityText('kondisi.salam', 'Malam', ['id'], ['malam', 'Malam'])
        manager.addNamedEntityText('kondisi.netral', 'Alhamdulillah', ['id'], ['alhamdulillah', 'Alhamdulillah'])
        manager.addNamedEntityText('kondisi.netral', 'Semangat', ['id'], ['semangat', 'Semangat'])
        manager.addNamedEntityText('kondisi.baik', 'Baik', ['id'], ['baik', 'Baik'])
        manager.addNamedEntityText('kondisi.buruk', 'Buruk', ['id'], ['buruk', 'Buruk'])
        manager.addNamedEntityText('kondisi.buruk', 'Sedih', ['id'], ['sedih', 'Sedih'])
        manager.addNamedEntityText('kondisi.buruk', 'Gawat', ['id'], ['Gawat', 'gawat'])
        manager.addNamedEntityText('hari', 'Senin', ['id'], ['Senin', 'senin'])
        manager.addNamedEntityText('hari', 'Selasa', ['id'], ['Selasa', 'selasa'])
        manager.addNamedEntityText('hari', 'Rabu', ['id'], ['Rabu', 'rabu'])
        manager.addNamedEntityText('hari', 'Kamis', ['id'], ['Kamis', 'kamis'])
        manager.addNamedEntityText('hari', 'Jumat', ['id'], ['Jumat', 'jumat'])
        manager.addNamedEntityText('hari', 'Sabtu', ['id'], ['Sabtu', 'sabtu'])
        manager.addNamedEntityText('hari', 'Minggu', ['id'], ['Minggu', 'minggu'])
        manager.addNamedEntityText('kata.kerja', 'Cari', ['id'], ['Carikan', 'carikan', 'Cari', 'cari'])
        manager.addNamedEntityText('kata.kerja', 'Lihat', ['id'], ['Lihatkan', 'lihatkan', 'lihat', 'Lihat'])
        manager.addNamedEntityText('kata.nomina', 'Jadwal', ['id'], ['Jadwal', 'jadwal', 'jdwl', 'jadual', 'Jadual', 'Jdwl'])
        manager.addNamedEntityText('kata.nomina', 'Dosen', ['id'], ['Dosen', 'dosen', 'dsn', 'dosn'])
        manager.addNamedEntityText('kata.nomina', 'Lokasi', ['id'], ['Lokasi', 'lokasi', 'lksi'])
        manager.addNamedEntityText('subjek.gender', 'Bapak',['id'], ['Pak', 'Bapak', 'pak', 'bapak'])
        manager.addNamedEntityText('subjek.gender', 'Ibu', ['id'], ['Buk', 'buk', 'Ibu', 'ibu', 'bu', 'Bu'])
        manager.addNamedEntityText('subjek.dosen', 'Ahmad Habib, S.Kom., M.M.', ['id'], ['Habib', 'Ahmad Habib', 'habib', 'ahmad habib'])
        manager.addNamedEntityText('subjek.dosen', 'Supangat, S.Kom., M.MKom.', ['id'], ['Supangat', 'Pangat', 'supangat', 'pangat'])
        manager.addNamedEntityText('subjek.dosen', 'Fridy Mandita, S.Kom., M.Sc.', ['id'], ['Fridy', 'fridy'])
        manager.addNamedEntityText('subjek.dosen', 'Roenadi Koesdijarto, Ir.', ['id'], ['Roenadi', 'Roen', 'roenadi', 'roen'])
        manager.addNamedEntityText('subjek.dosen', 'Geri Kusnanto, S.Kom., M.M.', ['id'], ['Geri', 'geri', 'gery', 'Gery'])
        manager.addNamedEntityText('subjek.dosen', 'Agus Darwanto, Ir.', ['id'], ['Agus', 'Adar', 'dar', 'Dar', 'adar', 'agus dar', 'Agus Dar'])
        manager.addNamedEntityText('subjek.dosen', 'Moh. Sidqon, S.Si., M.Si.', ['id'], ['Sidqon', 'sidqon'])
        manager.addNamedEntityText('subjek.dosen', 'Mohammad Firdaus, S.Kom., M.Kom.', ['id'], ['Firdaus', 'firdaus', 'Fir', 'fir'])
        manager.addNamedEntityText('subjek.dosen', 'Sugiono, IR., M.T.', ['id'], ['Sugiono', 'sugiono', 'sugi', 'Sugi', 'gik', 'Gik', 'sgk', 'SGK', 'Sgk'])
        manager.addNamedEntityText('subjek.dosen', 'Muaffaq A. Jani, Dr., Ir., M.Eng.', ['id'], ['Muaffaq', 'muaffaq', 'Muaffak', 'muaffak', 'muafaq', 'Muafaq'])
        manager.addNamedEntityText('subjek.dosen', 'Ery Sadewa Yudha, W., S.Kom, M.M.', ['id'], ['Ery', 'ery', 'eri', 'Eri'])
        manager.addNamedEntityText('subjek.dosen', 'Fajar Astuti H., S.Kom., M.Kom.', ['id'], ['Fajar', 'fajar'])
        manager.addNamedEntityText('subjek.dosen', 'Agyl Ardi Rahmadi, S.Kom., M.A', ['id'], ['Agyl', 'agil'])
        manager.addNamedEntityText('subjek.dosen', 'Agung Kridoyono, S.ST., MT.', ['id'], ['Agung', 'agung'])
        manager.addNamedEntityText('subjek.dosen', 'Agus Hermanto, S.KOM., M.MT., ITIL, COBIT', ['id'], ['Aher', 'aher', 'agus', 'Agus'])
        manager.addNamedEntityText('subjek.dosen', 'Berlian Al Kindhi, S.ST., MT.', ['id'], ['Berlian', 'berlian'])


        // possible questions
        manager.addDocument('id', 'Selamat %kondisi.salam%', 'sapaan.kabar')
        manager.addDocument('id', 'Met %kondisi.salam%', 'sapaan.kabar')
        manager.addDocument('id', 'Slmt %kondisi.salam%', 'sapaan.kabar')
        manager.addDocument('id', 'Hai, selamat %kondisi.salam%', 'sapaan.kabar')
        manager.addDocument('id', '%kondisi.salam%', 'sapaan.kabar')
        manager.addDocument('id', '%kondisi.salam% bos', 'sapaan.kabar')
        manager.addDocument('id', '%kondisi.salam% bot', 'sapaan.kabar')
        manager.addDocument('id', 'Halo, %kondisi.salam%', 'sapaan.kabar')
        manager.addDocument('id', 'Hai', 'sapaan.kabar')
        manager.addDocument('id', 'hi', 'sapaan.kabar')
        manager.addDocument('id', 'Hey', 'sapaan.kabar')
        manager.addDocument('id', 'Halo', 'sapaan.kabar')
        manager.addDocument('id', 'Oy', 'sapaan.kabar')
        manager.addDocument('id', 'Hai, Apa Kabar ?', 'sapaan.kabar.tanya')
        manager.addDocument('id', 'Bagaimana kabarmu ?', 'sapaan.kabar.tanya')
        manager.addDocument('id', 'Gimana kabarmu ?', 'sapaan.kabar.tanya')
        manager.addDocument('id', 'Bagaimana kondisimu ?', 'sapaan.kabar.tanya')
        manager.addDocument('id', 'Tolong, %kata.kerja% %kata.nomina% pak %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', 'Tolong, carikan jadwal pak %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', 'Tolong, carikan lokasi pak %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', '%kata.kerja% %kata.nomina% %kata.nomina% %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', '%kata.nomina% %kata.nomina% %subjek.gender% %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', '%kata.nomina% %subjek.gender% %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', 'lokasi dosen %subjek.gender% %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', 'jadwal dosen %subjek.gender% %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', 'lksi dosen %subjek.gender% %subjek.dosen%', 'cari.lihat')
        manager.addDocument('id', 'jdwl dosen %subjek.gender% %subjek.dosen%', 'cari.lihat')

        // possible answer
        manager.addAnswer('id', 'sapaan.kabar.tanya', 'Baik - Baik')
        manager.addAnswer('id', 'sapaan.kabar.tanya', 'Selalu sehat :)')
        manager.addAnswer('id', 'sapaan.kabar.tanya', 'Selalu Semangat')
        manager.addAnswer('id', 'sapaan.kabar', 'Hi Juga')
        manager.addAnswer('id', 'sapaan.kabar', 'Hey')
        manager.addAnswer('id', 'sapaan.kabar', 'Aye Aye')
        manager.addAnswer('id', 'sapaan.kabar', '{{kondisi.salam}}')
        manager.addAnswer('id', 'sapaan.kabar', 'Selamat {{kondisi.salam}} juga')
        manager.addAnswer('id', 'sapaan.kabar', '{{kondisi.salam}} juga')
        await manager.train()
        manager.save('source/model.nlp')
      }else{
        return response.status(401).json({
          'status': 'failed',
          'message': 'username atau password salah'
        })
      }

    }else{
      return response.status(401).json({
        'status': 'failed',
        'message': validation.messages()
      })
    }
  }
}

module.exports = TrainingController
