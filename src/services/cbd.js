import { request } from '../utils'

export async function query (params) {
  if(params.keyword){
      const url = 'cbd/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword;
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = 'cbd/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)
      return request(url, {
        method: 'get',
        data: params
      })
  }
}

export async function create (params) {
  return request('cbd/add?jsessionid=' + localStorage.getItem("token"), {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}


export async function remove (params) {
  return request('cbd/del/' + params.id + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}

export async function removes (params) {
  return request('cbd/dels/'+ params.ids + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete',
  })
}

export async function update (params) {
  return request('cbd/edit?jsessionid=' + localStorage.getItem("token"), {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}





