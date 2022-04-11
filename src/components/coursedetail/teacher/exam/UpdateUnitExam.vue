<template>
  <div id="updateContent">
    <div class="table">
      <el-form :inline="true" class="inline" label-width="100px">
        <el-form-item label="考试名称:">
          <el-input v-model="unitExam.examName" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="unitExam.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="unitExam.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item label="成绩公布时间">
          <el-date-picker v-model="unitExam.pubTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        

        <el-form-item label="题目总数">
          <el-input v-model="unitExam.num" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="试卷分数">
          <el-input v-model="unitExam.fraction" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <br />
        <el-form-item label="选择题总数">
          <el-input v-model="unitExam.choiceNum" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="选择题分数">
          <el-input v-model="unitExam.choicePoint" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="应用题总数">
          <el-input v-model="unitExam.applicationNum" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <br />
        <el-form-item label="应用题分数">
          <el-input v-model="unitExam.applicationPoint" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        
        <el-form-item label="编程题总数">
          <el-input v-model="unitExam.progNum" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <el-form-item label="编程题分数">
          <el-input v-model="unitExam.progPoint" placeholder="请输入内容" clearable></el-input>
        </el-form-item>
        <br />

      </el-form>
      <div class="btn">
        <el-button-group>
          <el-button type="primary" round  title="确认提交" :loading="loading" @click="updateExamInfo()">
            {{ loading ? '提交中...' : '确认提交'}}
          </el-button>
          <el-button type="success" round  title="添加题目" @click="addExamProblem()">添加题目</el-button>
        </el-button-group>

        <el-drawer title="添加题目" :visible.sync="drawer" direction="ttb" custom-class="demo-drawer" ref="drawer" size="80%">
          <div class="drawer__content">
            <el-form>
              <el-form-item label="章节" style="left: 10%">
                <el-select style="width: 500px; height: 100%; text-align: left" v-model="chapter" multiple placeholder="请选择章节">
                  <el-option v-for="(item, index) in chapters" :key="index" :label="item" :value="item"></el-option>
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
                <el-button type="primary" round @click="getProblems()">查询</el-button>
              </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
              <el-button @click="cancelForm">取 消</el-button>
              <el-button type="primary" @click="updateProblemId()" :loading="loading">确定</el-button>
            </div>
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
              </el-table-column>
              <el-table-column
                class="problemItem"
                prop="answer"
                label="答案"
                width="400"
              >
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
        </el-drawer>
      </div>
      <div class="choice">
        <span class="choice-title">选择题</span>
        <el-table :data="choiceList" @selection-change="handleSelectionChange" height="400" border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column class="problemItem" prop="title" label="题目" width="180">
          </el-table-column>
          <el-table-column class="problemItem"  label="选项" width="180">
            <template slot-scope="scope">
            <p v-for="option in JSON.parse(scope.row.options)" :key="option.id">
              <span style="font-weight:700">:</span>{{option.option}}
            </p>
          </template> 
          </el-table-column>
          <el-table-column class="problemItem" prop="answer" label="答案" width="180">
            <template slot-scope="scope">
            {{JSON.parse(scope.row.options)[scope.row.answer].option}}
          </template> 
          </el-table-column>
          <el-table-column class="problemItem" prop="difficulty" label="难度" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="prog">
        <span class="prog-title">编程题</span>
        <el-table :data="progList" @selection-change="handleSelectionChange"  border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column class="problemItem" prop="problemName" label="题干" width="180">
          </el-table-column>
          <el-table-column class="problemItem" prop="problemTimeLimit" label="最大运行时间" width="180">
          </el-table-column>
          <el-table-column class="problemItem" prop="problemMemoryLimit" label="最大运行内存" width="180">
          </el-table-column>
          <el-table-column class="problemItem" prop="problemDescription" label="题目内容" :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="application">
        <span class="application-title">应用题</span>
        <el-table :data="applicationList" @selection-change="handleSelectionChange"  border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column class="problemItem" prop="problemName" label="题干" width="180">
          </el-table-column>
          <el-table-column class="problemItem" prop="problemTimeLimit" label="最大运行时间" width="180">
          </el-table-column>
          <el-table-column class="problemItem" prop="problemMemoryLimit" label="最大运行内存" width="180">
          </el-table-column>
          <el-table-column class="problemItem" prop="problemDescription" label="题目内容" :show-overflow-tooltip="true">
          </el-table-column>
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loading: false, 
      choiceList: [],
      applicationList: [],
      progList: [],
      unitExam: [],
      drawer: false,
      chapters: [], //获取的章节
      chapter: [],  //选定的章节
      stringChapter: "", //章节转换未字符串
      type: "", //题型
      choices: [], //选中的选择题
      progs: [], //选中的编程题
      applications: [], //选中的应用题
      problemId: "", //选中的题号
      problemIds: "", //后端获取的题号
      problemList: [],
      currentPage: 1, // 当前是第几页
      pageSize: 5, // 每一页的大小
    }
  },
  mounted() {
    this.getExamChoice();
    this.getExamProg();
    this.getExamInfo();
    this.getProblemId();
  },
  methods: {
    //查询考试信息
    getExamInfo() {
      this.$api.exam.midsemester
        .getNewExamInfo({id: this.$route.query.id})
        .then((res) => {
          this.unitExam = res.data;
          console.log(this.unitExam);
        })
        .catch((err) => {
          console.log("获取失败");
        })
    },
    //查询选择题
    getExamChoice() {
      this.$api.exam.midsemester
        .getExamChoice({ id: this.$route.query.id })
        .then((res) => {
          this.choiceList = res.data;
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
    //获取编程题
    getExamProg() {
      this.$api.exam.midsemester
        .getExamProg({ id: this.$route.query.id })
        .then((res) => {
          this.progList = res.data;
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
    //修改考试信息
    updateExamInfo() {
      this.$api.exam.midsemester
        .updateExamInfo(this.unitExam)
        .then((res) => {
          this.$message.success("修改成功")
        })
        .catch((err) => {
          this.$message.error("修改失败")
        })
    },
    //添加题目
    addExamProblem() {
      this.drawer = true;
      this.getAllKonwledge();
    },
    getAllKonwledge() {
      let oldchapters = [];
      this.$api.exam.midsemester
        .getCourseChapter({insId: this.$store.state.course.courseCinstanceId}).then((res) => {
        oldchapters = res.data;
        //删去数组中重复的数据
        for (let i = 0; i < oldchapters.length; i++) {
          if (this.chapters.indexOf(oldchapters[i]) === -1) {
            this.chapters.push(oldchapters[i]);
          }
        }
      });
    },
    //跟具章节题型查询题目
    getProblems() {
      if (this.chapter == null) {
        this.$message.error("请选择章节");
      }
      if (this.type == null) {
        this.$message.error("请选择题型");
      }
      for(let i=0; i < this.chapter.length; i++){
        this.stringChapter = this.stringChapter + '"' + this.chapter[i] + '"' + ',';
      }
      console.log(this.stringChapter);
      this.$api.exam.midsemester
        .getProblem({chapter: this.stringChapter, type: this.type})
        .then((res) => {
          this.problemList = res.data;
          console.log(this.problemList);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$message.error("获取失败");
          console.log("获取失败");
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
        node = node + this.applications[k].problemId + ",";
      }
      this.problemId = node;
      console.log(this.problemId)
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
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
    //获取考试题目Id
    getProblemId(){
      this.$api.exam.midsemester
        .getProblemId({id: this.$route.query.id})
        .then((res) => {
          this.problemIds = res.data;
          console.log(this.problemIds);
        })
        .catch((err) => {
          console.log("获取失败");
        })
    },
    updateProblemId() {
      this.problemId = this.problemIds + this.problemId
      this.$api.exam.midsemester
        .updateProblemId({problemId: this.problemId, id: this.$route.query.id })
        .then((res) => {
          this.$message.success("添加成功");
          console.log("更新成功")
        })
        .catch((err) => {
          this.$$message.err("跟新失败");
          console.log("更新失败")
        })
    },
    cancelForm() {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.loading = false;
          this.drawer = false;
          clearTimeout(this.timer);
          this.getExamChoice();
          this.getExamProg();
        })
        .catch(_ => { });
    }
  }
}
</script>

<style>
#updateContent{
  width: 100%;
  height: 100%;
  /* background-color: red; */
}
.table{
  margin-top: 2%;
  float: left;
}
.choice{
  margin-top: 20px;
}
.choice .choice-title{
  position: relative;
  font-size: 25px;
}
.application{
  margin-top: 20px;
}
.application .application-title{
  font-size: 25px;
}
.prog{
  margin-top: 20px;
}
.prog .prog-title{
  font-size: 25px;
}
.el-drawer__header{
  position: relative;
  /* left: 10px; */
  text-align: left;
  font-size: 20px;
}
</style>