import axios from '../../axios'

/* 
 * 课程与课程实例-选课管理
 */

 const preUrl = "/course/choosing/";

// 获取课程实例详情
export const chooseCourseInstance = (params) => {
  return axios({
      url: preUrl + 'stuChoose',
      method: 'get',
      params
  })
}

