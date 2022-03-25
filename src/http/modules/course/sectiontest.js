import axios from '../../axios'

/* 
 * 测验
 */

 const preUrl = "/course/sectiontest/";

// 
export const insert = (data) => {
  return axios({
    url: preUrl + 'insert',
    method: 'post',
    data
  })
}
export const checkHasTest = (params) => {
  return axios({
    url: preUrl + 'checkHasTest',
    method: 'get',
    params
  })
}

export const selectCInstanceSectionTestBySectionId = (params) => {
  return axios({
    url: preUrl + 'selectCInstanceSectionTestBySectionId',
    method: 'get',
    params
  })
}
//修改测试的时间等信息
export const update = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'post',
    data
  })
}
//删除测试的一个题目
export const deleteAProblem = (params) => {
  return axios({
    url: preUrl + 'deleteAProblem',
    method: 'get',
    params
  })
}


//在弹框中添加题目
export const insertProblemList = (data) => {
  return axios({
    url: preUrl + 'insertProblemList',
    method: 'post',
    data
  })
}

// 发布测试
export const updateisPub = (params) => {
  return axios({
    url: preUrl + 'updateisPub',
    method: 'get',
    params
  })
}