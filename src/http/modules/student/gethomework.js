import axios from '../../axios'
/* 
 * 学生端获取作业信息
 */

 const preUrl = "/student/coursehomework/"


// 学生端通过课程实例id获取每一讲对应的作业信息

export const getSectionHomework = (params) => {
  return axios({
    url: preUrl + 'gethomeworkinfo',
    method:'get',
    params
  })
}

// 学生端通过sectionid获取对应的编程题目
export const gethomeworkProblemProg = (params) => {
  return axios({
    url: preUrl + 'gethomeworkProblemProg',
    method:'get',
    params
  })
}

// 更新学生的记录,将评判的结果更新到数据库中
export const insertAllHomeworkRecords = (data) => {
  return axios({
    url: preUrl + 'insertAllHomeworkrecords',
    method:'post',
    data
  })
}

// 将学生单个题目测试记录提交到数据库 
export const insertHomeworkRecords = (data) => {
  return axios({
    url: preUrl + 'insertHomeworkRecords',
    method:'post',
    data
  })
}
// 将学生单个题目保存到数据库
export const saveHomeworkrecords = (data) => {
  return axios({
    url: preUrl + 'saveHomeworkrecords',
    method:'post',
    data
  })
}
// 获取学生保存的作业记录
export const getHomeworkTrace = (params) => {
  return axios({
    url: preUrl + 'getHomeworkTrace',
    method:'get',
    params
  })
}

// 设定的分数
export const getHomeworkGrads = (params) => {
  return axios({
    url: preUrl + 'getHomeworkGrads',
    method:'get',
    params
  })
}


