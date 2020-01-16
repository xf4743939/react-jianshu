import axios from 'axios'
// const baseURL = 'https://elm.cangdu.org'
export const instance = axios.create({
  // baseURL,
  // 响应超时时间
  timeout: 20000,
  withCredentials: true
})

instance.interceptors.request.use(
  config => {
    // 可以配置token
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

// 简化get请求
// get, delete请求所需的参数跟post, put等不一样, 需要单独处理, 具体请参考axios文档
export const get = async (url = '', params = {}, config = {}) =>
  instance.get(url, {
    params,
    ...config
  })

// 简化post请求
export const post = async (url = '', params = {}, config = {}) =>
  instance.post(url, params, config)
