import {update, query,remove,toAdmin, reject  } from '../services/Distributor'
import { parse } from 'qs'
import { isEmptyObject } from '../utils'

export default {

  namespace: 'distributor',

  state: {
    list: [],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    isMotion: localStorage.getItem('antdAdminUserIsMotion') === 'true',
    state:'',
    RejectId:'',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
    paginationModal: {
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
        if (location.pathname === '/distributor') {
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
        console.log("payload==",payload)
        let  state =''
        if(payload.state == -1 || !payload.state){
            state = ''
        }else{
          state = payload.state
        }
        var page = {};
        if(isEmptyObject(payload.page)){
          page = {total:0,current:1,pageSize:10,field:payload.field,keyword:payload.keyword,state:state}
        }else{
          page = {current:payload.page,pageSize:payload.pageSize,field:payload.field,keyword:payload.keyword,state:state}
        }
        const data = yield call(query, parse(page))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.rows,
              pagination: {total:data.data.total,current:data.data.offset + 1,pageSize:(data.data.pageSize)},
              states:state,
            }
          })
        }
    },
    *'delete' ({ payload }, { call, put }) {
      const data = yield call(remove,payload.id )
      if (data.data.status == 200) {
        const page = {total:payload.pagination.pagination,current:payload.pagination.current,pageSize:payload.pagination.pageSize,state:payload.state}
        const data = yield call(query, parse(page))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.rows,
              pagination: {total:data.data.total,current:data.data.offset + 1,pageSize:(data.data.pageSize)},
              states:payload.state
            }
          })
        }
      }
    },
    *'ChangeToAdmin' ({ payload }, { call, put }) {
      const data = yield call(toAdmin,payload.data)
      if (data.data.status == 200) {
        const page = {total:payload.pagination.pagination,current:payload.pagination.current,pageSize:payload.pagination.pageSize,state:payload.state}
        const data = yield call(query, parse(page))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.rows,
              pagination: {total:data.data.total,current:data.data.offset + 1,pageSize:(data.data.pageSize)},
              states:payload.state
            }
          })
        }
      }
    },
    *'RejectRequest' ({ payload }, { call, put }) {
      const data = yield call(reject,payload.data)
      if (data.data.status == 200) {
        const page = {total:payload.pagination.pagination,current:payload.pagination.current,pageSize:payload.pagination.pageSize,state:payload.state}
        const data = yield call(query, parse(page))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.rows,
              pagination: {total:data.data.total,current:data.data.offset + 1,pageSize:(data.data.pageSize)},
              states:payload.state,
              modalVisible:false
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
        ...action.payload,
        pagination: {
          ...state.pagination,
          ...pagination,
        } }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      console.log("adasd")
      return { ...state, modalVisible: false }
    },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
