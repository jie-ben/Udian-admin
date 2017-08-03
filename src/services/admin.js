import { request } from '../utils'

export async function query (params) {
  if(params.keyword){
      const url = '/adminAccount/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword;
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = '/adminAccount/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)
      return request(url, {
        method: 'get',
        data: params
      })
  }
}


export async function toGrant (params) {
    const url = '/adminAccount/toGrantAccount/'+params+'?jsessionid=' + localStorage.getItem("token") 
    return request(url, {
      method: 'get',
      data: params
    })
}

export async function grantAdmin (params) {
    const url = '/adminAccount/grantAdmin/?jsessionid=' + localStorage.getItem("token") + '&id=' + params.perId + '&roleId=' + params.roleId;
    return request(url, {
      method: 'get',
      data: JSON.stringify(params)
    })
}

export async function create (params) {
  return request('/adminAccount/add?jsessionid=' + localStorage.getItem("token"), {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}


export async function remove (params) {
  return request('/adminAccount/remove/' + params.id + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}

export async function removes (params) {
  return request('/adminAccount/dels/' + params.ids + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}


export async function update (params) {
  return request('/adminAccount/edit?jsessionid=' + localStorage.getItem("token"), {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}







