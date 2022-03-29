<template>
  <div class="homediv" style="display: flex; height: 100vh">
    <el-container>
      <el-header>
        程序设计智慧教学平台
        <span></span>
      </el-header>
      <el-container>
        <el-aside class="aside" width="10%">
          <ul>

            <router-link
              v-if="hasMenu('/home/teacherselfcenter')"
              to="/home/teacherselfcenter">
              <li :class="{ active: onRoutes.path == '/home/teacherselfcenter' }">
                <i class="el-icon-user"> 个人中心</i>
              </li>
            </router-link>

            <router-link v-if="hasMenu('/home/studentselfcenter')" to="/home/studentselfcenter">
              <li :class="{ active: onRoutes.path == '/home/studentselfcenter' }">
                <i class="el-icon-user"> 个人中心</i>
              </li>
            </router-link>

            <!-- {{userinfo}} -->
            <!-- <router-link to="/home/teachercourse"><li>教授课程<i class="el-icon-date"></i></li></router-link>
              <router-link to="/home/studentCourse"><li>学习课程<i class="el-icon-document"></i></li></router-link> -->
            <router-link
              v-if="hasMenu('/home/teacherCourse')"
              to="/home/teachercourse"
            >
              <li :class="{ active: onRoutes.path == '/home/teachercourse' }">
                <i class="el-icon-date"> 教授课程</i>
              </li>
            </router-link>

            <router-link
              v-if="hasMenu('/home/studentCourse')"
              to="/home/studentCourse"
            >
              <li :class="{ active: onRoutes.path == '/home/studentCourse' }">
                <i class="el-icon-document"> 学习课程</i>
              </li>
            </router-link>
            
            <router-link to="/">
              <li>
                <i class="el-icon-bicycle">退出</i>
              </li>
            </router-link>
          </ul>
        </el-aside>
        <el-main class="main">
          <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              v-for="(item, index) in navPath"
              :to="item.path"
              :key="index"
              >{{ item.name | routeToName }}</el-breadcrumb-item
            >
          </el-breadcrumb> -->
          <router-view></router-view>
        </el-main>
      </el-container>
      <footer class="footer">
        <p>©2020-2021 | 赣南师范大学 大数据与计算智能研究组</p>
      </footer>
    </el-container>
  </div>
</template>
<script>
// import KnowledgeLog from "../home/TeacherCourse/KnowledgeLogUser"
export default {
  // components:{KnowledgeLog},
  data() {
    return {
      navPath: [],
      onRoutes: null,
    };
  },
  mounted() {
    // 刷新时获取用户数据
    if (!this.$store.state.user.userInfo.isLogin) {
      var data = localStorage.getItem("uInfo");
      if (data) data = JSON.parse(data);
      if (data) {
        console.log("恢复用户数据");
        console.log(data);
        this.$store.commit("recoverUserData", data);
      }
    }

    console.log(this.hasKey("home:selfcenter:view"));
    console.log(this.hasMenu("/home"));

    console.log(this.$store.state.user.userInfo);
  },
  computed: {
    userinfo() {
      return this.$store.state.user.userInfo;
    },
    onRoutes1() {
      console.log("计算属性", this.$route.path.replace("/", ""));
      return this.$route.path;
    },
  },
  methods: {},
  //路由名称转换的过滤器
  filters: {
    routeToName: (url) => {
      return url
        .replace("Home", "首页")
        .replace("SelfCenter", "个人中心")
        .replace("TeacherCourse", "教授课程")
        .replace("auditKnowledge", "审核知识点")
        .replace("Knowledge", "图谱编辑")
        .replace("StudentCourse", "学习课程")
        .replace("AlterPwd", "修改密码");
    },
  },
  //利用路由制作面包屑
  watch: {
    $route: {
      handler(val, oldval) {
        this.onRoutes = val;
        console.log(this.onRoutes);
        if (oldval == undefined) return;
        //console.log("新路由信息")
        //console.log(val);//新路由信息
        //console.log("老路由信息")
        //console.log(oldval);//老路由信息
        if (val.path === oldval.path) return;
        this.navPath = val.matched;
      },
      immediate: true, // 一旦监听到路由的变化立即执行
      // 深度观察监听
      deep: true,
    },
  },
};
</script>
<style>
/* 更改element-UI按钮样式 */
.el-button--primary {
  color: #fff;
  background-color: #14889a;
  border-color: #14889a;
}
.el-button--primary:hover {
  background-color: #61b6c4;
  border-color: #61b6c4;
}
.el-button--primary:focus {
  background-color: #14889a;
  border-color: #14889a;
}
.el-button--default:hover {
  color: #14889a;
  border-color: #14889a;
}
.el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input__inner:focus {
  border-color: #14889a;
}
.el-select .el-input.is-focus .el-input__inner:focus {
  border-color: #14889a;
}
.el-select-dropdown__item.selected {
  color: #14889a;
  font-weight: 700;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #14889a;
  border-color: #14889a;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #14889a;
}
.el-header,
.el-footer {
  background-color: #14889a;
  color: #ffffff;
  display: flex;
  align-items: center;
  /**垂直居中*/
  justify-content: center;
  /**水平居中*/
  font-size: 20px;
}
.footer {
  background-color: #14889a;
  color: #ffffff;
  display: flex;
  align-items: center;
  /**垂直居中*/
  justify-content: center;
  /**水平居中*/
  padding: 15px;
  height: 1px;
}
.footer p {
  font-size: 0.8em;
  font-family: "黑体", Cochin, Georgia, Times, "Times New Roman", serif;
  letter-spacing: 5px;
}
.aside {
  min-width: 130px;
}
.el-aside ul {
  flex: 1;
  background-color: #ffffff;
  height: 100%;
  font-size: 0.7em;
}

.el-aside ul li {
  padding: 10px 0 10px 0;
  padding-bottom: 20px;
  /* border-bottom: 2px solid #663366; */
  color: #0d0e0f;
  font-size: 14px;
}

.el-aside ul li:hover {
  background-color: #7bcce04d;
  /* color: blue; */
}

.el-aside ul li:first-child {
  padding-top: 20px;
}
.main {
  flex: 9;
}
/* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;

  } */
/*   
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  } */
.active {
  /* color: #14889a; */
  background-color: #7bcce04d;
  /* color: #111; */
}
</style>