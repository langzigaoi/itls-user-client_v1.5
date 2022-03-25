<template>
  <div>
    <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
      <span>确定退选学生 {{this.courseChosing.name}} ？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureWithDraw()">确 定</el-button>
      </span>
    </el-dialog>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <!--  <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="stuNo" label="学号/教工号" width="120" sortable></el-table-column>
      <el-table-column prop="usrUserInfo.name" label="姓名" width="120" sortable> </el-table-column>
      <el-table-column prop="usrUserInfo.email" label="邮箱"> </el-table-column>
      <el-table-column prop="usrUserInfo.telNum" label="电话" width="120"> </el-table-column>
      <el-table-column prop="isAssistant" label="职务">
        <template slot-scope="scope">
          {{scope.row.isAssistant | isAssistantFilter}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">退选</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <!--  <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button> -->
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        deleteDialogVisible: false,
        tableData: [],
        multipleSelection: [],
        courseChosing: {  //团队成员信息
          stuNo: null,
          indId: null,
          delFlag: null,
          name: null,
        },
      }
    },
    methods: {
      /* toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      }, */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      findInfoByInd_id() {
        this.$api.course.coursechosingstu.findInfoByInd_id({ ind_id: this.$store.state.course.courseCinstanceId }).then(res => {
          this.tableData = res.data;
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.courseChosing.stuNo = this.tableData[index].stuNo;
        this.courseChosing.indId = this.$store.state.course.courseCinstanceId;
        this.courseChosing.delFlag = -1;
        this.courseChosing.name = this.tableData[index].usrUserInfo.name;
        this.deleteDialogVisible = true;
      },
      sureWithDraw() {
        this.$api.course.coursechosingstu.withDrawChosingStu(this.courseChosing).then(res => {
          this.$message.success("退选成功");
          this.deleteDialogVisible = false;
          this.findInfoByInd_id();
          console.log(res.data);
        }).catch(err => {
          this.$message.err("退选失败");
        })
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
    mounted() {
      this.findInfoByInd_id();
    },
  }
</script>