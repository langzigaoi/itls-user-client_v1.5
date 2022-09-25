import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '@/utils/global'
import permission from '@/utils/permission'
import api from './http'
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import moment from 'moment'

import '/public/static/plugins/UEditor/ueditor.config.js'
import '/public/static/plugins/UEditor/ueditor.all.min.js'
import '/public/static/plugins/UEditor/lang/zh-cn/zh-cn.js'
import '/public/static/plugins/UEditor/ueditor.parse.min.js'
import '/public/static/plugins/UEditor/themes/default/css/ueditor.css'
import '/public/static/plugins/UEditor/kityformula-plugin/addKityFormulaDialog.js'
import '/public/static/plugins/UEditor/kityformula-plugin/defaultFilterFix.js'
import '/public/static/plugins/UEditor/kityformula-plugin/getKfContent.js'


Vue.prototype.global = global // 挂载全局配置模块
Vue.prototype.hasMenu = permission.hasMenuPerm // 菜单权限判断
Vue.prototype.hasKey = permission.hasKeyPerm // 按钮权限判断
Vue.prototype.$moment = moment //时间

//在axios中可以发送数组
import qs from 'qs'
//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象 
Vue.prototype.$qs = qs

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.use(api)  // 注册使用API模块
Vue.use(VueCodemirror, { 
  options: { theme: '3024-night'},
  events: ['scroll']
} )


// 全局css
import './assets/css/globecss.css'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//引入font-awesome
import 'font-awesome/css/font-awesome.min.css' 

//  自定义全局方法
import globalFunctions from './utils/global-functions'
import globalEntity from './utils/global-entity'
Vue.use(globalFunctions)
Vue.use(globalEntity)


//刷新保存状态
if (sessionStorage.getItem("store")) {
  store.replaceState(
      Object.assign(
          {},
          store.state,
          JSON.parse(sessionStorage.getItem("store"))
      )
  );
  sessionStorage.removeItem("store")
}
//监听，在页面刷新时将vuex里的信息保存到sessionStorage里
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("store", JSON.stringify(store.state));
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
