<template>
  <div>
    <!-- 选择题列表{{this.courseId}} -->
    <!-- <div align="right">
      <el-button style=""
        ><i class="el-icon-refresh"></i
      ></el-button>
      <el-input
        v-model="search"
        style="width: 20%"
        placeholder="输入题干/知识点搜索"
      />
    </div> -->

    <el-table
      :data="nowPage"
      :cell-style="{ padding: '5px 5px 5px 0px' }"
      stripe
      align="left"
      style="
        overflow: scroll;
        width: 100%;
        height: 570px;
        padding-top: 10px;
        padding-left: 30px;
      "
      v-loading="loading">

      <el-table-column
        type="index"
        width="80"
        label="序号"
        align="center"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        prop="knowledgeName"
        label="知识点"
        width="200"
      ></el-table-column>
      <el-table-column prop="title" label="题干" width="350"> </el-table-column>
      <el-table-column prop="options" label="选项" width="350">
      </el-table-column>
      <el-table-column prop="answer" label="答案"  align="center" width="50">
      </el-table-column>
      <!-- <el-table-column prop="analysis" label="解析" width="120">
      </el-table-column> -->
      <!-- <el-table-column
        prop="difficulty"
        label="难度"
        align="center"
        width="120"
      >
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="handleView(scope.row)" type="primary" size="mini"
            >查看</el-button
          >
          <!-- <el-button
            @click="changeAlterAProblemDialogVisible(scope.row)"
            type="primary"
            size="small"
            >编辑</el-button
          >
          <el-button @click="deletePro(scope.row)" type="danger" size="small"
            >删除</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="left"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      :page-count="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="problemList.length"
    >
    </el-pagination>

    <!--查看界面-->
    <el-dialog
      width="40%"
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :disabled="true"
        :model="dataForm"
        label-width="auto"
        ref="dataForm"
        size="medium"
        label-position="right"
      >
        <!-- <el-form-item label="ID" prop="id" v-if="false">
          <el-input
            v-model="dataForm.id"
            :disabled="true"
            auto-complete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="课程名">
          <el-input
            v-model="dataForm.courseName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="知识点">
          <el-input
            v-model="dataForm.knowledgeName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题干" prop="title">
          <el-input
            type="textarea"
            v-model="dataForm.title"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="选项" prop="options">
          <el-input
            type="textarea"
            :rows="4"
            v-model="dataForm.options"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="答案" prop="answer">
          <el-input
            type="textarea"
            v-model="dataForm.answer"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="解析" prop="analysis">
          <el-input
            type="textarea"
            v-model="dataForm.analysis"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目来源" prop="markup">
          <el-input
            v-model="dataForm.markup"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="难易度" prop="difficulty">
          <el-input
            v-model="dataForm.difficulty"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="区分度" prop="discrimination">
          <el-input
            v-model="dataForm.discrimination"
            auto-complete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click.native="dialogVisible = false"
          >关闭</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["courseId"],
  data() {
    return {
      search: "",
      loading: true,
      problemList: [], //所有查出来的问题
      currentPage: 1, //分页 当前页
      pageSize: 10, //分页 每页的大小
      knowledgeId: "",
      course:"",
      dialogVisible: false,
      pageCount: 0,
      nowPage:[]
    };
  },
  mounted() {
      console.log(this.courseId);
      this.getAllList();
  },
  methods: {
    // 分页的回调
    handleSizeChange(pagesizes) {
      // 每页的大小
      console.log(pagesizes);
      this.pageSize = pagesizes;
    },
    handleCurrentChange(currentChange) {
      // 当前页
      this.nowPage = []
      this.currentPage = currentChange;
      currentChange = currentChange -1;
      let beginCount = currentChange * this.pageSize ;
      let endCount = (currentChange + 1) * this.pageSize ;
      console.log(beginCount + '--' + endCount);
      this.indexMethod(beginCount)
      for (let index = beginCount; index < endCount; index++) {
        this.nowPage.push(this.problemList[index])
      }
    },
    // 删除
    deletePro(row) {
      // if (confirm("确定要删除吗") == true) {
      //   console.log("要删除的id", row.id);

      //   this.$api.problem.choice.del(row).then((res) => {
      //     this.Msg(res.msg);
      //     this.getAllList();
      //   });
      // }
    },
    // 获取所有
    getAllList() {
      // this.course = this.courseId
      // this.$api.problem.choice
      //   .findAll({ courseId: this.course, knowledgeId: this.knowledgeId })
      //   .then((res) => {
      //     this.problemList = res.data;
      //     this.pageCount = this.problemList.length / this.pageSize;
      //     this.handleCurrentChange(1)
      //   });
      // this.loading = false;

    },
    // 表格序号
    indexMethod: function (index) {
      return index + 1;
    },
    // 显示查看界面
    handleView(row) {
      // this.getAllList();
      console.log(row);
      this.dialogVisible = true;
      this.dataForm = Object.assign({}, row);
      // console.log(this.knowledgeState);
    },
  },
};
</script>
