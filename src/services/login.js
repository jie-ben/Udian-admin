import { request } from '../utils'

export async function login (params) {
  return request('login', {
    method: 'post',
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},  
    body: JSON.stringify(params)
  })
}
