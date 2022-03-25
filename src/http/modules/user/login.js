import axios from '../../axios'
import qs from 'qs' // 使用qs对post传送的据序列化
/* 
 * 系统登录模块
 */

const preUrl = "/sys/login/";

// 登录
export const login = data => {
    return axios({
        url: 'login',
        method: 'post',
        data: qs.stringify(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
    })
}
// 注册
export const register = data => {
    return axios({
        url: '/user/register',
        method: 'post',
        data,
    })
}

// 获取验证码
export const captcha = () => {
  return axios({
      url: 'captcha',
      method: 'get'
  })
}

// 登出
export const logout = () => {
    return axios({
        url: 'logout',
        method: 'get'
    })
}

// 修改密码 
export const updatePassword = params => {
  return axios({
    url: '/user/updatePassword',
    method: 'post',
    params
  })
}