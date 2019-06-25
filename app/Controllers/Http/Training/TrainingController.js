'use strict'
const {
  NlpManager,
  ConversationContext
} = use('node-nlp')
class TrainingController {
  async index ({
    response
  }) {
    const manager = new NlpManager({
      languages: ['id']
    })

    // entitity
    manager.addNamedEntityText('kondisisalam', 'Pagi', ['id'], ['pagi', 'Pagi'])
    manager.addNamedEntityText('kondisisalam', 'Siang', ['id'], ['siang', 'Siang'])
    manager.addNamedEntityText('kondisisalam', 'Malam', ['id'], ['malam', 'Malam'])
    manager.addNamedEntityText('kondisinetral', 'Alhamdulillah', ['id'], ['alhamdulillah', 'Alhamdulillah'])
    manager.addNamedEntityText('kondisinetral', 'Semangat', ['id'], ['semangat', 'Semangat'])
    manager.addNamedEntityText('kondisibaik', 'Baik', ['id'], ['baik', 'Baik'])
    manager.addNamedEntityText('kondisiburuk', 'Buruk', ['id'], ['buruk', 'Buruh'])
    manager.addNamedEntityText('kondisiburuk', 'Sedih', ['id'], ['sedih', 'Sedih'])
    manager.addNamedEntityText('kondisiburuk', 'Gawat', ['id'], ['Gawat', 'gawat'])
    manager.addNamedEntityText('hari', 'Senin', ['id'], ['Senin', 'senin'])
    manager.addNamedEntityText('hari', 'Selasa', ['id'], ['Selasa', 'selasa'])
    manager.addNamedEntityText('hari', 'Rabu', ['id'], ['Rabu', 'rabu'])
    manager.addNamedEntityText('hari', 'Kamis', ['id'], ['Kamis', 'kamis'])
    manager.addNamedEntityText('hari', 'Jumat', ['id'], ['Jumat', 'jumat'])
    manager.addNamedEntityText('hari', 'Sabtu', ['id'], ['Sabtu', 'sabtu'])
    manager.addNamedEntityText('hari', 'Minggu', ['id'], ['Minggu', 'minggu'])
    manager.addNamedEntityText('kata.kerja', 'Cari', ['id'], ['Carikan', 'carikan', 'Cari', 'cari'])
    manager.addNamedEntityText('kata.kerja', 'Lihat', ['id'], ['Lihatkan', 'lihatkan', 'lihat', 'Lihat'])

    // possible questions
    manager.addDocument('id', 'Selamat %kondisisalam%', 'sapaan.kabar')
    manager.addDocument('id', 'Met %kondisisalam%', 'sapaan.kabar')
    manager.addDocument('id', 'Slmt %kondisisalam%', 'sapaan.kabar')
    manager.addDocument('id', 'Hai, selamat %kondisisalam%', 'sapaan.kabar')
    manager.addDocument('id', '%kondisisalam%', 'sapaan.kabar')
    manager.addDocument('id', '%kondisisalam% bos', 'sapaan.kabar')
    manager.addDocument('id', '%kondisisalam% bot', 'sapaan.kabar')
    manager.addDocument('id', 'Halo, %kondisisalam%', 'sapaan.kabar')
    manager.addDocument('id', 'Hai', 'sapaan.kabar')
    manager.addDocument('id', 'hi', 'sapaan.kabar')
    manager.addDocument('id', 'Hey', 'sapaan.kabar')
    manager.addDocument('id', 'Halo', 'sapaan.kabar')
    manager.addDocument('id', 'Oy', 'sapaan.kabar')
    manager.addDocument('id', 'Hai, Apa Kabar ?', 'sapaan.kabar.tanya')
    manager.addDocument('id', 'Bagaimana kabarmu ?', 'sapaan.kabar.tanya')
    manager.addDocument('id', 'Gimana kabarmu ?', 'sapaan.kabar.tanya')
    manager.addDocument('id', 'Bagaimana kondisimu ?', 'sapaan.kabar.tanya')

    // possible answer
    manager.addAnswer('id', 'sapaan.kabar.tanya', 'Baik - Baik')
    manager.addAnswer('id', 'sapaan.kabar.tanya', 'Selalu sehat :)')
    manager.addAnswer('id', 'sapaan.kabar.tanya', 'Selalu Semangat')
    manager.addAnswer('id', 'sapaan.kabar', 'Hi Juga')
    manager.addAnswer('id', 'sapaan.kabar', 'Hey')
    manager.addAnswer('id', 'sapaan.kabar', 'Aye Aye')
    manager.addAnswer('id', 'sapaan.kabar', '{{kondisisalam}}')
    manager.addAnswer('id', 'sapaan.kabar', 'Selamat {{kondisisalam}} juga')
    manager.addAnswer('id', 'sapaan.kabar', '{{kondisisalam}} juga')
    await manager.train()
    manager.save('source/model.nlp')
  }
}

module.exports = TrainingController
