/**
 * This file included in index.js
 */

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/', 'TrainingController.index').as('index')
Route.post('/test', 'TestController.index').as('index')
