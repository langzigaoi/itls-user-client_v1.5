import axios from '../../axios'

/* 
 * 填空题管理模块
 */ 

const preUrl = "/problem/filling/";

// 查询填空题列表
export const findAll = (params) => {
    return axios({
        url: preUrl + 'findAll',
        method: 'post',
        params
    })
}

export const findPage = (data) => {
    return axios({
        url: preUrl + 'findPage',
        method: 'post',
        data
    })
}

export const findByKid = (data) => {
    return axios({
        url: preUrl + 'findPageByKid',
        method: 'post',
        data
    })
}


// 根据知识点获取题目
export const findProblemFilling = (params) => {
    return axios({
        url: preUrl + 'findProblemFilling',
        method: 'get',
        params
    })
}

export const findById = (params) => {
    return axios({
        url: preUrl + 'findById',
        method: 'get',
        params
    })
}
// 查询个人填空题列表
export const findPersonList = (params) => {
    return axios({
        url: preUrl + 'findPer',
        method: 'post',
        params
    })
}

// 查询个人填空题列表
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
        method: 'delete',
        data
    })
}

// 新增
export const add = (data) => {
    return axios({
        url: preUrl + 'add',
        method: 'post',
        data
    })
}

// 修改
export const update = (data) => {
    return axios({
        url: preUrl + 'update',
        method: 'patch',
        data
    })
}