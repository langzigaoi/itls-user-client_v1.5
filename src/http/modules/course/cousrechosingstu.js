import axios from '../../axios'

/*
* 课程与课程实例-选课学生管理
*/

const preUrl = "/course/coursechosingstu/"

// 获取选课学生列表
export const findInfoByInd_id = (params) => {
  return axios({
    url: preUrl + 'findInfoByInd_id',
    method: 'get',
    params
  })
}

// 获取用户信息
export const getUserInfo = params => {
  return axios({
    url: preUrl + 'getUserInfo',
    method: 'get',
    params
  })
}

// 退选已选课的学生
export const withDrawChosingStu = params => {
  return axios({
    url: preUrl + 'withDrawChosingStu',
    method: 'put',
    params
  })
}

// 获取课程实例助教列表
export const findAstInfoByInd_id = params => {
  return axios({
    url: preUrl + 'findAstInfoByInd_id',
    method: 'get',
    params
  })
}

// 将学生修改为助教
export const setCinstanceAssistant = params => {
  return axios({
    url: preUrl + 'setCinstanceAssistant',
    method: 'put',
    params
  })
}