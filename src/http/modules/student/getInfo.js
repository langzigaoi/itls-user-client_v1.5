import axios from '../../axios'
/* 
 * 学生端获取信息
 */

 const preUrl = "/student/coursechosingstu/"

//  获取选课学生列表
export const findInfoByInd_id = params => {
  return axios({
    url: preUrl + 'studentFindInfoByInd_id',
    method: 'get',
    params
  })
}

// 获取选课老师信息
export const getUserInfo = params => {
  return axios({
    url: preUrl + 'getTeacherInfo',
    method: 'get',
    params
  })
}

// 获取助教信息
export const studnetFindAstInfoByInd_id = params => {
  return axios({
    url: preUrl + 'studnetFindAstInfoByInd_id',
    method: 'get',
    params
  })
}