<template>
  <div class="container">
    <!-- 课程介绍{{this.$store.state.courseCinstanceId}}{{this.$store.state.user.userInfoinfo}} -->
    <!-- {{courseInstance}} -->
    <!-- 展示 -->
    <div v-show="!isEdit" class="tcommonBox">
      <header>
        <h1>课程介绍</h1>
      </header>
      <section>
        <ul class="userInfoBox">
          <li class="avatarlist">
            <span class="leftTitle">封面</span>
            <div class="avatar-uploader">
              <el-avatar :size="90" :src="courseInstance.image"> </el-avatar>
            </div>
          </li>
          <!-- <li>
                      <span class="leftTitle">编号</span>
                      <span>{{courseInstance.id}}</span>
                  </li> -->
          <li class="username">
            <span class="leftTitle">课程名</span>
            <span>{{ courseInstance.courseName }}</span>
          </li>
          <!-- <li>
                      <span class="leftTitle">教师</span>
                      <span>{{courseInstance.teacherName}}</span>
                  </li> -->
          <li>
            <span class="leftTitle">课程介绍</span>
            <span>{{ courseInstance.intro }}</span>
          </li>
          <!-- <li>
            <span class="leftTitle">课程目标</span>
            <span>{{courseInstance.courseGoalDesc}}</span>
          </li> -->
          <li>
            <span class="leftTitle">教学类型</span>
            <span>{{ courseInstance.teachingTypeName }}</span>
          </li>
          <li>
            <span class="leftTitle">周学时</span>
            <span>{{ courseInstance.hoursOfWeek }}</span>
          </li>
          <li>
            <span class="leftTitle">学分</span>
            <span>{{ courseInstance.grade }}</span>
          </li>
          <li>
            <span class="leftTitle">起止时间</span>
            <span>{{ dateFormate(new Date(courseInstance.startYear)) }}</span
            >~<span>{{ dateFormate(new Date(courseInstance.endYear)) }}</span>
          </li>
          <li>
            <span class="leftTitle">学期</span>
            <span>{{ courseInstance.semester }}</span>
          </li>

          <li>
            <span class="leftTitle">创建时间</span>
            <span>{{
              dateTimeFormate(new Date(courseInstance.createTime))
            }}</span>
          </li>
          <li v-if="ishas">
            <span class="leftTitle">编程语言</span>
            <span v-for="(language, index) in languageList" :key="index"
              >&nbsp;{{ language }}
              <span v-if="index != languageList.length - 1">、</span>&nbsp;
            </span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courseInstance: {}, //一个课程实例
      isEdit: false,
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
  margin-bottom: 40px;
  font-size: 15px;
  text-align: left;
  margin-top: 5px;
}
.el-textarea__inner{
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
.tcommonBox h1 {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
}

/* .userInfoBox .avatarlist{
  position: relative;
  text-align: left;
} */
userInfoBox li {
  text-align: left;
}

.avatar-uploader {
  display: inline-block;
  vertical-align: top;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}

.gotoEdit {
  font-size: 15px;
  float: right;
  cursor: pointer;
  color: #999;
}

.gotoEdit:hover {
  color: #333;
}

/*个人设置*/

.userInfoBox .leftTitle {
  display: inline-block;
  width: 100px;
  padding: 10px 0;
}

.userInfoBox .rightInner {
  display: inline-block;
  max-width: calc(100% - 140px);
  vertical-align: top;
}

.userInfoBox li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.userInfoBox li:last-child {
  border-bottom: 1px solid transparent;
}

.userInfoBox .el-input,
.userInfoBox .el-textarea {
  max-width: 300px;
  min-width: 100px;
}

.userInfoBox .el-input__inner {
  border-radius: 4px;
}

.userInfoBox .el-textarea {
  vertical-align: top;
}

.saveInfobtn {
  margin: 20px 0;
  text-align: center;
}

.saveInfobtn a {
  color: #000;
  padding: 6px 20px;
  margin: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}

.userInfoBox .fa-asterisk {
  color: #df2050;
}
</style>