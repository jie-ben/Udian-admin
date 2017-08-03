import { create, remove, update, query, ware, removes, download, bank, batchadd, updateState} from '../services/powerBox'
import { parse } from 'qs'
import { isEmptyObject } from '../utils'

export default {

  namespace: 'powerBox',

  state: {
    list: [],
    listbank:[],
    currentItem: {},
    modalVisible: false,
    downVisible:false,
    addVisible:false,
    stateVisible:false,
    boxNo:'',
    defaultValue:'',
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
        if (location.pathname === '/powerBox') {
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
    *download ({ payload }, { call, put }) {
        var page = {};
        if(payload.page == null){
          page = {total:0,current:1,pageSize:10,field:payload.field,keyword:payload.keyword}
        }else{
          page = {current:payload.page,pageSize:payload.pageSize,field:payload.field,keyword:payload.keyword}
        }
        const data = yield call(download, parse(page))
    },    
    *batchadd ({ payload }, { call, put }) {
        const {data} = yield call(batchadd,payload)
        if(data.status == 200){
          const page = {total:0,current:1,pageSize:10}
          const datas = yield call(query, parse(page))
          yield put({type:'hideadd'})
          if (datas) {
            yield put({
              type: 'querySuccess',
              payload: {
                list: datas.data.rows,
                pagination: {total:datas.data.total,current:datas.data.offset + 1,pageSize:(datas.data.pageSize)}
              }
            })
          }
        }else{
          yield put({type:'hideadd'})
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
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      const data = yield call(create, payload)
      if (data.data.status == 200) {
        const page = {total:0,current:1,pageSize:10}
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
    *updateState ({ payload }, { call, put }) {        
      yield put({type:'hideState'})
        const { data } = yield call(updateState, payload)
        if(data.status ==200){  
          const page = {total:0,current:1,pageSize:10}
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
     *ware ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(ware, payload)
      if (data.data.status == 200) {
        yield put({
          type: 'showModal',
          payload: {  
            modalType: payload.modalType,
            currentItem:payload.currentItem,
            wareList:data.data.rows
          }
        })
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      const id = yield select(({ powerBox }) => powerBox.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.data.status == 200) {
        const page = {total:0,current:1,pageSize:10}
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
    *bank ({ payload }, { call, put }) {
        const {data} = yield call(bank, payload)
        if(data.status == 200){
          yield put({
            type: 'showBank',
            payload: {
              listbank: data.rows,
            }
          })
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
        }}
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    showDown (state) {
      return {...state, downVisible: true , }
    },
    showBank (state, action) {
      return { ...state, ...action.payload}
    },
    showAdd (state) {
      return { ...state, addVisible: true ,}
    },
    showState (state,action) {
      return { ...state, stateVisible: true , ...action.payload }
    },
    hideState (state) {
      return { ...state, stateVisible: false ,}
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    hideDown(state){
       return { ...state, downVisible: false }
     },
    hideadd(state){
       return { ...state, addVisible: false }
     },
    handleSwitchIsMotion (state) {
      localStorage.setItem('antdAdminUserIsMotion', !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },

}
