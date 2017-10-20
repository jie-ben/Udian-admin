import { request } from '../utils'
export async function allOrder (params) {
    const url = '/battery/allBorrowCount?jsessionid=' + localStorage.getItem("token") 
    return request(url, {
      method: 'get',
      data: params
    })
}
export async function allCount (params) {
    const url = '/powerBox/powerBoxNumber?jsessionid=' + localStorage.getItem("token") 
    return request(url, {
      method: 'get',
      data: params
    })
}
export async function allCustomer (params) {
    const url = '/customerStatistics/customerStatistics?jsessionid=' + localStorage.getItem("token") 
    return request(url, {
      method: 'get',
      data: params
    })
}
export async function everydayIncome (params) {
    const url = '/order/everydayIncome?jsessionid=' + localStorage.getItem("token") +"&startDate="+params.startDate+"&endDate="+params.endDate +"&type=" +params.type
    return request(url, {
      method: 'get',
      data: params
    })
}