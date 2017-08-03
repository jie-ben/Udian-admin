import { getUserInfo, logout } from '../services/app'
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { config } from '../utils'
const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    loginButtonLoading: true,
    menuPopoverVisible: true,
    siderFold:true,
    // darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'false',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [], //侧边栏菜单打开的keys
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'queryUser' })
      window.onresize = () => {
        dispatch({ type: 'changeNavbar' })
      }
    },
  },
  effects: {
    // *queryUser ({
    //   payload,
    // }, { call, put }) {
    //   // 获取用户信息
    //   const data = yield call(getUserInfo, parse(payload))
    //   if (data.data.status == 200) {
    //     yield put({
    //       type: 'queryUserSuccess',
    //       payload: data.data.rows
    //     })
    //     if (location.pathname === '/login') {
    //       yield put(routerRedux.push('/dashboard'))
    //     }
    //   } else {
    //     if (location.pathname !== '/login') {
    //       let from = location.pathname
    //       if (location.pathname === '/dashboard') {
    //         from = '/dashboard'
    //       }
    //       window.location = `${location.origin}/login?from=${from}`
    //     }
    //   }
    // },
    *queryUser ({
      payload,
    }, { call, put }) {
      // 获取用户信息
      const data = yield call(getUserInfo, parse(payload))
      if (data.data.status == 200) {
        yield put({
          type: 'queryUserSuccess',
          payload: data.data.rows.adminAccount
        })
        // if (location.pathname === '/login') {
        //   yield put(routerRedux.push('/dashboard'))
        // }
      } else {
        yield put({type: 'logout',payload})
        
      }
    },
    *logout ({
      payload,
    }, { call, put }) {
      const data = yield call(logout, parse(payload))
      // if (data.data.status == 200) {
      //   yield put({ type: 'queryUser' })
      // } else {
      //   throw (data)
      // }
      yield put(routerRedux.push('/login'))
    },
    *switchSider ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchSider',
      })
    },
    *switchMousever ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchhide',
      })
    },
    *switchMouseOut ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchshow',
      })
    },
    *changeTheme ({
      payload,  
    }, { put }) {
      yield put({
        type: 'handleChangeTheme',
      })
    },
    *changeNavbar ({
      payload,
    }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: 'showNavbar' })
      } else {
        yield put({ type: 'hideNavbar' })
      }
    },
    *switchMenuPopver ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchMenuPopver',
      })
    },
  },
  reducers: {
    queryUserSuccess (state, { payload: user }) {
      return {
        ...state,
        user,
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true,
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },
    handleSwitchhide (state) {
      return {
        ...state,
        siderFold: false,
      }
    },
    handleSwitchshow (state) {
      return {
        ...state,
        siderFold: true,
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true,
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false,
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },
    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
