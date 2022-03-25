import axios from '../../axios'
/* 
 * 学生端获取作业信息
 */

 const preUrl = "/student/coursetest/"


// 学生端通过课程实例id获取每一讲对应的作业信息

export const gettestinfo = (params) => {
  return axios({
    url: preUrl + 'gettestinfo',
    method:'get',
    params
  })
}

// 根据sectionId获取对应的题目详情
export const getTestProblem = (params) => {
  return axios({
    url: preUrl + 'gettestproblem',
    method:'get',
    params
  })
}

// 将学生测验记录插入数据库
export const testRecords = (data) => {
  return axios({
    url: preUrl + 'insertTestrecords',
    method:'post',
    data
  })
}

// 将学生测验记录插入数据库(新)
export const testStuRecords = (data) => {
  return axios({
    url: preUrl + 'insertStuTestRecords',
    method:'patch',
    data
  })
}

// 获取学号
export const getStudentId = (params) => {
  return axios({
    url: preUrl + 'getstudentid',
    method:'get',
    params
  })
}

// 获取测验成绩

export const getSectionTestScore = (params) => {
  return axios({
    url: preUrl + 'gettestscore',
    method:'get',
    params
  })
}