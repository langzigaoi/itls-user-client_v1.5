export default {
    state: {
      courseCinstanceId:0,
      courseProblemTypeList: [],
      courseId: 0,
      knowledge: [],
    },
    getters: {
   
    },
    mutations: {
      setcourseCinstanceIdFun(state, data) {
        state.courseCinstanceId = data;
      },
      setcourseProblemTypeList(state, data) {
        state.courseProblemTypeList = data;
      },
      setcourseId(state, data) {
        state.courseId = data;
      },
      setknowledge(state, data) {
        state.knowledge = data;
      },
    },
    actions: {
    }
}