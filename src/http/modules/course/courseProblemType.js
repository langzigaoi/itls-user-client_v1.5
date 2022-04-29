import axios from '../../axios'

/* 
 * 课程实例与课程实例题型的管理
 */

const preUrl = "/course/problemtype/";

// 按课程id查询
export const findByCid = (params) => {
  return axios({
      url: preUrl + 'findByCid',
      method: 'get',
      params
  })
}


// 添加课程实例题型详情
export const addCourseProblemType = (data) => {
  return axios({
      url: preUrl + 'add',
      method: 'post',
      data
  })
}
// 获取课程实例题型详情
export const findCourseProblemType = (data) => {
  return axios({
      url: preUrl + 'selectCourseProblemType?id='+data,
      method: 'get',
  })
}

//更新课程实例题型
export const updateCourseProblemType = (data) => {
  return axios({
      url: preUrl + 'update',
      method: 'post',
      data
  })
}

