import { request } from '../utils'

export async function login (params) {
  return request('login', {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},  
    body: JSON.stringify(params)
  })
}

export async function logout (params) {
  return request('logout?jsessionid=' + localStorage.getItem("token"), {
    method: 'GET',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'}
  })
}

export async function getUserInfo (params) {
  return request('checkLogin?jsessionid=' + localStorage.getItem("token"), {
    method: 'GET',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'}
  });
}