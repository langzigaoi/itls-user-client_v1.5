/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

 // 用户端服务器地址
let SD = 'http://192.168.162.193:60101';  // 远程测试后端
let LD = 'http://localhost:60101';  // 本地测试后端
let ll = 'http://172.27.20.72:60101';

// 默认头像地址
let avatar = "https://langzigao.oss-cn-shenzhen.aliyuncs.com/2022/03/21/aba8f99e4af6492fb39f2d001abbfd37usr.png";

// export const baseUrl = ll
// export const baseUrl = LD
export const baseUrl = SD


export const avatarUrl = avatar

export default {
    baseUrl,
    avatarUrl
}