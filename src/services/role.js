import { request } from '../utils'

export async function query (params) {
  if(params.keyword){
      const url = '/role/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword;
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = 'role/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)
      return request(url, {
        method: 'get',
        data: params
      })
  }
}

export async function create (params) {
  return request('role/add?jsessionid=' + localStorage.getItem("token"), {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}


export async function remove (params) {
  return request('/role/remove/' + params.id + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}

export async function power (params) {
  console.log("params",params)
  const url = '/role/grantRole?jsessionid=' + localStorage.getItem("token") + '&perId=' + params.perId + '&roleId=' + params.roleId;
  return request(url, {
    method: 'get',
    body: params
  })
}
export async function grantRole (params) {
  const url = '/role/grantRoleList/'+params.roleId+'?jsessionid=' + localStorage.getItem("token");
  return request(url, {
    method: 'get',
    body: params
  })
}
export async function update (params) {
  return request('role/edit?jsessionid=' + localStorage.getItem("token"), {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: params
  })
}







