/**
 * This file included in index.js
 */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('extraction', 'ExtractionController.index').as('extraction')
Route.get('test', 'ExtractionController.test').as('test')


Route.get('dosen/random','Dosen/DosenController.random').as('dosen.random')
Route.get('dosen/android','Dosen/DosenController.android').as('dosen.android')
Route.get('dosen/rfid','Dosen/DosenController.rfid').as('dosen.rfid')

