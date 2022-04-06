<template>
  <div class="homediv" style="display: flex; height: 100vh">
    <el-container>

      <el-header class="header">
        程序设计智慧教学平台
        <span></span>
      </el-header>

      <el-container>
        <el-aside class="aside" width="150px">
          <el-menu
              :router="true"
              :unique-opened="true"
              align="left"
              class="menu"
              text-color="#0d0e0f"
              active-text-color="#14889a"
           > 
              <!-- 教师 -->
              <el-menu-item
                v-if="hasMenu('/home/teacherselfcenter')"
                style="min-width: auto"
                index="/home/teacherselfcenter"
              >
              <i class="el-icon-user"></i>个人中心
              </el-menu-item>

              <el-menu-item
                v-if="hasMenu('/home/teacherCourse')"
                style="min-width: auto"
                index="/home/teachercourse"
              >
              <i class="el-icon-star-off"></i>教授课程
              </el-menu-item>

              <!-- 学生 -->
              <el-menu-item
                v-if="hasMenu('/home/studentselfcenter')"
                style="min-width: auto"
                index="/home/studentselfcenter"
              >
              <i class="el-icon-user"></i>个人中心
              </el-menu-item>

              <el-menu-item
                v-if="hasMenu('/home/studentCourse')"
                style="min-width: auto"
                index="/home/studentCourse"
              >
              <i class="el-icon-star-off"></i>学习课程
              </el-menu-item>

              <el-menu-item
                style="min-width: auto"
                index="/"
              >
              <i class="el-icon-arrow-left"></i>退出
              </el-menu-item>

            </el-menu>
        </el-aside>

        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>

      <footer class="footer">
        <p>©2020-2022 | 赣南师范大学 大数据与计算智能研究组</p>
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

    // console.log(this.hasKey("home:selfcenter:view"));
    // console.log(this.hasMenu("/home"));
    // console.log(this.$store.state.user.userInfo);
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
  methods: {
    toOtherPathOthers(path) {
      this.$router.push({
        path: path,
        query: {
          courseid: this.courseInstance.courseId,
        },
      });
    },
  },
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

.header {
  position: relative;
  width: 100%;
  height: 30px;  
  background-color: #14889a;
  color: #ffffff;
  display: flex;
  align-items: center;
  /**垂直居中*/
  justify-content: center;
  /**水平居中*/
  font-size: 20px;
}

.main {
  flex: 9;
  position: absolute;
  left: 150px;
  right: 0;
  top: 60px;
  bottom: 32px;
  overflow-y: scroll;
}

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
}

.active {
  /* color: #14889a; */
  background-color: #7bcce04d;
  /* color: #111; */
}
</style>