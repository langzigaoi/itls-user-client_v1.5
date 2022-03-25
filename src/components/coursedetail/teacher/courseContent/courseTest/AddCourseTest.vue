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
      <!-- <el-page-header @back="goBack" class="header"></el-page-header> -->
      <header align="left">测验信息</header>
      <el-form
        ref="form"
        :inline="true"
        :model="cInstanceSectionTest"
        label-width="100px"
      >
        <div class="grid-content bg-purple" align="left">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="cInstanceSectionTest.startTime"
              type="datetime"
              placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="截至时间">
            <el-date-picker
              v-model="cInstanceSectionTest.endTime"
              type="datetime"
              placeholder="选择截至时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="发布成绩时间">
            <el-date-picker
              v-model="cInstanceSectionTest.pubGradeTime"
              type="datetime"
              placeholder="选择成绩发布时间"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="标题">
            <el-input v-model="cInstanceSectionTest.title"></el-input>
          </el-form-item>
          <!-- <el-form-item label="题目数量"> -->
            <!-- <el-input v-model="cInstanceSectionTest.proNum"></el-input> -->
          <!-- </el-form-item> -->
          <!-- <el-form-item label="每题分值">
            <el-input v-model="cInstanceSectionTest.perScore"></el-input>
          </el-form-item> -->

          <el-form-item label="知识点">
            <!-- <el-select
              style="width: 500px; height: 100%"
              v-model="cInstanceSectionTest.knowledgeIds"
              multiple
              @change="selectProblem"
              placeholder="请选择知识点"
            >
              <el-option
                v-for="item in knowledges"
                :key="item.id"
                :label="item.name"
                :value="item.id"
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
          <!-- <el-form-item label="难度">
                  <el-input  v-model="cInstanceSectionTest.difficulty"></el-input>
              </el-form-item> -->
          <el-button type="primary" @click="submit" style="width: 100px"
            >组 卷</el-button
          >
        </div>
      </el-form>
      <!-- :data="problemList.slice((currentPage - 1) * pageSize,currentPage * pageSize)" -->
      <!-- {{cInstanceSectionTest}} -->
      <header align="left">测验题目</header>
      <el-table
        :data="problemList.slice((currentPage - 1) * pageSize,currentPage * pageSize)"
        @selection-change="handleSelectionChange"
        border
        style="overflow: scroll; width: 100%; max-height: 70vh"
        height="300"
        v-loading="loading"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column prop="title" label="题干" width="520">
        </el-table-column>
        <el-table-column prop="options" label="选项" width="400"> 
          <template slot-scope="scope">
                    <p>
                       {{scope.row.options.split("@").join(" ")}}
                    </p>
                </template>   
        </el-table-column>
        <el-table-column prop="answer" label="答案" width="120">
          <!-- <template slot-scope="scope">
                    {{JSON.parse(scope.row.options)[scope.row.answer].option}}
                </template>    -->
        </el-table-column>
        <!-- <el-table-column prop="analysis" label="解析" width="190">
        </el-table-column> -->
        <el-table-column prop="difficulty" label="难度" width="120">
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
       <alter-course-test ref="alterCourseTest" changeDialogVisible="changeDialogVisible"/>
    </div>
  </el-dialog>
</template>

<script>
import alterCourseTest from "./AlterCourseTest.vue";
export default {
  name: "AddCourseTest",
  components: {
    alterCourseTest,
  },
  data() {
    return {
      diaVisible: false,
      problemTotalNum: 0, //题目数量
      knowledgeState: "",
      allKnowledge: [],
      knowledgeIdList: [],
      courseId: "",
      problemList: [], //通过知识点获取到的题目
      rowProblemId: null,
      cInstanceSectionTest: {
        difficulty: "",
        startTime: "",
        endTime: "",
        knowledgeIds: "",
        pubGradeTime: "",
        tip: "",
        title: "",
        proNum: 0,
        perScore: 0, //每题分值
        listCInstanceSectionTestProblem: [],
      },
      knowledges: [],
      loading: false, //显示题目的表格
      currentPage: 1, // 当前是第几页
      pageCount: 0,
      pageSize: 10, // 每一页的大小
      option:"",
    };
  },
  mounted() {
    this.getcourseId();
    // //在url中获取节的id
    // let sectionId = this.$route.query.sectionId;
    // console.log("节的id", sectionId);
    // //  if(!sectionId){this.errMsg("路径非法");this.$router.go(-1);return;}
    // this.cInstanceSectionTest.sectionId = sectionId;
    // //  this.checkHasTest();
    // this.getAllKnowledge();
  },
  methods: {
    changeDialogVisible(id) {
      this.cInstanceSectionTest = {
        difficulty: "",
        startTime: "",
        endTime: "",
        knowledgeIds: "",
        pubGradeTime: "",
        tip: "",
        title: "",
        proNum: 0,
        perScore: 0, //每题分值
        listCInstanceSectionTestProblem: [],
      }
      this.problemList = [];
      this.knowledgeState = "";
      this.diaVisible = !this.diaVisible;
      this.cInstanceSectionTest.sectionId = id
      //this.getAllKnowledge();
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
      //this.getProgramList(nodeList);
      let ids = this.knowledgeIdList.toString();
      this.selectProblemChoice(ids);
      // console.log(ids);
      // console.log(this.knowledgeIdList);
    },

     // 根据知识点id查询题目
    // getProgramList(params) {
    //   console.log(params);
    //   this.$api.problem.prog.findByIdList(params).then((res) => {
    //     console.log("获取到的题目", res);
    //     this.problemList = res.data;
    //     this.pageCount = this.problemList.length / this.pageSize;
    //     this.handleCurrentChange(1);
    //     this.loading = false;
    //   });
    // },

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
    //  //检查是否有测试
    // checkHasTest(){
    //    this.$api.course.sectiontest.checkHasTest({ sectionId: this.cInstanceSectionTest.sectionId })
    //    .then(res =>{
    //      console.log('检查是否有测试的结果',res);
    //      if(res.data!=0){ //已经有测试就跳转到

    //      }
    //    })
    // },
    //获取所有的知识点
    getAllKnowledge() {
      this.$api.knowledge.knowledge.selectByDeep({ deep: 3 }).then((res) => {
        // console.log(res);
        this.knowledges = res.data;
        //转换数据进行显示
        this.knowledges.forEach((element) => {
          element.id = element.id.toString(); //转成字符类型 el-select 初始值设置问题
        });
      });
    },
    //知识点改变获取题目
    // selectProblem() {
    //   // console.log(this.cInstanceSectionTest.knowledgeIds.toString());
    //   console.log("重新获取题目");
    //   this.selectProblemChoice(
    //     this.cInstanceSectionTest.knowledgeIds.toString()
    //   );
    // },
    //获取知识点对应的题目
    selectProblemChoice(ids) {
      this.loading = true;
      this.$api.problem.choice
        .findProblemChoice({ node: ids })
        .then((res) => {
          this.problemList = res.data;
          this.pageCount = this.problemList.length / this.pageSize;
          this.handleCurrentChange(1);
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    //控制当前的每页val条
    handleSizeChange(pagesizes) {
      this.pageSize = pagesizes;
    },
    // 当前val页
    handleCurrentChange(currentChange) {
      this.currentPage = currentChange;
    },
    //选择题目改变
    handleSelectionChange(val) {
      this.cInstanceSectionTest.listCInstanceSectionTestProblem = val;
      // console.log("listCInstanceSectionTestProblem"+this.cInstanceSectionTest.listCInstanceSectionTestProblem);
    },
    //提交
    submit() {
      // console.log(this.cInstanceSectionTest.grades)
      // if(isNaN(this.cInstanceSectionTest.grades) ||!this.cInstanceSectionTest.grades ){
      //   this.errMsg("分值填写有误");
      //   return
      // }
      if (
        !this.cInstanceSectionTest.pubGradeTime ||
        !this.cInstanceSectionTest.startTime ||
        !this.cInstanceSectionTest.endTime
      ) {
        this.errMsg("请选择时间");
        return;
      }

      if (
        new Date(this.cInstanceSectionTest.startTime).getTime() >
        new Date(this.cInstanceSectionTest.endTime).getTime()
      ) {
        this.errMsg("开始时间晚于结束时间");
        return;
      }
      let problemnode = [];
      for (
        let i = 0;
        i < this.cInstanceSectionTest.listCInstanceSectionTestProblem.length;
        i++
      ) {
        let problem = {};
        problem.choiceProblemId =
          this.cInstanceSectionTest.listCInstanceSectionTestProblem[i].id;
        problem.grades = this.cInstanceSectionTest.grades;
        problemnode.push(problem);
      }
      // this.cInstanceSectionTest.listCInstanceSectionTestProblem = problemnode;
      this.cInstanceSectionTest.testProblemStr = JSON.stringify(problemnode);
      console.log(this.cInstanceSectionTest.testProblemStr);
      // this.cInstanceSectionTest.knowledgeIds = this.cInstanceSectionTest.knowledgeIds.toString();
      this.cInstanceSectionTest.knowledgeIds = this.knowledgeIdList.toString();
      this.$api.course.sectiontest
        .insert(this.cInstanceSectionTest)
        .then((res) => {
          console.log(res);
          this.Msg(res.msg);
          if ((res.code == 200)) {
            // this.$router.push(
            //   `alterCourseTest?sectionId=${this.cInstanceSectionTest.sectionId}`
            // );
            this.diaVisible = !this.diaVisible;
            this.$refs.alterCourseTest.changeDialogVisible(this.cInstanceSectionTest.sectionId);   
          }
        }).catch(err => {
          console.log(err);
        })
        
    },
    // 返回
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
/* .el-form-item {
  min-width: 160px;
} */
header {
  font-size: 1.2em;
  font-weight: 600;
  border-top: 1px solid #ccc;
  margin-top: 30px;
}
</style>