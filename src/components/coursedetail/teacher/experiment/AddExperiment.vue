<template>
  <div>
    <el-dialog
      top="5vh"
      align="left"
      title=""
      :visible.sync="dialogVisible"
      width="1196px"
      style="overflow: auto !important"
    >
      <div style="height: 550px; overflow-y: auto; overflow-x: hidden">
        <el-form
          ref="form"
          :inline="true"
          :model="experiment"
          class="experimentForm"
        >
          <!-- <el-row type="flex" justify="center"> -->
          <!-- <div align="center"> -->
          <el-row
            :gutter="10"
            type="flex"
            justify="center"
            style="height: 30px"
          >
            <el-col :span="6">
              <el-form-item label="实验序号">
                <el-input
                  v-model="experiment.order"
                  size="small"
                  style="width: 200px"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="实验名称">
                <el-input
                  size="small"
                  v-model="experiment.name"
                  style="width: 200px"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="实验地点">
                <el-input
                  v-model="experiment.location"
                  size="small"
                  style="width: 200px"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            :gutter="10"
            type="flex"
            justify="center"
            style="height: 30px"
          >
            <el-col :span="6">
              <el-form-item label="实验环境">
                <el-input
                  v-model="experiment.environment"
                  size="small"
                  style="width: 200px"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="题目数量">
                <el-input
                  v-model="experiment.number"
                  size="small"
                  :disabled="true"
                  style="width: 200px"
                  clearable=""
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="每题分值">
                <el-input
                  v-model="experiment.pointsPerP"
                  size="small"
                  style="width: 200px"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            :gutter="10"
            type="flex"
            justify="center"
            style="height: 30px"
          >
            <el-col :span="6">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="experiment.startTime"
                  type="datetime"
                  size="small"
                  style="width: 200px"
                  placeholder="选择开始时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="截止时间">
                <el-date-picker
                  v-model="experiment.endTime"
                  type="datetime"
                  size="small"
                  style="width: 200px"
                  placeholder="选择截止时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发布时间">
                <el-date-picker
                  v-model="experiment.pubTime"
                  type="datetime"
                  size="small"
                  style="width: 200px"
                  placeholder="选择成绩发布时间"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            :gutter="10"
            type="flex"
            justify="center"
            style="height: 110px"
          >
            <el-form-item label="实验目的">
              <el-input
                type="textarea"
                v-model="experiment.object"
                style="width: 780px"
                rows="5"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-row
            :gutter="10"
            type="flex"
            justify="center"
            style="height: 30px"
          >
            <el-form-item label="知识范围">
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
          </el-row>
          <!-- </div> -->
          <!-- </el-row> -->
        </el-form>

        <el-table
          :data="nowPage"
          ref="multipleTable"
          @select="handleSelectionChange"
          @select-all="handleSelectionAll"
          height="400"
          style="width: 1000px; padding-left: 130px"
          :header-cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column
            type="index"
            width="80"
            label="序号"
            align="center"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column
            class="problemItem"
            prop="problemName"
            label="题目名称"
            width="150"
          >
          </el-table-column>
          <!-- <el-table-column
            class="problemItem"
            prop="problemTimeLimit"
            label="最大运行时间"
            width="120"
          >
          </el-table-column>
          <el-table-column
            class="problemItem"
            prop="problemMemoryLimit"
            label="最大运行内存"
            width="120"
          >
          </el-table-column> -->
          <el-table-column
            class="problemItem"
            prop="problemDescription"
            label="题目内容"
            width="800"
          >
          </el-table-column>
        </el-table>
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
        </el-pagination
        ><br />

        <div style="text-align: center">
          <el-button
            type="primary"
            size="small"
            @click="SubProblemProg"
            :loadingButton="loadingButton"
          >
            {{ loadingButton ? "提交中..." : "确定" }}
          </el-button>
          <!-- <el-button type="primary" size="small" @click="test"> 选中 </el-button> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      pageCount: 0,
      nowPage: [],
      pageSize: 10,
      currentPage: 1,
      allKnowledge: [],
      knowledgeState: "",
      courseId: "",
      knowledgeIdList: [],
      knowledgeId: [],

      problemTotalNum: 0, //题目数量
      experiment: {
        id: "",
        code: "",
        insId: "",
        order: "",
        name: "",
        object: "",
        environment: "",
        location: "",
        startTime: "",
        endTime: "",
        number: "",
        pointsPerP: "",
        pubTime: "",
        isPub: "",
        problemId: [],
        knowledgeIds: "",
      },
      knowledges: [],
      problemList: [], //通过知识点获取到的题目
      loading: false, //显示题目的表格
      loadingButton: false,
      listExperimentProblem: [],
      TempProblemId: [],
      rowProblemId: null,
    };
  },
  mounted() {
    this.getcourseId();
  },
  methods: {
    test() {
      this.handleToggleRowSelection();
    },
    // 改变新增弹框的显示
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
      // this.getAllKnowledge();
      this.getKnowledge(this.courseId);
      this.experiment = {};
      // this.dataForm = Object.assign({});
    },
    handleSizeChange(pagesizes) {
      // 每页的大小
      console.log(pagesizes);
      this.pageSize = pagesizes;
      this.handleCurrentChange(this.currentPage);
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
    //  获取课程id
    getcourseId() {
      this.$api.course.cinstance
        .findCourseInstance({ id: this.$store.state.course.courseCinstanceId })
        .then((res) => {
          this.courseId = res.data.courseId;
        });
    },
    handleTempProblemId(array) {
      // console.log(array);
      let problemIdList = [];
      for (let i = 0; i < array.length; i++) {
        // console.log(array[i]);
        if (array[i] !== undefined) {
          for (let j = 0; j < array[i].length; j++) {
            problemIdList.push({
              value: array[i][j].problemId,
              real: array[i][j],
            });
          }
        }
      }
      console.log(problemIdList);
      this.rowProblemId = problemIdList;
      return problemIdList;
    },
    handleProblemIdList(problemIdList) {
      let problemId = [];
      for (let index = 0; index < problemIdList.length; index++) {
        problemId.push(problemIdList[index].value);
      }
      return problemId;
    },
    // 表格多选
    handleSelectionAll(val) {
      console.log(val);
      if (val === undefined) {
        return;
      }
      this.listExperimentProblem = val;
      this.experiment.number = this.listExperimentProblem.length;
      let experimentnode = [];
      for (let index = 0; index < val.length; index++) {
        experimentnode.push(val[index]);
      }
      this.TempProblemId[this.currentPage] = experimentnode;
      console.log(this.TempProblemId);
      this.experiment.problemId = this.handleProblemIdList(
        this.handleTempProblemId(this.TempProblemId)
      );
      console.log(this.experiment.problemId);
    },
    handleSelectionChange(val) {
      console.log(val);
      if (val === undefined) {
        return;
      }
      this.listExperimentProblem = val;
      this.experiment.number = this.listExperimentProblem.length;
      let experimentnode = [];
      // let nodeId = null;
      // console.log(this.experiment.problemId);
      //   nodeId = this.listExperimentProblem[val.length-1].problemId;
      // //   console.log(nodeId);
      // console.log(this.experiment.problemId.indexOf(nodeId))
      //   if(this.experiment.problemId.indexOf(nodeId) !== -1){
      //     this.experiment.problemId.splice(this.experiment.problemId.indexOf(nodeId)+1, 1)
      //   }else{
      //     this.experiment.problemId.push(nodeId);
      //   }
      // // }
      for (let index = 0; index < val.length; index++) {
        experimentnode.push(val[index]);
      }
      this.TempProblemId[this.currentPage] = experimentnode;
      console.log(this.TempProblemId);
      this.experiment.problemId = this.handleProblemIdList(
        this.handleTempProblemId(this.TempProblemId)
      );
      console.log(this.experiment.problemId);
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
    stateFormat(row, column, cellValue) {
      if (!cellValue) return "";
      if (cellValue.length > 38) {
        return cellValue.slice(0, 38) + "...";
      }
      return cellValue;
    },

    // 提交
    SubProblemProg() {
      this.experiment.insId = this.$store.state.course.courseCinstanceId;
      this.$confirm("确定添加当前实验？")
        .then((_) => {
          this.$api.experiment.experiment
            .addExperiment(this.experiment)
            .then((res) => {
              console.log(res);
                    this.dialogVisible = false;
                    this.updateList(); 
                    this.$message.success("插入成功！");
                    })
        })
    },
    updateList() {
      console.log("1");
      this.$emit("getAllExperiment");
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
    // 选择知识点并返回id
    handleSelectByKnowledge(item) {
      if (
        item === undefined ||
        item === null ||
        item === "" ||
        item.length === 0
      ) {
        this.knowledgeId = "";
        console.log(this.knowledgeId);
      }
      console.log(item[item.length - 1]);
      this.knowledgeId = item[item.length - 1];
      console.log(this.knowledgeId);
    },
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
  },
};
</script>
<style scoped>
</style>