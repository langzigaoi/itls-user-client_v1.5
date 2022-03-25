<template>
  <el-dialog
    top="5vh"
    align="left"
    title=""
    :visible.sync="diaVisible"
    :append-to-body="true"
    width="80%"
    style=""
  >
    <div style="margin-left: 10px">
      <header align="left">作业信息</header>
    <el-form
      ref="form"
      :inline="true"
      :model="cInstanceSectionHomework"
      label-width="100px"
    >
    
      <!-- <el-row type="flex" class="row-bg" justify="center"> -->
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
              placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布成绩时间">
            <el-date-picker
              v-model="cInstanceSectionHomework.pubTime"
              type="datetime"
              placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="标题">
            <el-input 
              v-model="cInstanceSectionHomework.title"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="题目数量">
            <el-input class="homework_number" v-model="cInstanceSectionHomework.number"></el-input>
          </el-form-item>
           <el-form-item label="分值">
            <el-input class="homework_pointsPerP" v-model="cInstanceSectionHomework.pointsPerP"></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="难度">
            <el-input class="homework_title" v-model="cInstanceSectionHomework.difficulty"></el-input>
          </el-form-item> -->
          <div>
            <el-form-item label="知识点">
              <!-- <el-select
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
              </el-select> -->
              <el-cascader
                ref="cascader"
                style="width: 780px"
                v-model="knowledgeState"
                placeholder="请选择知识点"
                :options="allKnowledge"
                :props="{ checkStrictly: false, multiple: true }"
                @change="change"
                clearable
              ></el-cascader>
            </el-form-item>
            <!-- <el-button type="primary" round @click="getProblemProg">查询</el-button> -->
            <el-button type="primary"  @click="SubProblemProg">组卷</el-button>
          </div>
        </div>
      <!-- </el-row> -->
    </el-form>

    <!-- <el-table
      :data="problemList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      @selection-change="handleSelectionChange"
      height="300"
      border
      style="width: 100%"
    > -->
      <el-table
        :data="problemList.slice((currentPage - 1) * pageSize,currentPage * pageSize)"
        @selection-change="handleSelectionChange"
        border
        style="overflow: scroll; width: 100%; max-height: 70vh"
        height="300"
        v-loading="loading"
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
    <!-- <el-pagination
      align="left"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="problemList.length"
    >
    </el-pagination> -->
    <el-pagination
          align="center"
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
    <alter-course-homework ref="alterCourseHomework" changeDialogVisible="changeDialogVisible"/>
    </div>
  </el-dialog>
</template>

<script>
import alterCourseHomework from "./AlterCourseHomework.vue";
export default {
  name: "AddCourseHomework",
  components: {
    alterCourseHomework,
  },
  data() {
    return {
      diaVisible: false,
      knowledgeState: "",
      allKnowledge: [],
      knowledgeIdList: [],
      courseId: "",
      problemList: [], //通过知识点获取到的题目
      rowProblemId: null,
      cInstanceSectionHomework: {
        difficulty: "",
        startTime: "",
        endTime: "",
        knowledgeIds: "", // 被选中的知识点
        pubTime: "", // 发布时间
        tip: "", 
        title: "", // 标题
        homeworkId: 0, // 作业所对的讲的id
        pointsPerP: 0, //每题分值
        number: 0, // 题目数量
        problemId: "", // 题号
        selectProblemNumber:0,
      },
      sectionId:0,
      knowledges: [],  // 该讲对应的知识点
      problemList: [], // 知识点获取的编程题
      currentPage: 1, // 当前是第几页
      pageSize: 10, // 每一页的大小
      pageCount:0,
      loading: false, //显示题目的表格
      listCInstanceSectionHomeworkProblem: [],
    };
  },
  mounted() {
    // 获取该讲对应的知识点
    // this.getAllKnowledge();
    this.getcourseId();
  },
  methods: {

     changeDialogVisible(id) {
       this.cInstanceSectionHomework = {
        difficulty: "",
        startTime: "",
        endTime: "",
        knowledgeIds: "", // 被选中的知识点
        pubTime: "", // 发布时间
        tip: "", 
        title: "", // 标题
        homeworkId: 0, // 作业所对的讲的id
        pointsPerP: 0, //每题分值
        number: 0, // 题目数量
        problemId: "", // 题号
        selectProblemNumber:0,
      }
      this.problemList = [];
      this.knowledgeState = "";
      this.diaVisible = !this.diaVisible;
      this.sectionId = id;
      this.getKnowledge(this.courseId);
    },
     //  获取课程id
    getcourseId() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.courseId = res.data.courseId;
        });
    },
    //知识点选择模块
    change(val) {
      let nodesObj = this.$refs["cascader"].getCheckedNodes();
      let nodeList = [];
      for (let index = 0; index < nodesObj.length; index++) {
        nodeList.push(nodesObj[index].value);
      }
      this.knowledgeIdList = nodeList;
      this.getProgramList(nodeList);
      console.log(this.knowledgeIdList);
    },
    handleCurrentChange(currentChange) {
      // 当前页
      this.nowPage = [];
      this.currentPage = currentChange;
      currentChange = currentChange - 1;
      let beginCount = currentChange * this.pageSize;
      let endCount =
        (currentChange + 1) * this.pageSize > this.problemList.length
          ? this.problemList.length
          : (currentChange + 1) * this.pageSize;
      console.log(beginCount + "--" + endCount);
      this.indexMethod(beginCount);
      for (let index = beginCount; index < endCount; index++) {
        this.nowPage.push(this.problemList[index]);
      }
      console.log(this.nowPage);
      this.handleToggleRowSelection();
    },

    // 表格序号
    indexMethod: function (index) {
      return index + 1;
    },

    handleToggleRowSelection() {
      // console.log(this.$refs.multipleTable);
      // console.log(this.rowProblemId);
      // console.log(this.nowPage);
      this.$nextTick(() => {
        this.rowProblemId.forEach((row) => {
          console.log(row.real);
          if (this.nowPage.indexOf(row.real) !== -1) {
            let x = this.nowPage.indexOf(row.real);
            console.log(x);
            this.$refs.multipleTable.toggleRowSelection(this.nowPage[x]);
          }
        });
      });
    },

    async getKnowledge(params) {
      let deep1 = [];
      let deep2 = [];
      let deep3 = [];
      let deep4 = [];
      let deep5 = [];
      let deep6 = [];
      await this.$api.knowledge.knowledge
        .findList({ courseId: params })
        .then((res) => {
          let data = res.data;
          // console.log(data);
          for (let index = 0; index < data.length; index++) {
            if (data[index].deep == 1) {
              deep1.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 2) {
              deep2.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 3) {
              deep3.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 4) {
              deep4.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 5) {
              deep5.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            } else if (data[index].deep == 6) {
              deep6.push({
                value: data[index].id,
                label: data[index].name,
                parentId: data[index].parentId,
              });
            }
          }
        });
      let newDeep2 = [];
      for (let index = 0; index < deep2.length; index++) {
        newDeep2.push(this.getChildren(deep2[index].value, deep3));
      }
      // console.log(newDeep2);
      let newDeep3 = [];
      for (let index = 0; index < deep3.length; index++) {
        newDeep3.push(this.getChildren(deep3[index].value, deep4));
      }
      // console.log(newDeep3);
      let newDeep4 = [];
      for (let index = 0; index < deep4.length; index++) {
        newDeep4.push(this.getChildren(deep4[index].value, deep5));
      }
      // console.log(newDeep4);
      let newDeep5 = [];
      for (let index = 0; index < deep5.length; index++) {
        newDeep5.push(this.getChildren(deep5[index].value, deep6));
      }
      newDeep4 = this.beChildren(newDeep4, newDeep5);
      newDeep3 = this.beChildren(newDeep3, newDeep4);
      newDeep2 = this.beChildren(newDeep2, newDeep3);
      // console.log(newDeep2);
      for (let index = 0; index < newDeep2.length; index++) {
        deep2[index].children = newDeep2[index];
      }
      this.allKnowledge = deep2;
      // console.log(deep2);
    },
      // 知识点级联选择器处理
    getChildren(parentId, arr) {
      let array = [];
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].parentId === parentId) {
          array.push(arr[index]);
        }
      }
      return array;
    },
    beChildren(arr1, arr2) {
      let k = 0;
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
          // console.log(arr2[k]);
          if (arr2[k] !== [] && arr2[k] !== undefined && arr2[k].length !== 0) {
            arr1[i][j].children = arr2[k];
          }
          k++;
        }
      }
      // console.log(arr1);
      return arr1;
    },
    problemTotalNumChange(val) {
      console.log(val);
      this.problemList = this.problemList.slice(0, val);
    },
       // 根据知识点id查询题目
    getProgramList(params) {
      console.log(params);
      this.$api.problem.prog.findByIdList(params).then((res) => {
        console.log("获取到的题目", res);
        this.problemList = res.data;
        this.pageCount = this.problemList.length / this.pageSize;
        this.handleCurrentChange(1);
        this.loading = false;
      });
    },
    // 将作业提交
    SubProblemProg() {
      // this.cInstanceSectionHomework.homeworkId = parseInt(this.$route.query.sectionId);
      this.cInstanceSectionHomework.homeworkId = parseInt(this.sectionId);
      this.$api.course.sectionhomework
        .addHomework(
         this.cInstanceSectionHomework
        )
        .then((res) => {
          this.Msg(res.msg);
          if(res.code == 200){
            //  this.$router.push({
            //   path: "/course/alterCourseHomework",
            //   query: { sectionId: this.sectionId },
            // })
            this.diaVisible = !this.diaVisible;
            this.$refs.alterCourseHomework.changeDialogVisible(this.sectionId);
          }
        });
    },

    // 选择编程题 val中保存着选中的题目
    handleSelectionChange(val) {
      this.listCInstanceSectionHomeworkProblem = val;
      let homeworknode = "";
      for (
        let i = 0;
        i < this.listCInstanceSectionHomeworkProblem.length;
        i++
      ) {
        homeworknode = homeworknode + this.listCInstanceSectionHomeworkProblem[i].problemId + ",";
      }
      this.cInstanceSectionHomework.problemId = homeworknode;
    },

    // 获取该讲对应的知识点
    getAllKnowledge() {
      this.$api.knowledge.knowledge
        .selectBySectionId({ sectionId: this.sectionId})
        .then((res) => {
          this.knowledges = res.data;
        });
    },
    // 选中改变
    selectProblem() {
      console.log(111);
    },
    getProblemProg() {
      let knowledegnode = "";
      if (this.cInstanceSectionHomework.knowledgeIds == null) {
        this.$message.error("请选择知识点");
      }
      for (
        let i = 0;
        i < this.cInstanceSectionHomework.knowledgeIds.length;
        i++
      ) {
        knowledegnode =
          knowledegnode + this.cInstanceSectionHomework.knowledgeIds[i] + ",";
      }
      this.$api.problem.prog
        .findProblemProg({ node: knowledegnode })
        .then((res) => {
          console.log("获取到的题目", res);
          this.problemList = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log("获取失败");
        });
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
     // 返回
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
.setposition {
  position:relative;
  left: -120px;
}
header {
  font-size: 1.2em;
  font-weight: 600;
  border-top: 1px solid #ccc;
  /* margin-top: 30px; */
  /* margin-left: 20px; */
}
.homework_title{
  margin-right: 40px;
}
.homework_number{
  margin-right: 20px;
}
.homework_pointsPerP{
   margin-right: 60px;
}
.homework_message{
  margin-top: 20px;
  margin-left: 20px;
  text-align: left;
}
</style>