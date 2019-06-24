'use strict'
const {
  NerManager
} = use('node-nlp');
class NerController {

  async index()
  {
    const manager = new NerManager({
      threshold: 0.8
    });
    manager.addNamedEntityText(
      'dosen',
      'sugiono',
      ['id'],
      ['Sugiono', 'sugik','sugi','Sugi'],
    );
    manager.addNamedEntityText(
      'dosen',
      'Fridy Mandita',
      ['id'],
      ['fridy', 'Fridy'],
    );
    const res = await manager.findEntities(
      'Cari pak sugi',
      'id',
    )
    console.log(res)
  }
}

module.exports = NerController
