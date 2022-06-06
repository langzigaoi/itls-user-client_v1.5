<template>
  <el-dialog
    top="5vh"
    align="left"
    title=""
    :visible.sync="diaVisible"
    :destroy-on-close="true"
    :append-to-body="true"
    width="80%"
    style=""
  >
    <header align="left" class="alterhomework">作业预览和修改</header>
    <el-form
      ref="form"
      :inline="true"
      :model="cInstanceSectionHomework"
      label-width="100px"
    >
      <div class="grid-content bg-purple" align="left">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="cInstanceSectionHomework.startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截至时间">
          <el-date-picker
            v-model="cInstanceSectionHomework.endTime"
            type="datetime"
            placeholder="选择截至时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布成绩时间">
          <el-date-picker
            v-model="cInstanceSectionHomework.pubTime"
            type="datetime"
            placeholder="选择发布时间"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="cInstanceSectionHomework.title"></el-input>
        </el-form-item>
        <el-form-item class="alterButton">
          <!-- <el-button @click="update" type="primary" :disabled="cInstanceSectionHomework.isPub == 1">修改</el-button> -->
          <el-button type="danger" @click="deleteHomework">删除</el-button>
          <!-- <el-button type="danger" @click="changeAddProblemdialogVisible" :disabled="cInstanceSectionHomework.isPub == 1">添加</el-button> -->
          <el-button
            type="success"
            @click="release"
            :disabled="cInstanceSectionHomework.isPub == 1"
            >发布</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <el-table
      :data="
        showProblemProg.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      height="300"
      border
      style="width: 100%"
    >
      <el-table-column type="index" label="ID" width="60"> </el-table-column>
      <el-table-column
        class="problemItem"
        prop="problemName"
        label="题干"
        width="200"
      >
      </el-table-column>
      <el-table-column
        class="problemItem"
        prop="problemTimeLimit"
        label="最大运行时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        class="problemItem"
        prop="problemMemoryLimit"
        label="最大运行内存"
        width="200"
      >
      </el-table-column>
      <el-table-column
        class="problemItem"
        prop="problemDescription"
        label="题目内容"
        :formatter="stateFormat"
        width="480"
      >
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="getProInfo(scope.$index)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.problemId)"
            :disabled="cInstanceSectionHomework.isPub == 1"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :page-count="pageCount"
      layout="total, sizes, prev, pager, next, jumper"
      :total="ProblemProg.length"
    >
    </el-pagination>

    <el-dialog
      title="题目详情"
      :append-to-body="true"
      :visible.sync="optiondetails"
      width="60%"
    >
      <span>题目：{{ this.opdetail.title }}</span
      ><br />
      <span>描述：{{ this.opdetail.des }}</span
      ><br />
      <span>输入格式：{{ this.opdetail.inputFormat }}</span
      ><br />
      <span>输出格式：{{ this.opdetail.outFormat }}</span
      ><br />
      <span>输入样例：{{ this.opdetail.samInput }}</span
      ><br />
      <span>输出样例：{{ this.opdetail.samOutput }}</span>
    </el-dialog>

    <!-- 弹窗 -->
    <el-dialog
      title="添加题目"
      :visible.sync="addProblemdialogVisible"
      width="80%"
      align="left"
    >
      请选择知识点
      <el-select
        style="width: 500px; height: 100%"
        v-model="cInstanceSectionHomework.knowledgeIds"
        multiple
        @change="selectProblem"
        placeholder="请选择知识点"
      >
        <el-option
          v-for="item in knowledges"
          :key="item.knowledgeid"
          :label="item.knowledgeName"
          :value="item.knowledgeid"
        >
        </el-option>
      </el-select>
      <el-button type="primary" round @click="getUnProblemProg">查询</el-button>
      <!-- 未选的编程题目 -->
      <el-table
        :data="UnProblemProg"
        @selection-change="handleSelectionChange"
        height="300"
        width="500"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column
          class="problemItem"
          prop="problemName"
          label="题干"
          width="180"
        >
        </el-table-column>
        <el-table-column
          class="problemItem"
          prop="problemTimeLimit"
          label="最大运行时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          class="problemItem"
          prop="problemMemoryLimit"
          label="最大运行内存"
          width="180"
        >
        </el-table-column>
        <el-table-column
          class="problemItem"
          prop="problemDescription"
          label="题目内容"
          :formatter="stateFormat"
        >
        </el-table-column>
      </el-table>
      <el-button @click="addProblemPros" type="primary">确认添加</el-button>
    </el-dialog>
  </el-dialog>
</template>

<script>
export default {
  name: "AlterCourseHomework",
  data() {
    return {
      diaVisible: false,
      cInstanceSectionHomework: {
        difficulty: "",
        startTime: "",
        endTime: "",
        knowledgeIds: "",
        pubTime: "", // 发布时间
        tip: "",
        title: "", // 标题
        homeworkId: 0, // 作业所对的讲的id
        pointsPerP: 0, //每题分值
        number: 0, // 题目数量
        problemId: "", // 题号
        homeworkId: "", // 作业号
      },
      sectionId: 0,
      currentPage: 1, // 当前是第几页
      pageCount: 0,
      pageSize: 10, // 每一页的大小
      ProblemProg: [], // 已选编程题列表
      ProblemProgNumber: [], //编程题题号数组，删除的时候删掉里面的元素，添加的时候向里面添加
      addProblemdialogVisible: false, // 弹窗是否开启
      knowledges: [], // 该讲对应的知识点
      UnProblemProg: [], // 该讲知识点对应的未选的编程题
      listCInstanceSectionHomeworkProblem: [], // 用来存放选中的题目
      ProblemProgStr: "", // 存放完整的
      code: 0, // 用来判断第几次添加题目
      showProblemProg: [], // 用来与删除时界面效果同步
      ispub: 0,
      opdetail: {}, //题目详情信息
      optiondetails: false, //题目详情弹框
    };
  },
  mounted() {
    // 获取该讲对应的知识点
    // this.getAllKnowledge();
    //  // 获取编程题
    // this.gethomeworkProblemProg();
    // // 获取作业信息
    // this.getHomeworkInfo();
  },
  methods: {
    changeDialogVisible(id) {
      this.diaVisible = !this.diaVisible;
      this.sectionId = id;
      // this.getAllKnowledge();  修复打开作业详情页面时弹出未选择知识点问题
      this.gethomeworkProblemProg();
      this.getHomeworkInfo();
    },
    getProInfo(index) {
      this.opdetail.title = this.showProblemProg[index].problemName;
      this.opdetail.des = this.showProblemProg[index].problemDescription;
      this.opdetail.inputFormat =
        this.showProblemProg[index].problemInputFormat;
      this.opdetail.outFormat = this.showProblemProg[index].problemOutputFormat;
      this.opdetail.samInput = this.showProblemProg[index].problemSampleInput;
      this.opdetail.samOutput = this.showProblemProg[index].problemSampleOutput;
      this.optiondetails = !this.optiondetails;
    },
    // 获取该讲对应的知识点
    getAllKnowledge() {
      this.$api.knowledge.knowledge
        .selectBySectionId({ sectionId: this.sectionId })
        .then((res) => {
          this.knowledges = res.data;
        });
    },
    // 获取没有添加的编程题
    getUnProblemProg() {
      let knowledegnode = "";
      if (this.cInstanceSectionHomework.knowledgeIds == null) {
        this.$message.error("请选择知识点");
      } else {
        for (
          let i = 0;
          i < this.cInstanceSectionHomework.knowledgeIds.length;
          i++
        ) {
          knowledegnode =
            knowledegnode + this.cInstanceSectionHomework.knowledgeIds[i] + ",";
        }
        this.$api.course.sectionhomework
          .getUnProblemProg({
            // 选中的知识点
            knowledgeIds: knowledegnode,
            // 已经选中的题目编号
            ProblemProgStr: this.ProblemProgStr,
          })
          .then((res) => {
            console.log(res.data);
            this.UnProblemProg = res.data;
          });
      }
    },
    // 获取编程题
    gethomeworkProblemProg() {
      this.$api.student.gethomework
        .gethomeworkProblemProg({ sectionId: this.sectionId })
        .then((res) => {
          if ((res.code = 200)) {
            this.ProblemProg = res.data;
            this.pageCount = this.ProblemProg.length / this.pageSize;
            this.handleCurrentChange(1);

            // 每次都更新
            this.ProblemProgNumber = [];
            for (let i = 0; i < this.ProblemProg.length; i++) {
              this.ProblemProgNumber[i] = this.ProblemProg[i].problemId;
            }
            this.ProblemProgStr = "";
            for (let i = 0; i < this.ProblemProgNumber.length; i++) {
              this.ProblemProgStr =
                this.ProblemProgStr + this.ProblemProgNumber[i] + ",";
            }
          }
          // console.log(this.ProblemProg);
          this.showProblemProg = this.ProblemProg;
          // console.log("全部的题号" + this.ProblemProgStr);
        }).catch(err => {
          this.showProblemProg = [];
        })
        
    },

    // 获取作业信息
    getHomeworkInfo() {
      this.$api.course.sectionhomework
        .findByTContentId({ TContentId: this.sectionId })
        .then((res) => {
          this.cInstanceSectionHomework = res.data[0];
          // console.log(this.cInstanceSectionHomework);
        });
    },

    // 删除作业
    deleteHomework() {
      this.$api.course.sectionhomework
        .updateIsdelete(this.cInstanceSectionHomework.id)
        .then((res) => {
          this.Msg(res.msg);
          // 删除完作业跳转到添加作业页面
          if ((res.code = 200)) {
            this.diaVisible = !this.diaVisible;
            //  this.$router.push("/course/courseContent");
          }
        });
    },

    // 发布作业
    release() {
      this.$api.course.sectionhomework
        .updateisPub({ sectionId: this.sectionId })
        .then((res) => {
          this.Msg(res.msg);
          this.cInstanceSectionHomework.isPub = 1;
          //this.$router.push("/course/courseContent");
        });
    },
    // 添加题目
    changeAddProblemdialogVisible() {
      this.addProblemdialogVisible = true;
      this.code = this.code + 1;
    },

    // 确认添加题目
    addProblemPros() {
      let homeworknode = "";
      let ProblemProgStr = "";
      // 已经选中的题目编号
      for (
        let i = 0;
        i < this.listCInstanceSectionHomeworkProblem.length;
        i++
      ) {
        homeworknode =
          homeworknode +
          this.listCInstanceSectionHomeworkProblem[i].problemId +
          ",";
      }
      // 数据库中最真实的数据
      for (let i = 0; i < this.ProblemProg.length; i++) {
        ProblemProgStr = ProblemProgStr + this.ProblemProg[i].problemId + ",";
      }
      // 组成最终的题目列表
      ProblemProgStr = ProblemProgStr + homeworknode;
      this.cInstanceSectionHomework.problemId = ProblemProgStr;
      console.log(this.cInstanceSectionHomework);
      this.$api.course.sectionhomework
        .addProblemPro(this.cInstanceSectionHomework)
        .then((res) => {
          this.Msg(res.msg);
          if ((res.code = 200)) {
            this.cInstanceSectionHomework.problemId = null;
            this.gethomeworkProblemProg();
            this.addProblemdialogVisible = false;
            this.listCInstanceSectionHomeworkProblem = [];
            this.code = 1;
            this.cInstanceSectionHomework.knowledgeIds = null;
            this.UnProblemProg = null;
          }
        });
    },
    // 讲
    handleSelectionChange(val) {
      this.listCInstanceSectionHomeworkProblem = val;
      if (this.code == 1) {
        val = [];
        this.code = 0;
      }
      console.log(this.listCInstanceSectionHomeworkProblem);
    },
    // 更新作业
    update() {
      if (
        !this.cInstanceSectionHomework.pubTime ||
        !this.cInstanceSectionHomework.startTime ||
        !this.cInstanceSectionHomework.endTime
      ) {
        this.errMsg("请选择时间");
        return;
      }

      if (
        new Date(this.cInstanceSectionHomework.startTime).getTime() >
        new Date(this.cInstanceSectionHomework.endTime).getTime()
      ) {
        this.errMsg("开始时间晚于结束时间");
        return;
      }
      for (let i = 0; i < this.ProblemProgNumber.length; i++) {
        this.cInstanceSectionHomework.problemId =
          this.cInstanceSectionHomework.problemId +
          this.ProblemProgNumber[i] +
          ",";
      }
      console.log(this.cInstanceSectionHomework);
      this.$api.course.sectionhomework
        .updatePart(this.cInstanceSectionHomework)
        .then((res) => {
          this.Msg(res.msg);
          if ((res.code = 200)) {
            this.getHomeworkInfo();
            this.gethomeworkProblemProg();
          }
        });
    },
    // 删除题目
    handleDelete(id) {
      this.$api.course.sectionhomework
        .delProblem({ homeworkId: this.cInstanceSectionHomework.id, proId: id })
        .then((res) => {
          this.Msg(res.msg);
          this.getHomeworkInfo();
          //  if (this.cInstanceSectionHomework.number == 0) {
          //    this.showProblemProg = [];
          //  }else{
          this.gethomeworkProblemProg();
        });
    },
    // 选中知识点触发
    selectProblem() {
      console.log(111);
    },
    stateFormat(row, column, cellValue) {
      // console.log(row , column , cellValue)
      if (!cellValue) return "";
      if (cellValue.length > 38) {
        //最长固定显示38个字符
        return cellValue.slice(0, 50) + "...";
      }
      return cellValue;
    },
    //控制当前的每页val条
    handleSizeChange(pagesizes) {
      this.pageSize = pagesizes;
    },
    // 当前val页
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
    },
  },
};
</script>

<style>
/* .alterButton{
  position: absolute;
  right: 0;
} */
.alterhomework {
  margin: 30px;
}
</style>