import { create, remove, update, query } from '../services/order'
import { parse } from 'qs'
import { isEmptyObject } from '../utils'

export default {

  namespace: 'order',

  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/order') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {
    *query ({ payload }, { call, put }) {
        yield put({ type: 'showLoading' })
        var page = {};  
        if(isEmptyObject(payload.page)){
          page = {total:0,current:1,pageSize:10,field:payload.field,keyword:payload.keyword}
        }else{
          page = {current:payload.page,pageSize:payload.pageSize,field:payload.field,keyword:payload.keyword}
        }
        const data = yield call(query, parse(page))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.rows,
              pagination: {total:data.data.total,current:data.data.offset + 1,pageSize:(data.data.pageSize)}
            }
          })
        }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload.id })
      if (data.data.status == 200) {
        const page = {total:payload.pagination.pagination,current:payload.pagination.current,pageSize:payload.pagination.pageSize}
        const data = yield call(query, parse(page))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.rows,
              pagination: {total:data.data.total,current:data.data.offset + 1,pageSize:(data.data.pageSize)}
            }
          })
        }
      }
    },
    *'deletes' ({ payload }, { call, put }) {
      const data = yield call(removes, { ids: payload.data })
      if (data.data.status == 200) {
        const page = {total:payload.pagination.pagination,current:payload.pagination.current,pageSize:payload.pagination.pageSize}
        const data = yield call(query, parse(page))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.rows,
              pagination: {total:data.data.total,current:data.data.offset + 1,pageSize:(data.data.pageSize)}
            }
          })
        }
      }
    },
    *switchIsMotion ({
      payload,
    }, { put }) {
      yield put({
        type: 'handleSwitchIsMotion',
      })
    },
  },

  reducers: {
    querySuccess (state, action) {
      const { list, pagination } = action.payload
      return { ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
