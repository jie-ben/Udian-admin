import { request } from '../utils'

export async function query (params) {
  if(params.keyword){
      const url = 'order/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword;
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = 'order/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)
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


export async function remove (params) {
//
}


export async function update (params) {
  //
}
