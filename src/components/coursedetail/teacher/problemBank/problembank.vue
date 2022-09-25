<template>
  <div class="home">
    <div class="chead" style="padding:20px 0;color:#fff">
      <!-- <i v-if="!isCollapse" @click="changeisCollapse()" class="el-icon-s-fold" style="font-size:1.4em;float:left;margin-left:10px"></i>
    <i v-else @click="changeisCollapse()" class="el-icon-s-unfold" style="font-size:1.4em;float:left;margin-left:10px"></i>   -->
      <!-- 课程管理{{courseInstance}} -->
      {{courseInstance.courseName}} &nbsp;&nbsp;{{this.dateFormate(new
      Date(courseInstance.startYear))}}~{{this.dateFormate(new Date(courseInstance.endYear))}}
      &nbsp;&nbsp;第{{courseInstance.semester}}学期
    </div>
    <div class="cmainbig">
      <div class="caside">
        <!-- <silde-bar></silde-bar> -->
        <el-menu :default-active="menuIndex" :collapse="isCollapse" style="min-height:90vh" :router="true"
          :unique-opened="true" background-color="#324157" text-color="#ADBAC8" active-text-color="#20A0FF"
          align="left">

          <el-submenu index="3">
            <template slot="title">
              <i class="fa fa-gitlab"></i> <span style="font-size:1.0em">  题库编辑</span>
            </template>
            
          </el-submenu>
          <el-menu-item v-if="hasMenu('/course')" index="/problemBank/problemChoice"
              style="min-width: auto;"><span>选择题</span></el-menu-item>
          <el-menu-item v-if="hasMenu('/course')" index="/problemBank/problemFilling"
              style="min-width: auto;"><span>填空题</span></el-menu-item>
          <el-menu-item v-if="hasMenu('/course')" index="/problemBank/problemJudge"
              style="min-width: auto;"><span>判断题</span></el-menu-item>
          <el-menu-item v-if="hasMenu('/course')" index="/problemBank/problemMultiChoice"
              style="min-width: auto;"><span>多选题</span></el-menu-item>
          <el-menu-item v-if="hasMenu('/course')" index="/problemBank/problemShortAnswer"
              style="min-width: auto;"><span>简答题</span></el-menu-item>
            <el-menu-item v-if="hasMenu('/course')" index="/problemBank/problemProg" style="min-width: auto;"><span>编程题</span></el-menu-item>
            <el-menu-item v-if="hasMenu('/course')" index="/problemBank/problemProgram" style="min-width: auto;"><span>编程题lgy</span></el-menu-item>
            <el-menu-item v-if="hasMenu('/course')" index="/problemBank/applicationProgram" style="min-width: auto;"><span></span>应用题</el-menu-item>
          <!-- <el-menu-item index="" style="min-width: auto;"><span>题库编辑</span></el-menu-item>  -->
          <el-menu-item index="/home/teachercourse" style="min-width: auto;"><span>回到主页</span></el-menu-item>
        </el-menu>
      </div>
      <div class="cmain">
        <v-tags></v-tags>
        <!-- <breadbox></breadbox>   -->
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
    <div class="cfoot">
      开发团队
    </div>
  </div>
</template>

<script>
  import vTags from '../../../common/Tags';
//   import Breadbox from ".././BreadBox.vue";
  import sildeBar from ".././subcomponent/SildeBar";

  export default {
    components: { vTags, sildeBar },
    data() {
      return {
        menuIndex: this.$route.path,
        isCollapse: false,
        //courseId:null,
        courseInstance: {}, //显示再head的信息
      }
    },
    computed: {
    },
    mounted() {
      console.log("课程实例的id：", this.$route.query.id)
      //this.courseId=this.$route.params.courseid;
      if (this.$route.query.id)
        this.$store.commit('setcourseCinstanceIdFun', this.$route.query.id); //保存课程实例的id后面 子组件要用到
      this.findACourseInstance();
    },
    methods: {
      //获取课程实例详情 显示head里面
      findACourseInstance() {
        this.$api.course.cinstance.findCourseInstance({ id: this.$store.state.course.courseCinstanceId }).then((res) => {
          this.courseInstance = res.data;
        })
      },

      _isMobile() { //判断是手机还是PC
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    },



  }
</script>
<style scoped>
  .home {
    width: 100%;
    /* display: flex; */
    display: flex;
    flex-direction: column;
  }

  .chead {
    width: 100%;
    background-color: #242F42;
  }

  .cmainbig {
    /* flex: 1; */
    display: grid;
    /* grid-template-columns: repeat(100px,auto-fill); */
    grid-template-columns: 10% 90%;
    /* 可以保证caside和cmain的高度一样 */
    min-height: 0;
    /* display: flex; */
    align-items: stretch;
    width: 100%;

  }

  .caside {

    background-color: #324157;

  }

  .cmain {
    /* overflow-y: scroll; */
  }

  .el-menu-item {
    border: 1px solid #434A50;
  }

  .cfoot {
    margin-top: auto;
    background-color: #DEE1E6;
  }
  .el-button--primary {
    color: #FFF;
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
</style>