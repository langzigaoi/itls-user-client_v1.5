import axios from '../../axios'

/* 
 * 操作日志模块
 */

const preUrl = "/sys/log/";

// 删除
export const batchDelete = (data) => {
    return axios({
        url: preUrl + 'delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: preUrl + 'findPage',
        method: 'post',
        data
    })
}