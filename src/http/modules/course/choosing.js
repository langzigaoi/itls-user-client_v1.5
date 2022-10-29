import axios from '../../axios'

/* 
 * 课程与课程实例-选课管理
 */

 const preUrl = "/course/choosing/";

// 学生 选课
export const chooseCourseInstance = (params) => {
  return axios({
      url: preUrl + 'stuChoose',
      method: 'get',
      params
  })
}

// 获取学生列表
export const findByCid = (params) => {
  return axios({
    url: preUrl + 'findByCid',
    method: 'get',
    params
  })
}

export const findPage = (data) => {
  return axios({
    url: preUrl + 'findPageByCid',
    method: 'post',
    data
  })
}

// 退选已选课的学生
export const remove = (data) => {
  return axios({
    url: preUrl + 'remove',
    method: 'post',
    data
  })
}

// 批量导入选课学生
export const bulkImportByCid = (data) => {
  return axios({
    url: preUrl + 'bulkImportByCid',
    method: 'post',
    data
  })
}

	// 下载excel模板
export const model = (data) => {
    return axios({
      url: preUrl + 'model',
      responseType: 'blob',
      method: 'post',
      data
    })
}








