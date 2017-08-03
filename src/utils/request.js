import fetch from 'dva/fetch';
import config from './config.js'
import { message } from 'antd'




function checkStatus(response) {
    
    if (response.status >= 200 && response.status < 300) {
        
        return response;

    }else if(response.status == 403){

      message.error(response.errorMessage);
      
    }

    // const error = new Error(response.statusText);

    // error.response = response;

    // throw error;
     return response;

  
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  url =  config.APIURL + url;

  const response = await fetch(url, options);

  const data = await response.json();

  await checkStatus(data);

  const ret = {
    data,
    headers: {},
  };

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }

  return ret;
}

