import axios from '../../axios'

/* 
 * 菜单管理模块
 */

const preUrl = "/sys/menu/";

 // 保存
export const save = (data) => {
    return axios({
        url: preUrl + 'save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: preUrl + 'delete',
        method: 'post',
        data
    })
}
// 查找导航菜单树
export const findNavTree = (params) => {
    return axios({
        url: preUrl + 'findNavTree',
        method: 'get',
        params
    })
}
// 查找导航菜单树
export const findMenuTree = () => {
    return axios({
        url: preUrl + 'findMenuTree',
        method: 'get'
    })
}