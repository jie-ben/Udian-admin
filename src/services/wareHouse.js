import { request } from '../utils'

export async function query (params) {
  if(params.keyword){
      const url = 'wareHouse/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword;
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = 'wareHouse/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)
      return request(url, {
        method: 'get',
        data: params
      })
  }
}

export async function create (params) {
  params.logo = params.logo.file.response.rows.id
  return request('wareHouse/add?jsessionid=' + localStorage.getItem("token"), {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}


export async function remove (params) {
  return request('wareHouse/del/' + params.id + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}

export async function removes (params) {
  return request('wareHouse/dels/'+ params.ids + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete',
  })
}

export async function update (params) {
  if(params.logo.file){
    params.logo = params.logo.file.response.rows.id
  }
  return request('wareHouse/edit?jsessionid=' + localStorage.getItem("token"), {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}

export async function cbd (params) {
    const url = 'cbd/query?jsessionid=' + localStorage.getItem("token") + '&length=10000';
    return request(url, {
      method: 'get',
      data: params
    })
}





