<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="stuNo" label="学号/教工号" width="120" sortable></el-table-column>
      <el-table-column prop="usrUserInfo.name" label="姓名" width="120" sortable> </el-table-column>
      <el-table-column prop="usrUserInfo.email" label="邮箱"> </el-table-column>
      <el-table-column prop="usrUserInfo.telNum" label="电话" width="120"> </el-table-column>
      <el-table-column prop="isAssistant" label="主讲/助教">
        <template slot-scope="scope">
          {{scope.row.isAssistant | isAssistantFilter}}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        courseChosing: {  //团队成员信息
          stuNo: null,
          indId: null,
          isAssistant: null,
          name: null
        },
        courseInstance: {},
        preData: [],
        tableData: [],
      }
    },
    filters: {
      isAssistantFilter(isAssistant) {
        if (isAssistant == 1)
          return '助教';
        else if (isAssistant == 0)
          return '学生';
        else if (isAssistant == '主讲') {
          return '主讲';
        }
        else if (isAssistant == '开课教师') {
          return '开课教师';
        }
      }
    },
    methods: {

      // 设置课程实例讲师及开课教师信息
      setPreInfo() {
        this.$api.course.cinstance.findCourseInstance({ id: this.$store.state.course.courseCinstanceId }).then((res) => {
          this.courseInstance = res.data;
          let lecturer = {
            stuNo: null,
            isAssistant: '主讲',
            usrUserInfo: {
              name: this.courseInstance.lecturer,
              email: null,
              telNum: null
            }
          }
          this.preData[0] = lecturer;
          this.getTeacherInfo();
          this.getCourseChosingStu();
          console.log(this.preData);
        }).catch(err => {
          this.courseInstance = {};
        })
      },
      getTeacherInfo() {
        this.$api.getInfo.getInfo.getUserInfo({ id: this.$store.state.course.courseCinstanceId }).then(res => {
          let teacher = {
            stuNo: this.courseInstance.teacherNo,
            isAssistant: '开课教师',
            usrUserInfo: {
              name: res.data.name,
              email: res.data.email,
              telNum: res.data.tel_num
            }
          }
          this.preData[1] = teacher;
        })
      },
      getCourseChosingStu() {
        this.$api.getInfo.getInfo.findInfoByInd_id({ ind_id: this.$store.state.course.courseCinstanceId }).then(res => {
          this.tableData = this.preData.concat(res.data);
        })
      }
    },
    mounted() {
      this.setPreInfo();
    },
  }
</script>
<style scoped>
.actiondiv {
    align-content: left;
    text-align: left;
    margin-top: 20px;
}
</style>