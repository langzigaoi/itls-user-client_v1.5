<template lang="">
  <div align="center">
    <template>
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName"
        :header-cell-style="{textAlign:'center'}" :cell-style="{ textAlign: 'center' }"
        @current-change="handleCurrentChange">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="no" label="学号" width="120" sortable>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="isComplete" label="完成情况" width="180" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.isComplete">已完成</span>
            <span v-if="!scope.row.isComplete" style="color: red;">未完成</span>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" width="180" sortable>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'CompletionTable',
    props: {
      experimentId: {
        type: undefined
      }
    },
    data() {
      return {
        tableData: [],
        currentRow: null
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$router.push({
          path: '/course/studentAnswer',
          query: {
            stuNo: val.no,
            experimentId: this.experimentId
          }
        })
      },
      tableRowClassName({ row, rowIndex }) {
        if (row.isComplete == 0) {
          return 'warning-row';
        } else if (row.isComplete == 1) {
          return 'success-row';
        }
        return '';
      },
      getStudentList() {
        this.$api.experiment.experiment.getStudentList({
          experimentId: this.experimentId,
          indId: this.$store.state.course.courseCinstanceId
        }).then(res => {
          this.tableData = res.data;
        })
      }
    },
    mounted() {
      this.getStudentList();
    },
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #ecf9eb;
  }
</style>