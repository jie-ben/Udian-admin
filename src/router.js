import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'dva/router'
import App from './routes/app'

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

const Routers = function ({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/login'))
          cb(null, { component: require('./routes/login/') })
        }, 'login')
      },
      childRoutes: [
        {
          path: 'dashboard',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dashboard'))
              cb(null, require('./routes/dashboard/'))
            }, 'dashboard')
          },
        }, {
          path: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/users'))
              cb(null, require('./routes/users/'))
            }, 'users')
          },
        },{
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/'))
            }, 'login')
          },
        },{
          path: 'CBD',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/CBD'))
              cb(null, require('./routes/CBD/'))
            }, 'CBD')
          },
        },{
          path: 'wareHouse',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wareHouse'))
              cb(null, require('./routes/wareHouse/'))
            }, 'wareHouse')
          },
        },{
          path: 'powerBox',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/powerBox'))
              cb(null, require('./routes/powerBox/'))
            }, 'powerBox')
          },
        },{
          path: 'wareHouseCreate',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/wareHouse'))
              cb(null, require('./routes/wareHouse/wareHouseCreate'))
            }, 'wareHouse')
          },
        },{
          path: 'rules',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/rules'))
              cb(null, require('./routes/rules'))
            }, 'rules')
          },
        },{
          path: 'order',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/order'))
              cb(null, require('./routes/order'))
            }, 'order')
          },
        },{
          path: 'distributor',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/Distributor'))
              cb(null, require('./routes/Distributor'))
            }, 'distributor')
          },
        },{
          path: 'admin',
          getComponent (nextState, cb) {
            require.ensure([], require => {           
              registerModel(app, require('./models/admin'))
              cb(null, require('./routes/admin/'))
            }, 'admin')
          },
        },{
          path: 'role',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/role'))
              cb(null, require('./routes/role/'))
            }, 'role')
          },
        },{
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
