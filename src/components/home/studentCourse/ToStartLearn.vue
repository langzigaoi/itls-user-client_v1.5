<template>
  <div>
    <el-card class="box-card" v-loading="loading">
        <div slot="header" class="clearfix">
          <span>即将开始学习</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">删除课程</el-button> -->
        </div>
        <div class="griddiv">
          <div class="grid" v-for="course in coursescistance" :key="course.id">
            <!-- <p class="delete">删除</p> -->
            <!-- <p class="status"> {{coursescistanceStatus(course.isPub)}}</p> -->
            <img :src="course.image" alt="" />
            <div class="gridtext">
              <p style="color:#000">{{course.courseName}}</p>
              <router-link :to="{name:'studycourse',query:{'id':course.id}}" append>进入课程</router-link>
            </div>
          </div>
        </div>
      </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
      },
      formLabelWidth: "120px",
      coursescistance: [],
      loading: true,
    }
  },
  computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
  },
  mounted() {
    this.getcoursescinstance();
  },
  methods: {
    getcoursescinstance() {
      this.loading = true;
      this.$api.course.cinstance
        .findAllCourseInstance({ teacherNo: this.userinfo.id })
        .then((res) => {
          this.coursescistance = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.coursescistance = [];
        });
    }
  }
  
}
</script>

<style>

</style>