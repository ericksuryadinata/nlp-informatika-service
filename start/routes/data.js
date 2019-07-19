/**
 * This file included in index.js
 */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('extraction', 'ExtractionController.index').as('extraction')

Route.get('dosen/random', 'Dosen/DosenController.random').as('dosen.random')
Route.get('dosen/android', 'Dosen/DosenController.android').as('dosen.android')
Route.get('dosen/rfid', 'Dosen/DosenController.rfid').as('dosen.rfid')
Route.get('dosen/register', 'Dosen/DosenController.register').as('dosen.register')
Route.get('dosen/OTP/95243/:number/get/', 'Dosen/DosenController.getOTP').as('dosen.getOTP')
Route.get('dosen/OTP/95243/verify/:sess/:OTP', 'Dosen/DosenController.verifyOTP').as('dosen.verifyOTP')
