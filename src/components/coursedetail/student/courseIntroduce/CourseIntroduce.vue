<template>
  <div class="outside" style="padding: 30px">
    <el-row>
      <el-col :span="6">
          <div style="text-align:center">
            <el-image fit="fit" style="width:200px" v-if="courseInstance.image" :src="courseInstance.image"> </el-image>
          </div>
      </el-col>

      <el-col :span="6">
        <el-row type="flex" class="el-row-margin">
          <div>
            <span>课程名称</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ courseInstance.courseName }}</span>
          </div>
        </el-row>

        <el-row type="flex" class="el-row-margin">
          <div>
            <span>主讲人</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ courseInstance.lecturer }}</span>
          </div>
        </el-row>

        <el-row class="el-row-margin">
          <div>
            <span>起止日期</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ dateFormate(new Date(courseInstance.startYear)) }}</span
            >~<span>{{ dateFormate(new Date(courseInstance.endYear)) }}</span>
          </div>
        </el-row>

        <el-row class="el-row-margin">
          <div>
            <span>周学时</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ courseInstance.hoursOfWeek }} 学时</span>
          </div>
        </el-row>

        <el-row class="el-row-margin">
          <div>
            <span>需要编程</span>
            <el-divider direction="vertical"></el-divider>
            <span v-if="courseInstance.isProgram == 1">是</span>
            <span v-else>否</span>
          </div>
        </el-row>
      </el-col>

      <el-col :span="12">
        <el-row class="el-row-margin">
          <div>
            <span>教学类型</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ courseInstance.teachingTypeName }}</span>
          </div>
        </el-row>

        <el-row class="el-row-margin">
          <div>
            <span>学期</span>
            <el-divider direction="vertical"></el-divider>
            <span>第 {{ courseInstance.semester }} 学期</span>
          </div>
        </el-row>

        <el-row class="el-row-margin">
          <div>
            <span>学分</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ courseInstance.grade }}</span>
          </div>
        </el-row>

        <el-row class="el-row-margin">
          <div>
            <span>编程语言</span>
            <el-divider direction="vertical"></el-divider>
            <span v-for="(value, index) in languageList" :key="index"
              >&nbsp;{{ value.name }}语言
              <span v-if="index != languageList.length - 1">、</span>&nbsp;
            </span>
          </div>
        </el-row>

        <el-row class="el-row-margin">
          <div>
            <span>课程简介</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ courseInstance.intro }}</span>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseInstance: {}, //一个课程实例
      problemList: [],
      ishas: false,
      languageList: [],
    };
  },
  mounted() {
    this.findACourseInstance();
  },
  
  methods: {
    //获取课程实例详情
    findACourseInstance() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.courseInstance = res.data;
          console.log(this.courseInstance);
          this.findCinstanceProblem(this.courseInstance.courseId);
          this.findCinstanceLanguage(this.courseInstance.id);
        })
        .catch((err) => {
          this.courseInstance = {};
        });
    },
    // 获取课程题型
    findCinstanceProblem(id) {
      this.$api.course.courseProblemType
        .findCourseProblemType(id)
        .then((res) => {
          this.problemList = res.data;
          if (this.problemList.indexOf("编程题") != -1) {
            this.ishas = true;
          }
        });
    },
    // 获取课程编程语言
    findCinstanceLanguage(id) {
      this.$api.course.language
        .findCinstanceLanguage({ cid: id })
        .then((res) => {
          this.languageList = res.data;
        });
    },
  },
};
</script>
<style scoped>
.tcommonBox {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  text-align: left;
  margin-top: 15px;
}
.el-input-text {
  width: 108%;
}

.el-input {
  width: 100%;
}
.el-row {
  /* margin-bottom: 30px; */
  display: flex;
  flex-wrap: wrap;
}

.el-form-item {
  margin-bottom: 35px;
}
.el-form-item__error {
  text-align: center;
}
.el-row-margin {
  margin-bottom: 60px;
}
</style>