import { request } from '../utils'
import { APIURL } from '../utils/config'
export async function query (params) {
  sessionStorage.setItem("paramsdownload",JSON.stringify(params))
  if(params.keyword){
      const url = 'powerBox/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1) + 
      '&field=' + params.field + '&keyword=' + params.keyword;
      return request(url, {
        method: 'get',
        data: params
      })

  }else{
      const url = 'powerBox/query?jsessionid=' + localStorage.getItem("token") + '&length=' + params.pageSize + '&offset=' + (params.current-1)
      return request(url, {
        method: 'get',
        data: params
      })
  }
}

export async function download (params) {
  let paramss = JSON.parse(sessionStorage.getItem("paramsdownload"))
  console.log("paramssparamss==",paramss)
  if(paramss.keyword){
      const url = APIURL +'/qr/download?jsessionid=' + localStorage.getItem("token") + '&length=' + paramss.pageSize + '&offset=' + (paramss.current-1) + 
      '&field=' + paramss.field + '&keyword=' + paramss.keyword;   
      console.log(url)       
      window.open(url);
  }else{
      const url = APIURL+'/qr/download?jsessionid=' + localStorage.getItem("token") + '&length=' + paramss.pageSize + '&offset=' + (paramss.current-1)
      console.log(url)       
      window.open(url);
  }
}


export async function create (params) {
  return request('powerBox/add?jsessionid=' + localStorage.getItem("token"), {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}

export async function batchadd (params) {
  return request('/powerBox/addBatch?jsessionid=' + localStorage.getItem("token"), {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}


export async function remove (params) {
  return request('powerBox/del/' + params.id + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}

export async function removes (params) {
  return request('powerBox/dels/' + params.ids + '?jsessionid=' + localStorage.getItem("token"), {
    method: 'delete'
  })
}
export async function update (params) {
  return request('powerBox/edit?jsessionid=' + localStorage.getItem("token"), {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
}
export async function updateState (params) {
  return request('/powerBox/updateState?jsessionid=' + localStorage.getItem("token") + "&boxNo=" + params.boxNo + "&status=" + params.status, {
    method: 'put',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
  })
}

export async function ware (params) {
    const url = 'wareHouse/query?jsessionid=' + localStorage.getItem("token") + '&length=10000';
    return request(url, {
      method: 'get',
      data: params
    })
}
export async function bank (params) {
    const url = '/powerBank/query?jsessionid=' + localStorage.getItem("token") + '&boxNo=' + params.boxNo;
    return request(url, {
      method: 'get',
      data: JSON.stringify(params)
    })
}







