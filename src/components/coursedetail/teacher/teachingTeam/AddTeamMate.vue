<template>
  <!-- 添加教学团队成员的弹框 -->
  <div class="container">
    <el-dialog title="添加教学团队成员" :visible.sync="addmatedialogVisible" width="30%" top="60px" margin="auto">
      <el-form ref="form" :inline="true" :model="courseChosing" label-width="80px">
        <div class="grid-content bg-purple">
          <el-form-item label="姓名">
            <el-select v-model="courseChosing.stuNo" filterable placholder="请选择">
              <el-option v-for="item in choiceStudents" :key="item.stuNo" :label="item.usrUserInfo.name" :value="item.stuNo">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div class="grid-content bg-purple">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit()">确 定</el-button>
          <el-button @click="changevisable">取 消</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        addmatedialogVisible: false,
        choiceStudents: [],
        courseChosing: {  //团队成员信息
          stuNo: null,
          indId: null,
          is_assistant: null,
        },
      }
    },
    computed: {
      userinfo() {
        return this.$store.state.user.userinfo;
      }
    },
    mounted() {
      this.findInfoByInd_id();
      // this.choiceStudents = this.$parent.cinstanceStu;
      // console.log(this.$parent.cinstanceStu);
    },
    methods: {
       // 通过课程实例id查询选课学生
       findInfoByInd_id() {
        this.$api.course.coursechosingstu.findInfoByInd_id({ ind_id: this.$store.state.course.courseCinstanceId }).then((res) => {
          this.choiceStudents = res.data;
        })
      },
      changevisable() {
        this.addmatedialogVisible = !this.addmatedialogVisible;
      },
      submit() {
        this.courseChosing.indId = this.$store.state.course.courseCinstanceId;
        this.courseChosing.isAssistant = 1;
        this.$api.course.coursechosingstu.setCinstanceAssistant(this.courseChosing).then(res => {
          this.$message.success("添加成功");
          this.$parent.findAstInfoByInd_id();
          console.log(res.data);
        }).catch(err => {
          this.$message.err("添加失败");
        })
        this.addmatedialogVisible = !this.addmatedialogVisible;
      }
    },
  }
</script>
<style scoped>
  .container {
    max-width: 80%;
    min-width: 200px;
    margin: 0 auto;
    padding: 0 10px;
  }

  .el-row {
    margin-bottom: 25px;
  }

  .last-row {
    margin-bottom: 10px;
  }
</style>