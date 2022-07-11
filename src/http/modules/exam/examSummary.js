import axios from '../../axios'

const preUrl = "/exam/summary/";


//添加学生考试记录
export const addSummary = (params) => {
  return axios({
    url: preUrl + 'add',
    method: 'patch',
    params
  })
}
export const doneSummary = (data) => {
  return axios({
    url: preUrl + 'done',
    method: 'post',
    data
  })
}
export const findSummary = (params) => {
  return axios({
    url: preUrl + 'find',
    method: 'get',
    params
  })
}
export const findSummaryResult = (params) => {
  return axios({
    url: preUrl + 'result',
    method: 'get',
    params
  })
}



