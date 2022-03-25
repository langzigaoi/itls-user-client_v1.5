<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column prop="stuNo" label="学号/教工号" width="120" sortable></el-table-column>
      <el-table-column prop="usrUserInfo.name" label="姓名" width="120" sortable> </el-table-column>
      <el-table-column prop="usrUserInfo.email" label="邮箱"> </el-table-column>
      <el-table-column prop="usrUserInfo.telNum" label="电话" width="120"> </el-table-column>
      <el-table-column prop="isAssistant" label="职务">
        <template slot-scope="scope">
          {{scope.row.isAssistant | isAssistantFilter}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        courseChosing: {  //团队成员信息
          stuNo: null,
          indId: null,
          delFlag: null,
          name: null,
        },
        tableData: [],
      }
    },
    filters: {
      isAssistantFilter(isAssistant) {
        if (isAssistant == 1)
          return '助教';
        else if (isAssistant == 0)
          return '学生';
      }
    },
    methods: {
      getCourseChosingStu() {
        this.$api.getInfo.getInfo.findInfoByInd_id({ ind_id: this.$store.state.course.courseCinstanceId }).then(res => {
          this.tableData = res.data;
        })
      }
    },
    mounted() {
      this.getCourseChosingStu();
    },
  }
</script>