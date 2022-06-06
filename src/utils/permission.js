import store from '../store'
/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

 // 按钮权限
function hasKeyPerm(perms) {
    let hasPermission = false
    let permissions = store.state.user.keyPerm
<<<<<<< HEAD
    for(let i = 0, len=permissions.length; i<len; i++) {
=======
    for(let i=0;i<permissions.length;i++) {
>>>>>>> 455d3dfb784042487a4ec2c2670ef0e67413ae68
        if(permissions[i] === perms) {
            hasPermission = true;
            break
        }
    }
    return hasPermission
}

// 菜单权限
function hasMenuPerm(perms) {
    let hasPermission = false
    let permissions = store.state.user.menuPerm
<<<<<<< HEAD
    var l = permissions.length
    for(let i = 0; i< l; i++) {
=======
    for(let i=0; i<permissions.length; i++) {
>>>>>>> 455d3dfb784042487a4ec2c2670ef0e67413ae68
        if(permissions[i] === perms) {
            hasPermission = true;
            break
        }
    }
    return hasPermission
}

export default {
  hasKeyPerm,
  hasMenuPerm
}