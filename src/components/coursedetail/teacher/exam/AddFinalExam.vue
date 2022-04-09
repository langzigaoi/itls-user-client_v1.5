<template>
  <div id="content">
    <el-divider></el-divider>
    <div class="inform">
      <el-form :inline="true" class="inline" label-width="100px">
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="cInstanceUnitExam.startTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="cInstanceUnitExam.endTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        
        <el-form-item label="成绩公布时间">
          <el-date-picker
            v-model="cInstanceUnitExam.pubTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <br />
        
        <el-form-item label="开始范围">
          <el-select
            style="width: 220px; height: 100%"
            v-model="cInstanceUnitExam.startRange"
            placeholder="请选择知识点"
          >
            <el-option
              v-for="(item, index) in chapters"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结束范围">
          <el-select
            style="width: 220px; height: 100%"
            v-model="cInstanceUnitExam.endRange"
            placeholder="请选择知识点"
          >
            <el-option
              v-for="(item, index) in chapters"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目总数">
          <el-input
            v-model="cInstanceUnitExam.num"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="试卷分数">
          <el-input
            v-model="cInstanceUnitExam.fraction"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
  
        <el-form-item label="选择题总数">
          <el-input
            v-model="cInstanceUnitExam.choiceNum"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="选择题分数">
          <el-input
            v-model="cInstanceUnitExam.choicePoint"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <br>
        <el-form-item label="应用题总数">
          <el-input
            v-model="cInstanceUnitExam.applicationNum"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        
        <el-form-item label="应用题分数">
          <el-input
            v-model="cInstanceUnitExam.applicationPoint"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="编程题总数">
          <el-input
            v-model="cInstanceUnitExam.progNum"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="编程题分数">
          <el-input
            v-model="cInstanceUnitExam.progPoint"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item label="章节">
          <el-select
            style="width: 500px; height: 100%"
            v-model="chapter"
            multiple
            placeholder="请选择知识点"
          >
            <el-option
              v-for="(item, index) in chapters"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="考试题型">
          <el-select v-model="type" placeholder="请选择活动区域">
            <el-option value="选择题">选择题</el-option>
            <el-option value="应用题">应用题</el-option>
            <el-option value="编程题">编程题</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="getProblems()"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="SubUnitExam">添加考试信息</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div v-if="type == '选择题'">
      <el-table
        :data="
          problemList.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        @selection-change="handleSelection"
        height="300"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          class="problemItem"
          prop="title"
          label="题干"
          width="300"
        >
        </el-table-column>
        <el-table-column
          class="problemItem"
          prop="options"
          label="选项"
          width="450"
        >
          <!-- <template slot-scope="scope">
            <p v-for="option in JSON.parse(scope.row.options)" :key="option.id">
              <span style="font-weight:700">:</span>{{option.option}}
            </p>
          </template>  -->
        </el-table-column>
        <el-table-column
          class="problemItem"
          prop="answer"
          label="答案"
          width="400"
        >
          <!-- <template slot-scope="scope">
            {{JSON.parse(scope.row.options)[scope.row.answer].option}}
          </template> -->
        </el-table-column>
        <el-table-column
          class="problemItem"
          prop="difficulty"
          label="难度"
          width="400"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="problemList.length"
      >
      </el-pagination>
    </div>

    <div v-if="type == '应用题'">
      <el-table
        :data="
          problemList.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        height="300"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
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
      <el-pagination
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="problemList.length"
      >
      </el-pagination>
    </div>

    <div v-if="type == '编程题'">
      <el-table
        :data="
          problemList.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        @selection-change="handleSelection"
        height="300"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
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
      <el-pagination
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="problemList.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cInstanceUnitExam: {
        chapter: "", //章节
        insId: "", //课程实例id
        examName: "期末考试",
        startTime: "",
        endTime: "",
        pubTime: "",
        startRange: "", //开始范围
        endRange: "",  //结束范围
        examType: 2, //考试类型
        num: "",  //试卷题目数量
        fraction: "", //试卷分数
        choiceNum: "", //选择题数量
        choicePoint: "", //选择题分数
        applicationNum: 0, //应用题数量
        applicationPoint: 0, //应用题分数
        progNum: "", //编程题数量
        progPoint: "", //编程题分数
        problemId: "", //选中的题号
      },
      chapter: [],  //选定的章节
      chapters: [], //获取的章节
      // konwledges: [],
      problemList: [], // 章节获取的题目
      currentPage: 1, // 当前是第几页
      pageSize: 5, // 每一页的大小
      type: "", //选择的题型
      choices: [], //选中的选择题
      progs: [], //选中的编程题
      applications: [], //选中的应用题
    };
  },
  mounted() {
    // 获取章节
    this.getAllKnowledge();
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    // 获取章节
    getAllKnowledge() {
      let oldchapters = [];
      this.$api.exam.midsemester.getCourseChapter({insId: this.$store.state.course.courseCinstanceId}).then((res) => {
        oldchapters = res.data;
        //删去数组中重复的数据
        for (let i = 0; i < oldchapters.length; i++) {
          if (this.chapters.indexOf(oldchapters[i]) === -1) {
            this.chapters.push(oldchapters[i]);
          }
        }
      });
    },
    //获取章节对应的题目
    getProblems() {
      // let newChapter = "";
      let resultList = [];
      if (this.cInstanceUnitExam.chapter == null) {
        this.$message.error("请选择章节");
      }
      if (this.type == null) {
        this.$message.error("请选择题型");
      }
      for(let i=0; i < this.chapter.length; i++){
        this.cInstanceUnitExam.chapter = this.cInstanceUnitExam.chapter + '"' + this.chapter[i] + '"' + ',';
      }
      this.$api.exam.midsemester
        .getProblem({chapter: this.cInstanceUnitExam.chapter, type: this.type})
        .then((res) => {
          resultList = res.data;
          // console.log(resultList);
          if(this.type == "选择题"){
            this.problemList = [];
            for(let i = this.cInstanceUnitExam.choiceNum-1; i >= 0; i--){
              let index = Math.floor(Math.random() * resultList.length);
              console.log(resultList[index])
              this.problemList.push(resultList[index]);
              resultList.splice(index,1);
            }
          }else if(this.type == "编程题"){
            this.problemList = [];
            for(let i = this.cInstanceUnitExam.progNum-1; i >= 0; i--){
              let index = Math.floor(Math.random() * resultList.length);
              console.log(resultList[index])
              this.problemList.push(resultList[index]);
              resultList.splice(index,1);
            }
          }
          console.log(this.problemList);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("获取失败");
          console.log("获取失败");
        })
    },
    //添加考试
    SubUnitExam() {
      this.cInstanceUnitExam.insId = this.$store.state.course.courseCinstanceId;
      console.log(this.cInstanceUnitExam.insId);
      this.$api.exam.midsemester
        .addMidsemesterExam(this.cInstanceUnitExam)
        .then((res) => {
          console.log("添加成功");
          this.$message.success("添加成功");
        })
        .catch((err) => {
          // this.$message.err("添加失败");
          console.log("添加失败");
        })
    },
    // 选择题目 val中保存着选中的题目
    handleSelection(val) {
      let node = "";
      if (this.type == "选择题") {
        this.choices = val;
        console.log(this.choices);
      } else if (this.type == "编程题") {
        this.progs = val;
      } else if (this.type == "应用题") {
        this.applications = val;
      }
      for(let i = 0; i < this.choices.length; i++){
        node = node + this.choices[i].id + ",";
      }
      for(let j = 0;  j< this.progs.length; j++){
        node = node + this.progs[j].problemId + ",";
      }
      for(let k = 0; k < this.applications.length; k++){
        node = node + this.applications[i].problemId + ",";
      }
      this.cInstanceUnitExam.problemId = node;
      console.log(this.cInstanceUnitExam.problemId)
    },
    selectProblem() {
      console.log(111);
    },
    stateFormat(row, column, cellValue) {
      // console.log(row , column , cellValue)
      if (!cellValue) return "";
      if (cellValue.length > 38) {
        //最长固定显示38个字符
        return cellValue.slice(0, 38) + "...";
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
  }
}
</script>

<style>
#content{
  margin-left: 30px;
  width: 100%;
  height: 100%;
  text-align: left;
  /* background-color: blue; */
}
</style>