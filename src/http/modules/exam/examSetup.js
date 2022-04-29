import axios from '../../axios'

const preUrl = "/exam/setup/";

//提交考试信息
export const add = (data) => {
  return axios({
    url: preUrl + 'add',
    method: 'post',
    data
  })
}
// 查询个人选择题列表
export const findPersonPage = (data) => {
  return axios({
    url: preUrl + 'findPerPage',
    method: 'post',
    data
  })
}

// 删除
export const del = (data) => {
  return axios({
    url: preUrl + 'del',
    method: 'post',
    data
  })
}

// 删除
export const update = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'post',
    data
  })
}


//获取对应的章节
export const getCourseChapter = (params) => {
  return axios({
    url: preUrl + 'getCourseChapter',
    method: 'get',
    params
  })
}
//获取章节对应的题目
export const getProblem = (params) => {
  return axios({
    url: preUrl + 'getProblem',
    method: 'get',
    params
  })
}
//提交考试信息
export const addMidsemesterExam = (data) => {
  return axios({
    url: preUrl + 'insert',
    method: 'post',
    data
  })
}
//获取课程名
export const getCourseName = (params) => {
  return axios({
    url: preUrl + 'getCourseName',
    method: 'get',
    params
  })
}
//获取考试信息
export const getExamInfo = (params) => {
  return axios({
    url: preUrl + 'getExamInfo',
    method: 'get',
    params
  })
}
//学生端获取发布后的考试信息
export const getPubExamInfo = (params) => {
  return axios({
    url: preUrl + 'getPubExamInfo',
    method: 'get',
    params
  })
}
//获取考试选择题
export const getExamChoice = (params) => {
  return axios({
    url: preUrl + 'getExamChoice',
    method: 'get',
    params
  })
}

//获取考试编程题
export const getExamProg = (params) => {
  return axios({
    url: preUrl + 'getExamProgs',
    method: 'get',
    params
  })
}

//获取具体的考试信息
export const getNewExamInfo = (params) => {
  return axios({
    url: preUrl + 'getNewExamInfo',
    method: 'get',
    params
  })
}

//更新发布的状态
export const updatePub = (params) => {
  return axios({
    url: preUrl + 'updataPub',
    method: 'patch',
    params
  })
}
//更新考试题目
export const updateProblemId = (params) => {
  return axios({
    url: preUrl + 'updataproblemId',
    method: 'patch',
    params
  })
}
//获取考试题目id
export const getProblemId = (params) => {
  return axios({
    url: preUrl + 'getProblemId',
    method: 'get',
    params
  })
}
//修改考试信息
export const updateExamInfo = (data) => {
  return axios({
    url: preUrl + 'updateExam',
    method: 'post',
    data
  })
}
