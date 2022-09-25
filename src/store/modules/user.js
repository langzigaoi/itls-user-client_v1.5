export default {
    state: {
      isLogin:false,
      userInfo: {
          id: -1,
          username: "",
          account: "",
          courseId: ""
      },
      menuPerm: {},
      keyPerm: {}
    },
    getters: {
   
    },
    mutations: {
        recoverUserData(state, data) {
          // console.log("store")
          // console.log(state)
          // console.log(data)
          state.userInfo.id = data.id;
          state.userInfo.userNo = data.userNo;
          state.userInfo.username = data.username;
          state.userInfo.account = data.account;
          
          // let m = Object.values(data.menuPermission);
          // console.log(typeof m);
          

          state.menuPerm = data.menuPermission;

          state.keyPerm = data.keyPermission;
          state.isLogin = true;
        }
    },
    actions: {
    }
}