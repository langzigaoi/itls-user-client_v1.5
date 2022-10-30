/*
 * 接口统一集成模块
 */

 // 系统接口
import * as user from './modules/user'
import * as problem from './modules/problem'
import * as course from './modules/course'
import * as knowledge from './modules/knowledge'
import * as metadata from './modules/metadata'
import * as search from './modules/search'
import * as getInfo from './modules/student'
import * as student from './modules/student'
import * as exam from './modules/exam'
import * as teacherTest from './modules/teacherTest'
import * as experiment from './modules/experiment'
import * as dashboard from './modules/dashboard'
import * as commentMenu from './modules/commentMenu'
import * as judger from './modules/judger'

// 元数据接口

// 默认全部导出
export default {
  user,
  commentMenu,
  problem,
  course,
  knowledge,
  metadata,
  search,
  getInfo,
  teacherTest,
  student,
  exam,
  experiment,
  dashboard,
  // student,
  judger
}
