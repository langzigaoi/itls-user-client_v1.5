import axios from '../../axios'

/* 
 * 课程与课程实例-课程实例内容周下面的节管理
 */

 const preUrl = "/course/sectionhomework/";

// 添加创建的作业
export const addHomework = (data) => {
  return axios({
    url: preUrl + 'insert',
    method: 'post',
    data
  })
}

// 根据sectionId查询该讲是否设置了作业
export const checkHasHomework = (params) => {
  return axios({
    url: preUrl + 'exitHomework',
    method: 'get',
    params
  })
}

//删除homework的一个题目
export const delProblem = (params) => {
  return axios({
    url: preUrl + 'delProblem',
    method: 'get',
    params
  })
}

// 根据sectionId查询已经创建的作业
export const findByTContentId = (params) => {
  return axios({
    url: preUrl + 'findByTContentId',
    method: 'get',
    params
  })
}

// 修改已经创建的作业(包括修改作业信息和题目)
export const updatePart = (data) => {
  return axios({
    url: preUrl + 'updatePart',
    method: 'post',
    data
  })
}

// 逻辑删除作业
export const updateIsdelete = (data) => {
  return axios({
    url: preUrl + 'updateIsdelete',
    method: 'post',
    data
  })
}

// 为作业添加题目
export const addProblemPro = (data) => {
  return axios({
    url: preUrl + 'addProblemPro',
    method: 'post',
    data
  })
}

// 获取没有添加的编程题
export const getUnProblemProg = (params) => {
  return axios({
    url: preUrl + 'getUnProblemProg',
    method: 'get',
    params
  })
}

// 发布作业
export const updateisPub = (params) => {
  return axios({
    url: preUrl + 'updateisPub',
    method: 'get',
    params
  })
}
