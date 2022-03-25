/**
 * 实体类全局方法
 */

exports.install = function(Vue, options) {
  // 层次实体类
  Vue.prototype.levelEntity = function() {
    return {
      id: undefined,
      name: undefined,
      code: undefined
    }
  }
  // 课程实体类
  Vue.prototype.courseEntity = function() {
    return {
      id: undefined,
      code: undefined,
      name: undefined,
      teacherNo: undefined,
      teacherName: undefined,
      level: undefined,
      levelName: undefined,
      type1Id: undefined,
      type1Name: undefined,
      type2Id: undefined,
      type2Name: undefined,
      isPub: undefined,
      isDeleted: undefined,
      createTime: undefined
    }
  }
  
  // 用户实体类
  Vue.prototype.courseEntity = function() {
    return {
      id: undefined,
      no: undefined,
      name: undefined,
      sex: undefined,
      entranceYear: undefined,
      birthday: undefined,
      intro: undefined,
      majorId: undefined,
      classId: undefined,
      title: undefined,
      telNum: undefined,
      email: undefined,
      password: undefined,
      registerDate: undefined,
      lastUpdateTime: undefined,
      status: undefined,
      delFlag: undefined,
      identity: undefined,
      avator: undefined,
      userRoles:[]
    }
  }
}