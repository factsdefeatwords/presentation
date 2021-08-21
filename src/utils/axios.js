import Axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? '/' : ''

const axios = Axios.create({
  baseURL,
  timeout: 3000 // 请求超时 3s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
