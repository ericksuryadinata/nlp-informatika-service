'use strict'

class WordHandler {
  async intentHandler () {
    let word = [
      'saya masih belum mengerti kata itu',
      'maaf, saya masih belum diberi keahlian untuk mencari itu',
      'maaf, saya masih belum mengerti bahasa anda',
      'basis data saya masih kurang :('
    ]
    return word[this.getRandomInt(4)]
  }

  async entitiesHandler () {
    let word = [
      'Informasi yang ditanyakan masih kurang lengkap',
      'berikan pertanyaan yang lebih lengkap',
      'Maaf, berikan pertanyaan yang lebih lengkap',
      'pertanyaan anda susah dimengerti, mohon untuk lebih spesifik dalam bertanya'
    ]
    return word[this.getRandomInt(4)]
  }

  getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
}

module.exports = WordHandler
