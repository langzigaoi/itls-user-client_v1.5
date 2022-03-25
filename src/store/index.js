import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

// 引入子模块
import user from './modules/user'
import course from './modules/course'

const store = new vuex.Store({
    modules: {
        user: user,
        course: course,
    }
})

export default store