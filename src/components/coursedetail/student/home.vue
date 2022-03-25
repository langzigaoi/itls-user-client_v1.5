<template>
  <div class="home">
    <div class="chead" style="padding: 20px 0; color: #fff">
      {{ courseInstance.courseName }} &nbsp;&nbsp;
      {{ this.dateFormate(new Date(courseInstance.startYear)) }}~
      {{ this.dateFormate(new Date(courseInstance.endYear)) }}
      &nbsp;&nbsp;第{{ courseInstance.semester }}学期
    </div>
    <div class="cmainbig">
      <div class="caside">
        <!-- <silde-bar></silde-bar> -->
        <el-menu
          :default-active="menuIndex"
          :collapse="isCollapse"
          style="min-height: 90vh; min-width: 157px"
          :router="true"
          :unique-opened="true"
          background-color="#ffffff"
          text-color="#0d0e0f"
          active-text-color="#14889a"
          align="left"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="fa fa-pie-chart"></i>
              <span style="font-size: 1em">  仪表盘</span>
            </template>
            <el-menu-item
              index="/studycourse/taskanalysis"
              style="min-width: auto"
              >作业统计分析</el-menu-item
            >
            <el-menu-item
              index="/studycourse/testanalysis"
              style="min-width: auto"
              >测试统计分析</el-menu-item
            >
            <el-menu-item
              index="/studycourse/experimentanalysis"
              style="min-width: auto"
              >实验统计分析</el-menu-item
            >
            <el-menu-item index="" style="min-width: auto"
              >知识路径分析</el-menu-item
            >
            <el-menu-item index="" style="min-width: auto"
              >网络时空统计</el-menu-item
            >
            <el-menu-item index="" style="min-width: auto"
              >个性化推荐</el-menu-item
            >
          </el-submenu>
          <el-submenu index="">
            <template slot="title">
              <i class="fa fa-book"></i>
              <span style="font-size: 1em">  课程介绍</span>
            </template>
            <el-menu-item
              index="/studycourse/courseintroduce"
              style="min-width: auto"
            >
              <i class="fa fa-file-text"></i> <span>基本信息</span>
            </el-menu-item>
            <el-menu-item
              index="/studycourse/coursetarget"
              style="min-width: auto"
            >
              <i class="fa fa-tag"></i>课程目标</el-menu-item
            >
            <el-menu-item
              index="/studycourse/examineevaluate"
              style="min-width: auto"
              >考核评价</el-menu-item
            >
          </el-submenu>
          <!-- v-if="hasMenu('/studycourse/students')" -->
          <!-- <el-menu-item  index="/studycourse/students"><i class="fa fa-file-text"></i> <span>选课学生</span>
          </el-menu-item> -->
          <!-- v-if="hasMenu('/studycourse/teachingteam')" -->
          <el-menu-item
            index="/studycourse/teachingteam"
            style="min-width: auto"
          >
            <i class="fa fa-users" aria-hidden="true"></i>
            <span>  教学团队</span></el-menu-item
          >
          <el-menu-item
            v-if="hasMenu('/studycourse/coursecontent')"
            index="/studycourse/coursecontent"
            style="min-width: auto"
          >
            <i class="fa fa-file-powerpoint-o"></i><span>课程内容</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <span style="font-size: 1em"
                ><i class="fa fa-table" aria-hidden="true"></i> 作业与测验</span
              >
            </template>
            <el-menu-item
              index="/studycourse/coursehomework"
              style="min-width: auto"
              ><span>作业</span></el-menu-item
            >
            <el-menu-item
              index="/studycourse/coursestudenttest"
              style="min-width: auto"
              ><span>测验</span></el-menu-item
            >
          </el-submenu>
          <!-- v-if="hasMenu('/studycourse/coursetest')" -->
          <el-menu-item
            v-if="hasMenu('/studycourse/coursetest')"
            index="/studycourse/courseExperiment"
            style="min-width: auto"
            ><i class="fa fa-cubes"></i>
            <span>  课程实验</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <!-- <i class="el-icon-odometer"></i> -->
              <span style="font-size: 1em"
                ><i class="fa fa-table" aria-hidden="true"></i> 课程考试</span
              >
            </template>
            <!-- v-if="hasMenu('/studycourse/courseexam')" -->
            <el-menu-item index="/studycourse/unitexam" style="min-width: auto"
              ><span>单元考试</span></el-menu-item
            >
            <el-menu-item
              index="/studycourse/midsemester"
              style="min-width: auto"
              ><span>期中考试</span></el-menu-item
            >
            <el-menu-item index="/studycourse/finalexam" style="min-width: auto"
              ><span>期末考试</span></el-menu-item
            >
          </el-submenu>
          <!-- v-if="hasMenu('/studycourse/courseitem')" -->
          <el-menu-item index="/studycourse/courseitem" style="min-width: auto"
            ><span
              ><i class="fa fa-hdd-o" aria-hidden="true"></i> 课程项目</span
            ></el-menu-item
          >
          <el-menu-item index="" style="min-width: auto"
            ><span>  知识图谱</span></el-menu-item
          >
          <el-submenu index="5">
            <template slot="title">
              <span style="font-size: 1em"
                ><i class="fa fa-table" aria-hidden="true"></i> 讨论区</span
              >
            </template>
            <el-menu-item
              index="/studycourse/commentstu"
              style="min-width: auto"
              ><span>讨论区主界面</span></el-menu-item
            >
            <el-menu-item
              index="/studycourse/stutoteacher"
              style="min-width: auto"
              ><span>老师答疑区</span></el-menu-item
            >
          </el-submenu>
          <el-menu-item index="/home/studentcourse" style="min-width: auto"
            ><span>  回到主页</span></el-menu-item
          >
        </el-menu>
      </div>
      <div class="cmain">
        <!-- <v-tags></v-tags> -->
        <!-- <breadbox></breadbox>   -->
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
     <footer class="footer">
        <p>©2020-2022 | 赣南师范大学 大数据与计算智能研究组</p>
      </footer>
  </div>
</template>

<script>
import vTags from "../../common/Tags";
// import Breadbox from "./BreadBox.vue";
// import sildeBar from "./subcomponent/SildeBar";

export default {
  // components: { Breadbox, vTags, sildeBar },
  components: { vTags },
  data() {
    return {
      menuIndex: this.$route.path,
      isCollapse: false,
      //courseId:null,
      courseInstance: {}, //显示在head的信息
    };
  },
  computed: {},
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

    console.log("课程实例的id：", this.$route.query.id);
    //this.courseId=this.$route.params.courseid;
    if (this.$route.query.id)
      this.$store.commit("setcourseCinstanceIdFun", this.$route.query.id); //保存课程实例的id后面 子组件要用到
    this.findACourseInstance();
  },
  methods: {
    //获取课程实例详情 显示head里面
    findACourseInstance() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.courseInstance = res.data;
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
.home {
  width: 100%;
  /* display: flex; */
  display: flex;
  flex-direction: column;
}
.home /deep/.el-submenu__title:hover {
   background-color: #b9dbe0 !important; 
}
.el-menu-item:hover{
  background-color: #b9dbe0 !important;
}
.el-menu-item:is-active{
  background-color: #14889a !important;
}
.el-menu-item[data-v-edab3ee2] {
    border: 1px  #14889a;
}
.chead {
  width: 100%;
  background-color: #14889a;
} 
.el-button--primary {
    color: #FFF;
    background-color: #14889a;
    border-color: #14889a;
}
.cmainbig {
  /* flex: 1; */
  display: flex;
  /* grid-template-columns: repeat(100px,auto-fill); */
  grid-template-columns: 10% 90%;
  /* 可以保证caside和cmain的高度一样 */
  min-height: 0;
  /* display: flex; */
  align-items: stretch;
  width: 100%;
}

.caside {
  background-color: #14889a;
  flex: 1;
}
.caside:hover {
  background-color: #14889a;
}
.cmain {
   /* overflow-y: scroll;  */
   flex: 9;
}

.el-menu {
    /* border: 1px solid #ccc; */
    box-shadow: 3px 3px 5px #ccc;
}
.el-menu-item {
  border: 1px  #14889a;
}

.cfoot {
  margin-top: auto;
  background-color: #dee1e6;
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
  }
</style>