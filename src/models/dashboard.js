
import { allOrder,allCount,allCustomer,everydayIncome } from '../services/dashboard'
import { parse } from 'qs'
export default {
  namespace: 'dashboard',
  state: {
    allOrderNumber:'',
    allCountNumber:'',
    allCustomerNumber:'',
    BayEarningsArry:[],
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ 
        type: 'earningDay',
        payload: {}
       })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const dataOrder = yield call(allOrder)
      const dataCount = yield call(allCount)
      const dataCustomer = yield call(allCustomer)
      yield put({
        type: 'queryWeather', 
        payload: { 
          allOrderNumber:dataOrder.data.rows,
          allCountNumber:dataCount.data.rows,
          allCustomerNumber:dataCustomer.data.rows,
        } 
      }) 
    },
    *earningDay ({
      payload,
    }, { call, put }) {
        const NowDate = new Date()
        const NowYear = NowDate.getFullYear();    //获取完整的年份(4位,1970-????)
        const NowMonth = NowDate.getMonth();       //获取当前月份(0-11,0代表1月)
        const NowBay = NowDate.getDate();
        const addDate =(a,i)=>{ //天数向减
          let d = new Date(a)
          d = d.valueOf()
          d = d + i * 24 * 60 * 60 * 1000
          d = new Date(d)
          return d;
        }
        let date = {}
        if(payload.startDate){
          date = {
            startDate:payload.startDate,
            endDate:payload.endDate,
          }
        }else{
          let NextNow  = addDate((NowMonth+1)+"/"+NowBay+"/"+NowYear,-7);
          let Y = NextNow.getFullYear();
          let M = NextNow.getMonth()+1;
          let D = NextNow.getDate();
          let startDate = NowYear+"-"+ (NowMonth+1)+"-"+ NowBay +" "+"0:0:0";
          let endDate = Y+"-"+M+"-"+D+" "+ "23:59:59"
          date ={
            startDate:startDate,
            endDate:endDate
          }
        }
      const data = yield call(everydayIncome,date)
      console.log("data==",data)
      if(data){
        yield put({
          type: 'BayEarnings', 
          payload: { 
            BayEarningsArry:data.data.rows,
          } 
        }) 
      }
    },
  },
  reducers: {
    queryWeather (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    BayEarnings (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
