import axios from 'axios';
import config from './config';
import router from '@/router'
import { Message } from 'element-ui';

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })
    
    // response 响应拦截器
    instance.interceptors.response.use(
      response => { // http请求成功
        if(response.data.code != 200) { // 1->数据请求失败
          // 输出错误消息
          Message({
            message: response.data.msg,
            type: 'error'
          })

          // 用户未登录时处理
          if(response.data.code == 401){
            router.push({
              path: `/login`
            })
          }
          return Promise.reject(response.data)
        }else{  // 2->数据请求成功
          return response.data
        }
      },
      error => {  // http请求失败
        if(error && error.response && error.response.data){
          switch (error.response.data.status) {
            case 400:
              error.msg = '请求路径不存在！'
              break
            case 401:
              error.msg = '未授权，请登录'
              break
            case 403:
              error.msg = '权限不足，拒绝访问'
              break
            case 404:
              error.msg = `请求地址出错: ${error.response.config.url}`
              break
            case 405:
              error.msg = '网络数据格式不支持！'
              break
            case 408:
              error.msg = '请求超时'
              break
            case 500:
              error.msg = '服务器内部错误'
              break
            case 501:
              error.msg = '服务未实现'
              break
            case 502:
              error.msg = '网关错误'
              break
            case 503:
              error.msg = '服务不可用'
              break
            case 504:
              error.msg = '网关超时'
              break
            case 505:
              error.msg = 'HTTP版本不受支持'
              break
            default: {
              if(error.response.data.msg){
                error.msg = error.response.data.msg;
              }else{
                error.msg = '网络错误' + error.response.data;
              }
            }
          }
        }else if(error && error.message){
          error.msg = "网络错误，请检查服务器连接！" + error;
        }else if(error){
          error.msg = "网络错误" + error;
        }else {
          error = {msg : "网络请求出错！"};
        }
        Message({
          message: error.msg,
          type: 'error'
          })
        return Promise.reject(error) // 返回接口返回的错误信息
      }
    )
    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}