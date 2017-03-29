import * as Views from './components/Views'

export default [
  {
    path: '/',
    name: 'dashboard',
    component: Views['Home']
  }, {
    path: '/login',
    name: 'login',
    component: Views['Login']
  }, {
    path: '/:model',
    name: 'list',
    component: Views['List']
  }, {
    path: '/:model/create',
    name: 'create',
    component: Views['Create']
  }, {
    path: '/:model/:id',
    name: 'edit',
    component: Views['Edit'],
    children: [
      {
        path: ':sub',
        name: 'sub',
        components: {
          sub: Views['List']
        }
      }
    ]
  }
]
