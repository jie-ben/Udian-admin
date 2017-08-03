import { request } from '../utils'

export async function query (params) {
  if(params.keyword){
      const url = 'customer/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword;
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = 'customer/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)
      return request(url, {
        method: 'get',
        data: params
      })
  }
}

export async function create (params) {
  // return request('customer/add?jsessionid=' + localStorage.getItem("token"), {
  //   method: 'post',
  //   headers: {'Accept': 'application/json','Content-Type': 'application/json'},
  //   body: JSON.stringify(params)
  // })
}


export async function wallet (params) { 
  if(params.current){
    const url = '/wallet/query?jsessionid=' + localStorage.getItem("token") + '&field=openId&keyword=' + params.openid +'&length=' + params.pageSize + '&offset=' + (params.current-1);
    return request(url, {
      method: 'get',
      data: params
    })
  }else{
    const url = '/wallet/query?jsessionid=' + localStorage.getItem("token") + '&field=openId&keyword=' + params.openid;
    return request(url, {
      method: 'get',
      data: params
    })
  }
}


export async function update (params) {
  //
}
