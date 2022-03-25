import axios from '../../axios'

/* 
 * 个人信息模块
 */

const preUrl = "/user/"

// 保存
export const save = data => {
  return axios({
    url: preUrl + 'save',
    method: 'post',
    data
  })
}

// 获取
export const getUsrUser = params => {
  return axios({
    url: preUrl + 'getInfo',
    method: 'get',
    params
  })
}
