import axios from '../../axios'

const preUrl = "/exam/examtrace/";


//添加学生考试记录
export const insertExamTrace = (data) => {
  return axios({
    url: preUrl + 'insertExamTrace',
    method: 'post',
    data
  })
}

//插入选择题的记录
export const insertChoiceTrace = (params) => {
  return axios({
    url: preUrl + 'insertChoiceTrace',
    method: 'post',
    params
  })
}

//添加学生的考试记录
export const insertExamSummary = (data) => {
  return axios({
    url: preUrl + 'insertExamSummary',
    method: 'post',
    data
  })
}
//获取学生的成绩
export const getScore = (params) => {
  return axios({
    url: preUrl + 'getScore',
    method: 'get',
    params
  })
}