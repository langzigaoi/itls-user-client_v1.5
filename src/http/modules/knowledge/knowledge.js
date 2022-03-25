import axios from '../../axios'

/* 
 * 知识点-知识点管理
 */

 const preUrl = "/knowledge/knowledge/";

// 通过课程id查找所有知识点
export const findByCourseId = (params) => {
  return axios({
    url: preUrl + 'findByCourseId',
    method: 'get',
    params
  })
}
// 通过课程id查找
export const findById = (params) => {
  return axios({
    url: preUrl + 'findById',
    method: 'get',
    params
  })
}
// 修改知识点内容
export const update = (data) => {
  return axios({
    url: preUrl + 'update',
    method: 'patch',
    data
  })
}
// 修改知识点的orderId
export const updateOrderId = (data) => {
  return axios({
    url: preUrl + 'updateOrderId',
    method: 'patch',
    data
  })
}
// 上传数据文件
export const uploadExcel = (data) => {
  return axios({
    url: preUrl + 'uploadExcel',
    method: 'post',
    data
  })
}
// 通过deep查询知识点
export const selectByDeep = (params) => {
  return axios({
      url: preUrl + 'selectByDeep',
      method: 'get',
      params
  }) 
}
// 获取该课程节点下知识点数量
export const getAmount = (params) => {
  return axios({
      url: preUrl + 'getAmount',
      method: 'get',
      params
  }) 
}
// 1212
export const updateOrderIdById = (params) => {
  return axios({
    url: preUrl + 'updateOrderIdById',
    method: 'patch',
    params
  })
} 
export const selectListByIds = (params) => {
  return axios({
    url: preUrl + 'selectListByIds',
    method: 'get',
    params
  })
} 

export const findAllByCourse = (params) => {
  return axios({
    url: preUrl + 'findAllByCourse',
    method: 'get',
    params
  })
} 

// 根据讲Id查询知识点
export const selectBySectionId = (params) => {
  return axios({
      url: preUrl + 'selectBySectionId',
      method: 'get',
      params
  }) 
}

export const selectByDeepAndCourseId = (params) => {
  return axios({
      url: preUrl + 'selectByDeepAndCourseId',
      method: 'get',
      params
  }) 
}
// 根据课程实例的id去找到这个课程，然后再去找到这个课程关联的知识点，获取这些知识点
export const selectByDeepAndCinstance = (params) => {
  return axios({
      url: preUrl + 'selectByDeepAndCinstance',
      method: 'get',
      params
  }) 
}

// 查询某课程下所有知识点（后端未处理，交由前端处理）
export const findList = (params) => {
  return axios({
    url: preUrl + 'findList',
    method: 'get',
    params
  })
}
