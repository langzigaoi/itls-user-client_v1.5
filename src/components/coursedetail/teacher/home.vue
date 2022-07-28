<template>
  <div  style="display: flex; height: 100vh">
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
        <el-aside class="aside" style="width:165px; " >
          <el-menu
            :default-active="menuIndex"
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
                  index="/course/studentList"
                  >
                  <i class="el-icon-s-order"></i>学生列表</el-menu-item
                >
                <!-- <el-menu-item
                  index="/course/atlasAnalyze"
                  >
                  <i class="el-icon-s-data"></i>图谱分析</el-menu-item
                > -->
                <el-menu-item
                  index="/course/teachingAnalyze"
                  >
                  <i class="el-icon-data-analysis"></i>教学分析</el-menu-item
                >
             </el-submenu>

             <el-submenu index="2" style="width: 160px" >
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span style="font-size: 1em">  课程介绍</span>
                </template>

                <el-menu-item
                  index="/course/courseintroduce"
                  style="min-width: auto"
                >
                  <i class="el-icon-tickets"></i> <span>基本信息</span>
                </el-menu-item>
                <el-menu-item
                  index="/course/coursetarget"
                  style="min-width: auto"
                >
                  <i class="el-icon-data-board"></i>课程目标</el-menu-item
                >
                <el-menu-item
                  index="/course/examineevaluate"
                  style="min-width: auto"
                  >
                  <i class="el-icon-news"></i>考核评价</el-menu-item
                >
              </el-submenu>

              <el-menu-item
                index="/course/teachingTeam"
                style="width: 160px"
              >
                <i class="el-icon-user" aria-hidden="true"></i>
                <span>  教学团队</span></el-menu-item
              >
              <el-menu-item
                v-if="hasMenu('/course/courseContent')"
                index="/course/courseContent"
                style="width: 160px"
              >
                <i class="el-icon-notebook-1"></i><span>课程内容</span>
              </el-menu-item>

              <!-- <el-submenu index="3">
                <template slot="title">
                  <span style="font-size: 1em"
                    ><i class="el-icon-edit-outline" aria-hidden="true"></i> 作业与测验</span
                  >
                </template>
                <el-menu-item
                  index="/course/AlterCourseHomework"
                  style="width: 160px"
                  >
                  <i class="el-icon-edit"></i>作业</el-menu-item
                >
                <el-menu-item
                  index="/course/alterCourseTest"
                  style="width: 160px"
                  >
                  <i class="el-icon-edit"></i>测验</el-menu-item
                >
              </el-submenu> -->

              <el-menu-item
                index="/studycourse/courseExperiment"
                style="width: 160px"
                ><i class="el-icon-suitcase"></i>
                <span> 课程实验</span>
              </el-menu-item>

              <el-menu-item
                index="/course/examList"
                style="width: 160px"
              >
                <i class="el-icon-finished"></i><span>课程考试</span>
              </el-menu-item>

              <el-submenu index="4">
                <template slot="title">       
                  <span style="font-size: 1em"
                    ><i class="el-icon-bank-card" aria-hidden="true"></i> 题库</span
                  >
                </template>
                       
                <el-menu-item index="/course/choiceList" 
                    v-if="hasMenu('/course/problemChoice') && hasProblemType('单选题')"
                    style="width: 160px"
                    @click="toOtherPathWithId('/course/choiceList', $route.query.id)"
                  >
                  <i class="el-icon-thumb"></i>单选题</el-menu-item
                >
                <el-menu-item index="/course/programList" 
                    v-if="hasProblemType('编程题')"
                    style="width: 160px"
                    @click="toOtherPathWithId('/course/programList', $route.query.id)"
                  >
                  <i class="el-icon-edit-outline"></i>编程题</el-menu-item
                >
                <el-menu-item index="/course/judge"
                   v-if="hasProblemType('判断题')"
                   style="width: 160px"
                   @click="toOtherPathWithId('/course/judge', $route.query.id)"
                  >
                  <i class="el-icon-check"></i>判断题</el-menu-item
                >
                <el-menu-item index="/course/multiChoice"
                   v-if="hasProblemType('多选题')"
                   style="width: 160px"
                   @click="toOtherPathWithId('/course/multiChoice', $route.query.id)"
                >
                  <i class="el-icon-thumb"></i>多选题</el-menu-item
                >
                <el-menu-item index="/course/fillingList"
                  v-if="hasProblemType('填空题')"
                  style="width: 160px"
                  @click="toOtherPathWithId('/course/fillingList', $route.query.id)"
                >
                  <i class="el-icon-edit"></i>填空题</el-menu-item
                >
                <el-menu-item index="/course/shortAnswer"
                  v-if="hasProblemType('简答题')"
                  style="width: 160px"
                  @click="toOtherPathWithId('/course/shortAnswer', $route.query.id)"
                >
                  <i class="el-icon-document"></i>简答题</el-menu-item
                >


                
                <el-menu-item index="/course/problemApplication" 
                   style="width: 160px"
                   v-if="hasProblemType('应用题')"
                  >
                  <i class="el-icon-document"></i>应用题</el-menu-item
                >
                <el-menu-item
                   index=""
                   style="width: 160px"
                   v-if="hasProblemType('讨论题')"
                  >
                  <i class="el-icon-document"></i>讨论题</el-menu-item
                >
                <el-menu-item
                   index=""
                   style="width: 160px"
                   v-if="hasProblemType('计算题')"
                  >
                  <i class="el-icon-set-up"></i>计算题</el-menu-item
                >
                <el-menu-item 
                   index=""
                   style="width: 160px"
                   v-if="hasProblemType('程序阅读题')"
                  >
                  <i class="el-icon-set-up"></i>程序阅读题</el-menu-item
                >
              </el-submenu>


              <el-menu-item index="" style="width: 160px"
                >
                <i class="el-icon-office-building"></i> 课程项目</el-menu-item
              >

              <el-menu-item index="" style="width: 160px"
                >
                <i class="el-icon-share"></i>知识图谱</el-menu-item
              >

              <!-- <el-submenu index="6">
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
              </el-submenu> -->

              <el-menu-item index="/home/teachercourse" 
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
  components: { vTags },
  data() {
    return {
      menuIndex: this.$route.path,
      isCollapse: false,
      courseProblemTypeList: [], //课程实例题型
      courseInstance: null, //显示再head的信息
      allKnowledge: [],
    };
  },
  computed: {
    
  },
  created() {
    
  },
  mounted() {
    console.log(this.$route.query.id);
    // 刷新时获取用户数据
    if (!this.$store.state.user.userInfo.isLogin) {
      var data = localStorage.getItem("uInfo");
      if (data) data = JSON.parse(data);
      if (data) {
        // console.log("恢复用户数据");
        this.$store.commit("recoverUserData", data);
      }
    }
    // console.log(this.hasKey("home:selfcenter:view"));
    // console.log(this.hasMenu("/home"));
    // console.log(this.$store.state.user.userInfo);
    // console.log("课程实例的id：", this.$route.query.id);
    // console.log("课程的id：", this.$store.state.course.courseId);
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
          console.log(this.courseInstance.courseId);
          // 存放课程id
          this.$store.commit("setcourseId", this.courseInstance.courseId);
          // 查询知识点
          this.getKnowledge(this.courseInstance.courseId);

          this.$api.course.courseProblemType
            .findCourseProblemType(res.data.courseId)
            .then((res1) => {
              this.$store.commit("setcourseProblemTypeList", res1.data);
            });
          
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
      // console.log(path + "---" + id);
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

    // 知识点处理
    getChildren(parentId, arr) {
      // console.log(parentId);
      // console.log(arr);
      // console.log('1');
      let array = [];
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].parentId === parentId) {
          array.push(arr[index]);
        }
      }
      return array;
    },
    beChildren(arr1, arr2) {
      // console.log(arr1);
      // console.log(arr2);
      let k = 0;
      for (let i = 0; i < arr1.length; i++) {
        // console.log(arr1[k]);
        // if (arr1[k] === [] || arr1[k] === undefined || arr1[k].length === 0 || arr1[k] === null) {
        //   console.log(arr1[k]);
        //   continue;
        // }
        for (let j = 0; j < arr1[i].length; j++) {
          // console.log(arr2[k]);
          if (arr2[k] !== [] && arr2[k] !== undefined && arr2[k].length !== 0) {
            //&& arr1[k].value === arr2[k].parentId
            arr1[i][j].children = arr2[k];
          }
          // console.log(arr1[i][j]);
          // console.log(arr2[k]);
          k++;
        }
      }
      // console.log(arr1);
      return arr1;
    },
    async getKnowledge(params) {
      console.log(params);
      let deep1 = [];
      let deep2 = [];
      let deep3 = [];
      let deep4 = [];
      let deep5 = [];
      let deep6 = [];
      await this.$api.knowledge.knowledge
        .findList({ courseId: params })
        .then((res) => {
          console.log(res);
          let data = res.data;
          
          for (let index = 0; index < data.length; index++) {
            if (data[index].deep == 1) {
              deep1.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 2) {
              deep2.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 3) {
              deep3.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 4) {
              deep4.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 5) {
              deep5.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 6) {
              deep6.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            }
          }
        });
      // console.log(deep1);
      // console.log(deep2);
      // console.log(deep3);
      // console.log(deep4);
      // console.log(deep5);
      // console.log(deep6);
      let newDeep2 = [];
      for (let index = 0; index < deep2.length; index++) {
        newDeep2.push(this.getChildren(deep2[index].value, deep3));
      }
      // console.log(newDeep2);
      let newDeep3 = [];
      for (let index = 0; index < deep3.length; index++) {
        newDeep3.push(this.getChildren(deep3[index].value, deep4));
      }
      // console.log(newDeep3);
      let newDeep4 = [];
      for (let index = 0; index < deep4.length; index++) {
        newDeep4.push(this.getChildren(deep4[index].value, deep5));
      }
      // console.log(newDeep4);
      let newDeep5 = [];
      for (let index = 0; index < deep5.length; index++) {
        newDeep5.push(this.getChildren(deep5[index].value, deep6));
      }
      // console.log(newDeep5);
      // let finalArry = []
      // for (let index = 0; index < deep2.length; index++) {
      //   finalArry.push()
      // }
      newDeep4 = this.beChildren(newDeep4, newDeep5);
      newDeep3 = this.beChildren(newDeep3, newDeep4);
      newDeep2 = this.beChildren(newDeep2, newDeep3);
      // console.log(newDeep2);
      for (let index = 0; index < newDeep2.length; index++) {
        deep2[index].children = newDeep2[index];
      }
      console.log("在查");
      console.log(deep2);
      this.$store.commit("setknowledge", deep2);
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
  overflow-y: scroll;
  border: #131212;
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

.el-button--primary :hover {
  color: #FFF !important;;
  background-color: #14889A !important;;
  border-color: #14889A !important;;
}




</style>