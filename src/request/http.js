/**!
 * http请求统一拦截处理
 */

import axios from 'axios'


// 创建axios实例
const http = axios.create({
  timeout: 6000 // 请求超时时间
})

// request拦截器
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.error(error, 'request error')
    return Promise.reject(error)
  }
)

// response 拦截器
http.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.error(error, 'response error')
    return Promise.reject(error)
  }
)

export default http