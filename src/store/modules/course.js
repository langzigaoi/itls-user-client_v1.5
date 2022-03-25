export default {
    state: {
      courseCinstanceId:0,
      courseProblemTypeList: []
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
    },
    actions: {
    }
}