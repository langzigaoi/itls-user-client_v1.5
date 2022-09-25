<template>
  <div class="homediv" style="display: flex; height: 100vh">
    <el-container>
      <el-header class="head"> 
        <el-row>
          <el-col>
            <div class="system">程序设计智慧教学平台</div>
          </el-col>
          <el-col>
            <div class="course">{{ courseInstance.courseName }}
              &nbsp;&nbsp;{{this.dateFormate(new Date(courseInstance.startYear))}}~{{ this.dateFormate(new Date(courseInstance.endYear)) }} &nbsp;&nbsp;
              第{{courseInstance.semester}}学期</div>
          </el-col>
        </el-row>
        

        </el-header>

      <el-container>
        <el-aside class="aside" >
          <el-menu
            :default-active="menuIndex"
            :collapse="isCollapse"
            style="width: 160px"
            :router="true"
            :unique-opened="true"
            background-color="#ffffff"
            text-color="#0d0e0f"
            active-text-color="#14889a"
            align="left" >
          
              <el-submenu index="1" style="width: 160px">
                <template title slot="title">
                  <i class="el-icon-odometer"></i>
                  <span >  仪表盘</span>
                </template>

                <el-menu-item
                  index="/studycourse/taskanalysis"
                  >
                  <i class="el-icon-data-line"></i>作业统计分析</el-menu-item
                >
                <el-menu-item
                  index="/studycourse/testanalysis"
                  >
                  <i class="el-icon-data-line"></i>测试统计分析</el-menu-item
                >
                <el-menu-item
                  index="/studycourse/experimentanalysis"
                  >
                  <i class="el-icon-data-line"></i>实验统计分析</el-menu-item
                >
                <el-menu-item index="" 
                  >
                  <i class="el-icon-data-line"></i>知识路径分析</el-menu-item
                >
                <el-menu-item index="" 
                  >
                  <i class="el-icon-data-line"></i>网络时空统计</el-menu-item
                >
                <el-menu-item index="" 
                  >
                  <i class="el-icon-data-line"></i>个性化推荐</el-menu-item
                >
             </el-submenu>

             <el-submenu index="" style="width: 160px" >
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span style="font-size: 1em">  课程介绍</span>
                </template>

                <el-menu-item
                  index="/studycourse/courseintroduce"
                  style="min-width: auto"
                >
                  <i class="el-icon-tickets"></i> <span>基本信息</span>
                </el-menu-item>
                <el-menu-item
                  index="/studycourse/coursetarget"
                  style="min-width: auto"
                >
                  <i class="el-icon-data-board"></i>课程目标</el-menu-item
                >
                <el-menu-item
                  index="/studycourse/examineevaluate"
                  style="min-width: auto"
                  >
                  <i class="el-icon-news"></i>考核评价</el-menu-item
                >
              </el-submenu>

              <el-menu-item
                index="/studycourse/teachingteam"
                style="width: 160px"
              >
                <i class="el-icon-user" aria-hidden="true"></i>
                <span>  教学团队</span></el-menu-item
              >
              <el-menu-item
                v-if="hasMenu('/studycourse/coursecontent')"
                index="/studycourse/coursecontent"
                style="width: 160px"
              >
                <i class="el-icon-notebook-1"></i><span>课程内容</span>
              </el-menu-item>

              <el-submenu index="2">
                <template slot="title">
                  <span style="font-size: 1em"
                    ><i class="el-icon-edit-outline" aria-hidden="true"></i> 作业与测验</span
                  >
                </template>
                <el-menu-item
                  index="/studycourse/coursehomework"
                  style="width: 160px"
                  >
                  <i class="el-icon-edit"></i>作业</el-menu-item
                >
                <el-menu-item
                  index="/studycourse/coursestudenttest"
                  style="width: 160px"
                  >
                  <i class="el-icon-edit"></i>测验</el-menu-item
                >
              </el-submenu>

              <el-menu-item
                v-if="hasMenu('/studycourse/coursetest')"
                index="/studycourse/courseExperiment"
                style="width: 160px"
                ><i class="el-icon-suitcase"></i>
                <span>  课程实验</span>
              </el-menu-item>



              <el-menu-item
                index="/studycourse/examList"
                style="width: 160px"
              >
                <i class="el-icon-finished"></i><span>课程考试</span>
              </el-menu-item>



              <el-menu-item index="/studycourse/courseitem" style="width: 160px"
                >
                <i class="el-icon-office-building"></i> 课程项目</el-menu-item
              >

              <el-menu-item index="" style="width: 160px"
                >
                <i class="el-icon-share"></i>知识图谱</el-menu-item
              >

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-s-comment" aria-hidden="true"></i> 讨论区
                </template>
                <el-menu-item
                  index="/studycourse/commentstu"
                  style="min-width: auto"
                  >
                  <i class="el-icon-chat-round"></i>讨论区主界面</el-menu-item
                >
                <el-menu-item
                  index="/studycourse/stutoteacher"
                  style="min-width: auto"
                  >
                  <i class="el-icon-chat-line-round"></i>老师答疑区</el-menu-item
                >
              </el-submenu>

              <el-menu-item index="/home/studentcourse" 
                  style="min-width: auto"
                >
                <i class="el-icon-arrow-left"></i>回到主页</el-menu-item
              >









          </el-menu>
          
            
        </el-aside>

        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>

      <footer class="foot">
        <p>©2020-2022 | 赣南师范大学 大数据与计算智能研究组</p>
      </footer>
    </el-container>
  </div>
</template>

<script>
import vTags from "../../common/Tags";
export default {
  components: { 
    vTags 
  },
  computed: {},

  data() {
    return {
      menuIndex: this.$route.path,
      isCollapse: false,
      //courseId:null,
      courseInstance: null, //显示在head的信息
    };
  },

  mounted() {
    // 刷新时获取用户数据
    if (!this.$store.state.user.userInfo.isLogin) {
      var data = localStorage.getItem("uInfo");
      if (data) data = JSON.parse(data);
      if (data) {
        // console.log("恢复用户数据");
        // console.log(data);
        this.$store.commit("recoverUserData", data);
      }
    }
    // console.log(this.hasKey("home:selfcenter:view"));
    // console.log(this.hasMenu("/home"));
    // console.log(this.$store.state.user.userInfo);
    // console.log("课程实例的id：", this.$route.query.id);
    //this.courseId=this.$route.params.courseid;
    if (this.$route.query.id) {
      this.$store.commit("setcourseCinstanceIdFun", this.$route.query.id); //保存课程实例的id后面 子组件要用到
    }
    this.findACourseInstance();

  },

  methods: {
    //获取课程实例详情 显示head里面
    findACourseInstance() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.courseInstance = res.data;
          this.$store.commit("setcourseId", this.courseInstance.courseId);
        });
    },
    //改变菜单折叠展开状态
    changeisCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    _isMobile() {
      //判断是手机还是PC
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
};
</script>
<style scoped>
.head {
  position: relative;
  width: 100%;
  background-color: #14889a;
  color: #ffffff;
  display: flex;
  align-items: center;
  /**垂直居中*/
  justify-content: center;
  /**水平居中*/
}
.system {
  font-size: 20px;
  margin-bottom: 3px;

}
.course {
  font-size: 15px;
  
  margin-bottom: 1px;
  

}

.aside {
  /* min-width: 130px;
  max-width: 130px; */
  max-height: 87vh;
  max-width: 170px;
  overflow-y: scroll;
}
.el-aside::-webkit-scrollbar {
     display: none;
}

.submenu {
  height: 50px;

}
.el-menu-item {
  min-width: auto;
}
.el-submenu /deep/ .el-submenu__title:hover {
  background-color: #b9dbe0 !important;
}
.el-menu-item:hover {
  background-color: #b9dbe0 !important;
}
.el-menu-item:is-active {
  background-color: #14889a !important;
}


.main {
  flex: 9;
  position: absolute;
  left: 150px;
  right: 0;
  top: 60px;
  bottom: 42px;
  overflow-y: scroll;
}

.foot {
  background-color: #14889a;
  color: #ffffff;
  display: flex;
  align-items: center;
  /**垂直居中*/
  justify-content: center;
  /**水平居中*/
  padding: 5px;
  height: 30px;
}
.footer p {
  font-size: 0.6em;
  font-family: "宋体", Cochin, Georgia, Times, "Times New Roman", serif;
  letter-spacing: 5px;
}


</style>