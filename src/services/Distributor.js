import { request } from '../utils'

export async function query (params) {
  if(params.keyword){
      const url = '/distributor/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword +'&state=' + params.state
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = '/distributor/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)+'&state=' + params.state
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

export async function reject (params) {
  const url = '/distributor/rejectRequest?jsessionid=' + localStorage.getItem("token") + '&id='+params.id + '&msg='+params.msg
  return request(url, {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}
export async function toAdmin (params) {
  console.log("params=",params)
  const url = '/distributor/changeToAdmin?jsessionid=' + localStorage.getItem("token") + '&id='+params.id + '&state='+params.state
  return request(url, {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}
export async function remove (params) {
   return request('/distributor/del/' + params+ '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}