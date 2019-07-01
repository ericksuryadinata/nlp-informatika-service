/**
 * This file included in index.js
 */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('extraction', 'ExtractionController.index').as('extraction')
Route.get('dosen/random','Dosen/DosenController.index').as('dosen.random')
