export default {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '成都',
      temperature: '5',
      name: '晴',
      icon: 'http://www.zuimeitianqi.com/res/icon/0_big.png',
      dateTime: new Date().format('MM-dd hh:mm'),
    },
    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'queryWeather' })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
      // const data = yield call(query, parse(payload))
      // yield put({ type: 'queryWeather', payload: { ...data } })
    },
    *queryWeather ({
      payload,
    }, { call, put }) {
      // const myCityResult = yield call(myCity, { flg: 0 })
      // const result = yield call(queryWeather, { cityCode: myCityResult.selectCityCode })
      // const weather = zuimei.parseActualData(result.data.actual)
      // weather.city = myCityResult.selectCityName
      // yield put({ type: 'queryWeatherSuccess', payload: {
      //   weather,
      // } })
    },
  },
  reducers: {
    queryWeatherSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    queryWeather (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
