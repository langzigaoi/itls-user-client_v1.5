<template>
  <div class="home" v-if="courseInstance != null">
    <div class="chead" style="padding: 10px 0; color: #fff">
      <!-- <i v-if="!isCollapse" @click="changeisCollapse()" class="el-icon-s-fold" style="font-size:1.4em;float:left;margin-left:10px"></i>
    <i v-else @click="changeisCollapse()" class="el-icon-s-unfold" style="font-size:1.4em;float:left;margin-left:10px"></i>   -->
      <!-- 课程管理{{courseInstance}} -->
      {{ courseInstance.courseName }} &nbsp;&nbsp;{{
        this.dateFormate(new Date(courseInstance.startYear))
      }}
      ~
      {{ this.dateFormate(new Date(courseInstance.endYear)) }} &nbsp;&nbsp;第{{
        courseInstance.semester
      }}学期
    </div>

    <div class="cmainbig">
      <div class="caside">
        <el-menu
          :default-active="menuIndex"
          :collapse="isCollapse"
          :router="true"
          :unique-opened="true"
          align="left"
          class="menu"
          text-color="#0d0e0f"
          active-text-color="#14889a"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="fa fa-pie-chart"></i>
              <span style="font-size: 1em"> 仪表盘</span>
            </template>

            <el-menu-item
              v-if="hasMenu('/course/student')"
              index="/course/student"
              style="min-width: auto"
              >选课学生
            </el-menu-item>

            <el-menu-item
              v-if="hasMenu('/course/atlasAnalyze')"
              index="/course/atlasAnalyze"
              style="min-width: auto"
            >
              图谱分析</el-menu-item
            >

            <el-menu-item
              v-if="hasMenu('/course/teachingAnalyze')"
              index="/course/teachingAnalyze"
              style="min-width: auto"
              >教学分析</el-menu-item
            >
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="fa fa-book"></i>
              <span style="font-size: 1em"> 课程介绍</span>
            </template>

            <el-menu-item
              v-if="hasMenu('/course/courseintroduce')"
              index="/course/courseintroduce"
              style="min-width: auto"
            >
              <i class="fa fa-file-text"></i> <span>基本信息</span>
            </el-menu-item>

            <el-menu-item index="/course/coursetarget" style="min-width: auto">
              <i class="fa fa-tag"></i>课程目标</el-menu-item
            >

            <el-menu-item
              index="/course/examineevaluate"
              style="min-width: auto"
              >考核评价</el-menu-item
            >
          </el-submenu>

          <el-menu-item
            v-if="hasMenu('/course/teachingTeam')"
            index="/course/teachingTeam"
            style="min-width: auto"
          >
            <i class="fa fa-users" aria-hidden="true"></i>
            <span> 教学团队</span></el-menu-item
          >
          <el-menu-item
            v-if="hasMenu('/course/courseContent')"
            index="/course/courseContent"
            style="min-width: auto"
          >
            <i class="fa fa-file-powerpoint-o"></i> <span> 课程内容</span>
          </el-menu-item>

          <el-menu-item index="/course/searchExperiment" 
            ><i class="fa fa-cubes"></i><span> 课程实验</span>
          </el-menu-item>

          <el-submenu index="3">
            <template slot="title">
              <span style="font-size: 1em"
                ><i class="fa fa-table" aria-hidden="true"></i> 课程考试</span
              >
            </template>

            <el-menu-item index="/course/unitExam" style="min-width: auto"
              ><span>单元考试</span>
            </el-menu-item>

            <el-menu-item index="/course/midsemester" style="min-width: auto"
              ><span>期中考试</span>
            </el-menu-item>

            <el-menu-item index="/course/finalExam" style="min-width: auto"
              ><span>期末考试</span>
            </el-menu-item>
          </el-submenu>

          <el-menu-item index="" style="min-width: auto">
            <span>
              <i class="fa fa-hdd-o" aria-hidden="true"></i> 课程项目</span
            >
          </el-menu-item>

          <div>
            <el-submenu index="5">
              <template slot="title">
                <i class="fa fa-gitlab"></i>
                <span style="font-size: 1em"> 题库编辑</span>
              </template>

              <el-menu-item
                v-if="
                  hasMenu('/course/problemChoice') && hasProblemType('单选题')
                "
                index="/course/problemChoice"
                style="min-width: auto"
                @click="
                  toOtherPathWithId('/course/problemChoice', $route.query.id)
                "
                ><span>单选题</span>
              </el-menu-item>

              <el-menu-item
                style="min-width: auto"
                v-if="hasProblemType('多选题')"
                ><span>多选题</span>
              </el-menu-item>
              <el-menu-item
                index="/course/problemFilling"
                style="min-width: auto"
                v-if="hasProblemType('填空题')"
                ><span>填空题</span></el-menu-item
              >
              <el-menu-item
                index="/course/problemJudgment"
                style="min-width: auto"
                v-if="hasProblemType('判断题')"
                ><span>判断题</span></el-menu-item
              >
              <el-menu-item
                style="min-width: auto"
                v-if="hasProblemType('简答题')"
                ><span>简答题</span></el-menu-item
              >
              <el-menu-item
                index="/course/problemProg"
                style="min-width: auto"
                v-if="hasProblemType('编程题')"
                ><span>编程题</span></el-menu-item
              >
              <!-- <el-menu-item
                index="/course/problemProgram"
                style="min-width: auto"
                ><span>编程题lgy</span></el-menu-item
              > -->
              <el-menu-item
                index="/course/problemApplication"
                style="min-width: auto"
                v-if="hasProblemType('应用题')"
                ><span></span>应用题</el-menu-item
              >
              <el-menu-item
                style="min-width: auto"
                v-if="hasProblemType('讨论题')"
                ><span>讨论题</span></el-menu-item
              >
              <el-menu-item
                style="min-width: auto"
                v-if="hasProblemType('计算题')"
                ><span>计算题</span></el-menu-item
              >
              <el-menu-item
                style="min-width: auto"
                v-if="hasProblemType('程序阅读题')"
                ><span>程序阅读题</span></el-menu-item
              >
            </el-submenu>
          </div>

          <el-menu-item
            style="min-width: auto"
            @click="toOtherPathOthers('/course/teachercourse/knowledge')"
            >
            <i class="el-icon-magic-stick" > </i>
            <span>知识图谱</span></el-menu-item
          >
          <el-menu-item index="/home/teachercourse" style="min-width: auto"
            >
            <i class="el-icon-back"></i>
            <span>回到主页</span></el-menu-item
          >
        </el-menu>

      </div>

      <div  style="width: 85%; height: 50%">
        <router-view></router-view>
      </div>
      
    </div>
    <footer class="footer">
        <p>©2020-2021 | 赣南师范大学 大数据与计算智能研究组</p>
      </footer>
  </div>
</template>

<script>
import vTags from "../../common/Tags";
import Breadbox from "./BreadBox.vue";
import sildeBar from "./subcomponent/SildeBar";

export default {
  components: { Breadbox, vTags, sildeBar },
  data() {
    return {
      menuIndex: this.$route.path,
      isCollapse: false,
      //courseId:null,
      courseProblemTypeList: [], //课程实例题型
      courseInstance: null, //显示再head的信息
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
    if (this.$route.query.id) {
      this.$store.commit("setcourseCinstanceIdFun", this.$route.query.id); //保存课程实例的id后面 子组件要用到
      this.$store.commit(
        "setcourseProblemTypeList",
        this.courseProblemTypeList
      );
      localStorage.setItem("CinstanceId", this.$route.query.id);
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
          this.$api.course.courseProblemType
            .findCourseProblemType(res.data.courseId)
            .then((res1) => {
              this.$store.commit("setcourseProblemTypeList", res1.data);
            });
          console.log(this.courseInstance);
          // this.$api.course.courseProblemType.findCourseProblemType(this.courseInstance.courseId).then((res1) => {
          //   this.$store.commit("setcourseProblemTypeList", res1.data);
          // })
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
    toOtherPathWithId(path, id) {
      console.log(path + "---" + id);
      this.$router.push({
        path: path,
        query: {
          id: id,
        },
      });
    },
    toOtherPathOthers(path) {
      this.$router.push({
        path: path,
        query: {
          courseid: this.courseInstance.courseId,
        },
      });
    },
    hasProblemType(str) {
      if (this.$store.state.course.courseProblemTypeList.indexOf(str) != -1) {
        return true;
      } else return false;
    },
  },
};
</script>
<style scoped>
.menu {
  min-height: 94.5vh;
  min-width: 130px;
  max-width: 160px;
  background-color: "#ffffff";
  box-shadow: #ffffff;
}
.chead {
  width: 100%;
  height: 20px;
  background-color: #14889a;
}

.home {
  width: 100%;
  /* display: flex; */

  flex-direction: column;
}
.home /deep/.el-submenu__title:hover {
  background-color: #b9dbe0 !important;
}
.el-menu-item:hover {
  background-color: #b9dbe0 !important;
}
.el-menu-item:is-active {
  background-color: #14889a !important;
}
.el-menu-item[data-v-edab3ee2] {
  border: 1px #14889a;
}


.el-button--primary {
  color: #fff;
  background-color: #14889a;
  border-color: #14889a;
}

.cmainbig {
  /* flex: 1; */
  display: flex;
  /* grid-template-columns: repeat(100px,auto-fill); */
  grid-template-columns: 10% 100%;
  /* 可以保证caside和cmain的高度一样 */
  min-height: 0;
  /* display: flex; */
  align-items: stretch;
  width: 100%;
  height: 100%;
}
.caside {
  flex: 1;
  width: 160px;
}
.caside:hover {
  background-color: hsl(0, 0%, 100%);
}

.cmain {
  /* overflow-y: scroll;  */
  flex: 9;
  min-height: 80vh;
}

.el-menu-item {
  border: 1px #14889a;
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
  padding: 5px;
  height: 10px;
}
</style>