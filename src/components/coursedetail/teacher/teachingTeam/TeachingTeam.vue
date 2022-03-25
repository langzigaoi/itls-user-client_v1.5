<template>
  <div>
    <div class="actiondiv">
      <el-button @click="changevisable" round size="small" type="primary">新增</el-button>
      <!-- <el-button round size="small" @click="changeShowSelect()" type="warning" v-if="!showSelect">删除</el-button> -->
      <!-- <el-popconfirm title="这是一段内容确定删除吗？" >
        <el-button round size="small" v-if="showSelect" @click="changeShowSelect()" type="warning" >确认删除</el-button>
      </el-popconfirm> -->
      <!-- <el-button round size="small" v-if="showSelect" @click="changeShowSelect()" type="warning">确认删除</el-button> -->
      <!-- 新增教学团队成员弹框 -->
      <add-mate ref="addMate"></add-mate>

      <!-- 删除教学团队助教弹框 -->
      <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
        <span>确定删除助教 {{this.courseChosing.name}} ？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureDelete()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <el-button round size="small" >圆角按钮</el-button> -->
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" v-if="showSelect"> </el-table-column> -->
      <el-table-column prop="stuNo" label="学号/教工号" width="120" sortable></el-table-column>
      <el-table-column prop="usrUserInfo.name" label="姓名" width="120" sortable> </el-table-column>
      <el-table-column prop="usrUserInfo.email" label="邮箱"> </el-table-column>
      <el-table-column prop="usrUserInfo.telNum" label="电话" width="120"> </el-table-column>
      <el-table-column prop="isAssistant" label="主讲/助教">
        <template slot-scope="scope">
          {{scope.row.isAssistant | isAssistantFilter}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            v-if="scope.$index != 0 && scope.$index != 1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button> -->
    </div>
  </div>
</template>

<script>

  import addMate from './AddTeamMate.vue' //新增教学团队成员
  export default {
    components: {
      addMate
    },
    data() {
      return {
        deleteDialogVisible: false, // 是否显示删除弹框
        showSelect: false, //是否显示多选
        multipleSelection: [],
        courseChosing: {  //团队成员信息
          stuNo: null,
          indId: null,
          isAssistant: null,
          name: null
        },
        courseInstance: {},
        preData: [
          /* {
            stuNo: '',
            isAssistant: '主讲',
            usrUserInfo: {
              name: '视频讲师',
              email: '123456444@qq.com',
              telNum: '12345678910',
            },
          },
          {
            stuNo: '1001',
            isAssistant: '开课教师',
            usrUserInfo: {
              name: '张三',
              email: '123456444@qq.com',
              telNum: '12345678910',
            },
          }, */
        ],
        tableData: [],
      }
    },
    filters: {
      isAssistantFilter(isAssistant) {
        if (isAssistant == 1)
          return '助教';
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
          this.findAstInfoByInd_id();

        }).catch(err => {
          this.courseInstance = {};
        })
      },
      getTeacherInfo() {
        this.$api.course.coursechosingstu.getUserInfo({ no: this.courseInstance.teacherNo }).then(res => {
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
      findAstInfoByInd_id() {
        this.$api.course.coursechosingstu.findAstInfoByInd_id({ ind_id: this.$store.state.course.courseCinstanceId }).then(res => {
          this.tableData = this.preData.concat(res.data);
        })
      },
      //改变删除的多选显示
      changeShowSelect() {
        this.showSelect = !this.showSelect;
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changevisable() {
        this.$refs.addMate.changevisable();
      },
      // 表格内删除按钮
      handleDelete(index, row) {
        this.courseChosing.stuNo = this.tableData[index].stuNo;
        this.courseChosing.indId = this.$store.state.course.courseCinstanceId;
        this.courseChosing.isAssistant = 0;
        this.courseChosing.name = this.tableData[index].usrUserInfo.name;
        this.deleteDialogVisible = true;
      },
      sureDelete() {
        this.$api.course.coursechosingstu.setCinstanceAssistant(this.courseChosing).then(res => {
          this.$message.success("删除成功");
          this.deleteDialogVisible = false;
          this.findAstInfoByInd_id();
        }).catch(err => {
          this.$message.err("删除失败");
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