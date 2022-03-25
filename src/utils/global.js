/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

 // 用户端服务器地址
let SD = 'http://192.168.162.193:60101';  // 远程测试后端
let LD = 'http://localhost:60101';  // 本地测试后端

// export const baseUrl = SD
export const baseUrl = LD

export default {
    baseUrl
}