<template>



  <div class="outside" style="padding:50px " >

    <com-table 
      :data="tableData"
      :columns="columns"

    ></com-table>
    


    <el-table
      ref="multipleTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      tooltip-effect="dark"
      style="width: 60%; max-height: 70vh"
      
      :header-cell-style="{'text-align':'center'}"
      :cell-style="{'text-align':'center'}"
      show-overflow-tooltip
      stripe
      border

    >
      <el-table-column
        type="selection"
        width="40"
      ></el-table-column>

      <el-table-column
        type="index"
        width="100"
        label="序号"
        :index="indexMethod"
      ></el-table-column>
      <!--  <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
      <el-table-column
        prop="stuNo"
        label="学号/教工号"
        sortable
      ></el-table-column>
      <el-table-column
        prop="usrUserInfo.name"
        label="姓名"
        sortable
      >
      </el-table-column>
      <!-- <el-table-column prop="usrUserInfo.email" label="邮箱"> </el-table-column>
      <el-table-column prop="usrUserInfo.telNum" label="电话" width="120"> </el-table-column>
      <el-table-column prop="isAssistant" label="职务">
        <template slot-scope="scope">
          {{scope.row.isAssistant | isAssistantFilter}}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleRemove(scope.$index, scope.row)"
            >退选</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    

  </div>
</template>
<script>
import ComTable from '../../../common/ComTable.vue';

export default {
    components: {
        ComTable
    },
    data() {
    return {
      tableData: [],
      record: {},

      columns: [
        // {prop:"", label:"", minWidth:150},
        // {prop:"courseId", label:"课程id", minWidth:150},
        { prop: "stuNo", label: "学号", minWidth: 150, align: "center" },
        { prop: "usrUserInfo.name", label: "名字", minWidth: 150, align: "center" },
        // // {prop:"knowledgeId", label:"知识点id", minWidth:50},
        
      ],

      selections: [],
      multipleSelection: [],
    };
  },
  methods: {
    // 自增排序
    indexMethod: function (index) {
      return index + 1;
    },

    findInfoByCid() {
      this.$api.course.choosing
        .findByCid({ cid: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.tableData = res.data;
          console.log(this.tableData);
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 删除
    handleRemove: function (index, row) {
      this.remove(row.stuNo);
    },
    remove(no) {
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        let params = [];
        let noArray = (no + "").split(",");
        // console.log(noArray);
        for (var i = 0; i < noArray.length; i++) {
          params.push({
            stuNo: noArray[i],
            indId: this.$store.state.course.courseCinstanceId,
          });
        }
        console.log(params);
        this.$api.course.choosing
          .remove(params)
          .then((res) => {
            console.log(res.data);
            this.findInfoByCid();
            this.$message({ message: "操作成功", type: "success" });
          })
          .catch((err) => {
            this.$message.err("退选失败");
          });
      });
    },
  },
  filters: {
    isAssistantFilter(isAssistant) {
      if (isAssistant == 1) return "助教";
      else if (isAssistant == 0) return "学生";
      else if (isAssistant == "主讲") {
        return "主讲";
      } else if (isAssistant == "开课教师") {
        return "开课教师";
      }
    },
  },
  mounted() {
    this.findInfoByCid();
  },
};
</script>
<style scoped>
.outside{
  text-align: center;

}
</style>