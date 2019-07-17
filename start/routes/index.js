'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const apiv1Group = (group) => {
  group.prefix('api/v1').as('api.v1')
  return group
}

Route.get('/', () => {
  return 'hello from nlp service'
})

apiv1Group(
  Route.group(() => {
    require('./training')
  }).namespace('Training').prefix('train').as('training')
)

apiv1Group(
  Route.group(() => {
    require('./data')
  }).namespace('Data').prefix('data').as('data')
)
