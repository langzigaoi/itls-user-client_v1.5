<!--  -->
<template>
  <div>
    <el-dialog
      title="简答题列表"
      :visible.sync="dialogTableVisible"
      append-to-body
      destroy-on-close
    >
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          label="序号"
          fixed
          type="index"
          width="50"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column prop="title" label="题目" width="300">
        </el-table-column>
        <el-table-column prop="answer" label="答案" width="120">
        </el-table-column>
        <el-table-column prop="difficulty" label="难易度" width="120">
        </el-table-column>
        <el-table-column prop="discrimination" label="区分度" width="300">
        </el-table-column>
        <el-table-column prop="markup" label="题目来源" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="handleDel(scope.row)"
            >
              <el-button type="text" size="small" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <div class="footer-button">
          <el-button type="primary" @click="toAddShortAnserQues"
            >新 增</el-button
          >
          <el-button @click="dialogTableVisible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <add-short-anser-ques
      ref="addShortAnserQues"
      @addSAQSuccess="queryShortAnserQuesByKid"
      changeDialogVisible="changeDialogVisible"
    />
    <edit-short-anser-ques
      ref="editShortAnserQues"
      @editSAQSuccess="queryShortAnserQuesByKid"
      changeDialogVisible="changeDialogVisible"
    />
  </div>
</template>

<script>
import AddShortAnserQues from "./AddShortAnserQues.vue";
import EditShortAnserQues from "./EditShortAnserQues.vue";

export default {
  components: {
    AddShortAnserQues,
    EditShortAnserQues,
  },
  data() {
    return {
      cinstanceSectionsId: null,
      dialogTableVisible: false,

      tableData: null,
    };
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    toAddShortAnserQues() {
      this.$refs.addShortAnserQues.changeDialogVisible(
        this.cinstanceSectionsId
      );
    },
    // 改变新增弹框的显示
    changeDialogVisible(id) {
      this.cinstanceSectionsId = id;
      this.dialogTableVisible = !this.dialogTableVisible;
      this.queryShortAnserQuesByKid();
    },
    queryShortAnserQuesByKid() {
      this.$api.course.shortAnserQues
        .selectShortAnserQuesByKid(this.cinstanceSectionsId)
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
        });
    },
    handleEdit(row) {
      const data = JSON.parse(JSON.stringify(row));
      console.log(row);
      this.$refs.editShortAnserQues.changeDialogVisible(data);
    },
    handleDel(row) {
      console.log(row);
      this.$api.course.shortAnserQues
        .delShortAnserQuesByKid([{ id: row.id }])
        .then((res) => {
          console.log(res);
          this.$message.success(res.msg);
          this.queryShortAnserQuesByKid();
        });
    },
  },
};
</script>

<style scoped>
.footer-button {
  display: flex;
  justify-content: space-around;
}
</style>