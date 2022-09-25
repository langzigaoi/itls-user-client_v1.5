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
// 查询教师个人选择题列表
export const findPersonPage = (data) => {
  return axios({
    url: preUrl + 'findTeaPage',
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
// 更新
export const update = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'post',
    data
  })
}
// 发布
export const pub = (params) => {
  return axios({
    url: preUrl + 'pub',
    method: 'patch',
    params
  })
}

// 预览
export const pdf = (params) => {
  return axios({
    url: preUrl + 'pdf',
    method: 'get',
    params
  })
}


// 学生功能
export const studentPage = (data) => {
  return axios({
    url: preUrl + 'findStuPage',
    method: 'post',
    data
  })
}

