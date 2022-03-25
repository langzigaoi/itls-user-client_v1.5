import axios from '../../axios'
import qs from 'qs' // 使用qs对post传送的据序列化

/* 
 * 操作日志模块
 */

const preUrl = "/sys/loginlog/";

// 删除
export const batchDelete = (data) => {
    return axios({
        url: preUrl + 'delete',
        method: 'post',
        data: data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: preUrl + 'findPage',
        method: 'post',
        data: data
    })
}