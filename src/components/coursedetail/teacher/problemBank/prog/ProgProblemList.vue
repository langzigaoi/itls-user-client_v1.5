<template>
  <div>
    <!-- 编程题列表{{this.courseId}} -->
    <!-- <div align="right">
            <el-select v-model="chapter" placeholder="请选择章节" clearable @change="getAllList()">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        
            <el-button @click="getAllList" style=""><i class="el-icon-refresh"></i></el-button>
            <el-input v-model="search" style="width:20%" placeholder="输入题干/知识点搜索"/>
        </div> -->
    <el-table
      :data="nowPage"
      :cell-style="{ padding: '5px 5px 5px 0px' }"
      stripe
      align="left"
      style="
        overflow: scroll;
        width: 100%;
        height: 520px;
        padding-top: 10px;
        padding-left: 30px;
      "
      v-loading="loading"
    >
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
      <el-table-column
        prop="problemName"
        label="题目名"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="problemDescription"
        label="题目描述"
        width="300"
      ></el-table-column>

      <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button @click="handleView(scope.row)" type="primary" size="small">查看</el-button>
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
        <el-form-item label="题目来源" prop="markup">
          <el-input
            v-model="dataForm.markup"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目名" prop="problemName">
          <el-input
            v-model="dataForm.problemName"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间限制" prop="problemTimeLimit">
          <el-input
            v-model="dataForm.problemTimeLimit"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="内存限制" prop="problemMemoryLimit">
          <el-input
            v-model="dataForm.problemMemoryLimit"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目描述" prop="problemDescription">
          <el-input
            type="textarea"
            v-model="dataForm.problemDescription"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="输入格式" prop="problemInputFormat">
          <el-input
            type="textarea"
            v-model="dataForm.problemInputFormat"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="输出格式" prop="problemOutputFormat">
          <el-input
            type="textarea"
            v-model="dataForm.problemOutputFormat"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="样例输入" prop="problemSampleInput">
          <el-input
            type="textarea"
            v-model="dataForm.problemSampleInput"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="样例输出" prop="problemSampleOutput">
          <el-input
            type="textarea"
            v-model="dataForm.problemSampleOutput"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="提示" prop="problemHint">
          <el-input
            type="textarea"
            v-model="dataForm.problemHint"
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
      pageNum: 1, //分页 当前页
      pageSize: 10, //分页 每页的大小
      total: 0,
      options: [],
      knowledges: [],
      chapter: "",
      course: "",
      pageCount: 0,
      nowPage:[],
      // knowledgeId: null,
      dialogVisible: false,
    };
  },
  // created(){
  //     this.findknowledge(this.courseId)
  // },
  mounted() {
    this.getAllList();
  },
  methods: {
    // 表格序号
    indexMethod: function (index) {
      return index + 1;
    },
    // 分页的回调
    handleSizeChange(pagesizes) {
      //每页的大小
      console.log("pageSizes", pagesizes);
      this.pageSize = pagesizes;
    },
    handleCurrentChange(currentChange) {
      //当前页
      this.nowPage = []
      console.log(currentChange);
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

    // 查看页面
    handleView(row) {
        this.dialogVisible = true;
        this.dataForm = Object.assign({}, row);

    },
    //获取所有
    getAllList() {
      this.course = this.courseId;
      console.log(this.courseId);
      this.$api.problem.prog
        .findAll({ courseId: this.course, knowledgeId: this.knowledgeId })
        .then((res) => {
          this.problemList = res.data;
          this.pageCount = this.problemList.length / this.pageSize;
          this.handleCurrentChange(1)
        });
      this.loading = false;
    },



    // 删除
    deletePro(row) {
      if (confirm("确定要删除吗") == true) {
        console.log("要删除row:", row);
        this.problem = row.problem;
        this.problem.courseId = row.courseId;
        this.problem.difficulty = row.difficulty;
        this.problem.isDelete = row.isDelete;
        this.problem.knowledgeId = row.knowledgeId;
        this.problem.progId = row.progId;
        this.problem.problemProgId = row.id;
        this.problem.userId = row.userId;

        console.log("要删除:", this.problem);

        this.$api.problem.prog.del(this.problem).then((res) => {
          console.log("msg:", res.msg);
          this.Msg(res.msg);
          this.getAllList();
        });
      }
    },
    
    findknowledge() {
      this.$api.knowledge.knowledge
        .selectByDeepAndCourseId({ deep: 2, courseId: 2 })
        .then((res) => {
          console.log("knowledges", res);
          this.knowledges = new Array();
          this.knowledges = res.data;
          // this.knowledegs = JSON.parse(JSON.stringify(this.knowledegs).replace(/name/g, 'label').replace(/child/g, 'children'));
          console.log("knowledegs", this.knowledges.data);
          this.options = new Array();
          this.knowledges.data.forEach((element) => {
            this.options.push({ value: element.id, label: element.name });
          });
        });
    },
    // 查看详情
    checkAlterAProblemDialogVisible(problem) {
      console.log(problem, "12315");
      this.$emit("checkAlterAProblemDialogVisible", problem);
    },
    //调用父组件view的子组件Add
    changeAlterAProblemDialogVisible(problem) {
      this.$emit("changeAlterAProblemDialogVisible", problem);
    },
    // 格式化表格消息内容
    stateFormat(row, column, cellValue) {
      // console.log(row , column , cellValue)
      if (!cellValue) return "";
      if (cellValue.length > 38) {
        //最长固定显示38个字符
        return cellValue.slice(0, 38) + "...";
      }
      return cellValue;
    },
  },
};
</script>
