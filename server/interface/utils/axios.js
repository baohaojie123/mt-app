import axios from 'axios'
// 创建实例
const instance = axios.create({
  // 基础的url
  baseURL:`http://${process.env.host||'localhost'}:${process.env.port||3000}`,
  // 超时
  timeout:1000,
  // 头部
  headers:{

  }
})
export default instance