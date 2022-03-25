<template>
  <div class="parent">
    <div class="choice">
      <el-button @click="changevisable" type="primary">选择课程</el-button>

      <el-dialog
        title="选择课程"
        :visible.sync="addcoursedialogVisible"
        width="100%"
        top="0"
      >
        <div class="form">
          <el-form>
            <el-form-item label="课程名称" :label-width="formLabelWidth">
              <el-select
                v-model="searchName.courseName"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in courseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="辅导老师" :label-width="formLabelWidth">
              <el-select
                v-model="searchName.teacherName"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in teacherList"
                  :key="item.no"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="changevisable">取 消</el-button>
            <el-button type="primary" @click="search()">搜索</el-button>
          </span>
        </div>

        <el-divider></el-divider>
        <label><h3>搜索到的相关课程</h3></label>
        <div>
          <el-card class="box-card" v-loading="loading">
            <div slot="header" class="clearfix"></div>
            <div class="griddiv">
              <div class="grid" v-for="course in searchList" :key="course.id">
                <img :src="course.image" alt="" />
                <div class="gridtext">
                  <p
                    style="color: #000"
                    @click="searchChangevisable"
                    type="info"
                  >
                    {{ searchName.courseName }}
                  </p>
                  <!-- 课程详细信息弹框 -->
                  <el-dialog
                    title="课程信息"
                    :visible.sync="searchCoursedialogVisible"
                    width="50%"
                  >
                    <div class="all">
                      <div class="img">
                        <img :src="course.image" alt="" />
                      </div>
                      <div class="info" style="text-align: center">
                        <table style="width: 70%; margin: auto">
                          <tr>
                            <td>课程名:</td>
                            <td>
                              <a>{{ searchName.courseName }}</a>
                            </td>
                          </tr>
                          <tr>
                            <td>开讲人:</td>
                            <td>
                              <a>{{ searchName.teacherName }}</a>
                            </td>
                          </tr>
                          <tr>
                            <td>开课时间:</td>
                            <td>
                              <a>{{
                                dateFormate(new Date(course.startYear))
                              }}</a>
                            </td>
                          </tr>
                          <tr>
                            <td>结束时间:</td>
                            <td>
                              <a>{{ dateFormate(new Date(course.endYear)) }}</a>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <el-button type="success" round @click="submit()"
                                >立即参加</el-button
                              >
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-dialog>
    </div>

    <el-divider></el-divider>

    <div class="routers">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link to="/home/studentCourse/hasOpenCourse"
              ><el-button type="primary">已开设课程</el-button></router-link
            >
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link to="/home/studentCourse/isLearningCourse"
              ><el-button type="primary">正在学习课程</el-button></router-link
            >
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link to="/home/studentCourse/toStartLearn"
              ><el-button type="primary">即将开始学习</el-button></router-link
            >
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link to="/home/studentCourse/completeCourse"
              ><el-button type="primary">已经完成课程</el-button></router-link
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true,
      courses: [],
      addcoursedialogVisible: false,
      searchCoursedialogVisible: false,
      coursescistance: [],
      courseList: [], //所有课程
      teacherList: [], //所有教师
      searchList: [], //符合条件的课程
      searchName: {
        courseName: null,
        teacherName: null,
      },
      formLabelWidth: "80px",
    };
  },
  computed: {
    userinfo() {
      return this.$store.state.user.userInfo;
    },
    cinstanceInfo() {
      return this.$store.state.searchCourse.cinstanceInfo;
    },
  },
  mounted() {
    this.getcourses();
    this.getcoursescinstance();
    this.getAllCourse();
    this.getAllteacher();
  },
  methods: {
    //获取所有课程
    getcourses() {
      this.$api.course.course
        .findAllCourse()
        .then((res) => {
          this.courses = res.data;
        })
        .catch((err) => {
          this.courses = [];
        });
    },
    getAllCourse() {
      this.$api.search.getcourse
        .getcourse()
        .then((res) => {
          this.courseList = res.data;
          console.log(this.courseList);
        })
        .catch((err) => {
          this.courseList = [];
        });
    },
    getcoursescinstance() {
      this.loading = true;
      console.log("课程实例");
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
    },
    //获取所有老师的信息
    getAllteacher() {
      this.$api.search.getcourse
        .getteachers()
        .then((res) => {
          this.teacherList = res.data;
          console.log(this.teacherList);
        })
        .catch((err) => {
          this.teacherList = [];
        });
    },
    //搜索有关课程实例
    search() {
      console.log("相关课程");
      let courseName = this.searchName.courseName;
      let teacherName = this.searchName.teacherName;
      this.$api.search.getcourse
        .searchcourse({ courseName: courseName, teacherName: teacherName })
        .then((res) => {
          this.searchList = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          this.searchList = [];
        });
    },
    //提交选课
    submit() {
      console.log("提交选课");
      let stuNo = this.userinfo.userNo;
      let insId = this.searchList[0].id;
      this.$api.search.getcourse
        .add({ indId: insId, stuNo: stuNo })
        .then((res) => {
          console.log("添加成功");
          this.$message({
            message: "添加成功",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message.error("添加失败");
        });
    },
    //改变添加课程的弹框显示
    changevisable() {
      this.addcoursedialogVisible = !this.addcoursedialogVisible;
    },
    searchChangevisable() {
      this.searchCoursedialogVisible = !this.searchCoursedialogVisible;
    },
  },
};
</script>
<style >
.box-card {
  margin-top: 10px;
  text-align: left;
}
.parent {
  position: relative;
  text-align: left;
  padding-top: 20px;
}
.kid {
  position: absolute;
  top: 0;
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5vh;
}
.gridtext p {
  cursor: pointer;
}
.all {
  position: relative;
  width: 100%;
  height: 200px;
}
.all div {
  display: inline-block;
}
.all .img {
  width: 40%;
  height: 100%;
}
.all .info {
  position: absolute;
  width: 50%;
  height: 200px;
  top: 0;
}
.all .info table {
  border-spacing: 10px 10px;
}
.all .info table td {
  font-size: 20px;
}
</style>