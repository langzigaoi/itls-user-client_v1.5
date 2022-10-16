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

// 上传excel文件
export const upload = (data) => {
    return axios({
        url: '/knowledge/knowledge/upload',
        headers: {'Content-Type': 'multipart/form-data'},
        method: 'post',
        data: data
    })
}

// 通过课程id查找
export const find = (params) => {
    return axios({
        url: preUrl + 'findById',
        method: 'get',
        params
    })
}

export const removeById = (data) => {
    return axios({
        url: preUrl + 'remove',
        method: 'post',
        data
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

export const add = (data) => {
    return axios({
        url: preUrl + 'add',
        method: 'post',
        data
    })
}

/*

// 通过deep查询知识点
export const selectByDeep = (params) => {
  return axios({
      url: preUrl + 'selectByDeep',
      method: 'get',
      params
  })
}

// 1212

export const updateOrderIdById = (params) =>
  return axios({
    url: preUrl + 'updateOrderIdById',
    method: 'patch',
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

 */


// 根据讲Id查询知识点
export const selectBySectionId = (params) => {
  return axios({
      url: preUrl + 'selectBySectionId',
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

// 查询某课程下所有知识点(后端已处理)
export const findKnowledge = async (params) => {
    return axios({
        url: preUrl + 'findKnowledge',
        method: 'get',
        params
    })
}
