

<template>
  <div>
    <!-- 用户操作记录 -->
    <el-dialog
      top="5vh"
      align="center"
      title="操作记录"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <div align="left">
        <el-select
          v-if="true"
          v-model="problemProgramCondition.status"
          placeholder="请选择记录审核状态"
          @change="getAllAudit()"
        >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div>
        <el-table
          :data="problemProgramLogList"
          stripe
          style="width: 100%; min-height: 60vh"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ padding: '5px' }"
          v-loading="loading"
        >
          <!-- <el-table-column prop="id" label="id" width="60"> </el-table-column> -->
          <!-- <el-table-column prop="courseId" label="课程id" width="80">
          </el-table-column> -->
          <el-table-column
            type="index"
            width="100"
            label="序号"
            align="center"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column prop="knowledgeName" label="知识点" width="150">
          </el-table-column>
          <el-table-column
            prop="difficulty"
            label="难易度"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="discrimination"
            label="区分度"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column prop="markup" label="题目来源" width="100">
          </el-table-column>
          <el-table-column prop="problemName" label="题目名" width="200">
          </el-table-column>
          <el-table-column prop="problemTimeLimit" label="时间限制" width="100" align="center">
          </el-table-column>
          <el-table-column prop="problemMemoryLimit" label="内存限制" width="100" align="center">
          </el-table-column>
          <el-table-column prop="problemDescription" label="题目描述" width="200">
          </el-table-column>
          <el-table-column prop="problemInputFormat" label="输入格式" width="200">
          </el-table-column>
          <el-table-column prop="problemOutputFormat" label="输出格式" width="200">
          </el-table-column>
          <el-table-column prop="problemSampleInput" label="样例输入" width="200">
          </el-table-column>
          <el-table-column prop="problemSampleOutput" label="样例输出" width="200">
          </el-table-column>
          <el-table-column prop="problemHint" label="提示" width="200">
          </el-table-column>


          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleEdit(scope.row)"
                type="primary"
                size="small"
                v-show="problemProgramCondition.status == '0'"
                >编辑</el-button
              >
              <el-button
                @click="handleDelete(scope.row)"
                type="danger"
                size="small"
                v-show="problemProgramCondition.status == '0'"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <el-pagination
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 10, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="problemProgramLogList.length"
      >
      </el-pagination>
    </el-dialog>

    <!-- 编辑表单 -->
    <el-dialog title="编辑题目" :visible.sync="editDialogVisible" style="">
      <el-form
        :model="dataForm"
        :rules="dataFormRules"
        ref="dataForm"
        size="medium"
        label-width="100px"
      >
        <!-- <div 
        style="
          width: 40%;
          text-align: center;
          > -->
        <el-form-item label="知识点">
          <el-cascader
            style="width: 100%"
            v-model="knowledgeState"
            placeholder="请选择知识点"
            :options="allKnowledge"
            :props="{ checkStrictly: true }"
            @change="handleSelectByKnowledge"
            clearable
          ></el-cascader>
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

        <el-form-item label="难易度" prop="difficulty" align="left">
          <el-input-number
            v-model="dataForm.difficulty"
            size="small"
            :precision="1"
            :min="0"
            :max="1"
            :step="0.1"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="区分度" prop="discrimination" align="left">
          <el-input-number
            v-model="dataForm.discrimination"
            size="small"
            :precision="1"
            :min="0"
            :max="1"
            :step="0.1"
            controls-position="right"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="题目来源" prop="markup">
          <el-input
            type="textarea"
            v-model="dataForm.markup"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <div style="text-align: right">
          <el-button size="small" @click.native="editDialogVisible = false"
            >关闭</el-button
          >
          <el-button size="small" type="primary" @click.native="submitForm"
            >提交</el-button
          >
        </div>
        <!-- </div>    -->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      problemProgramLogList: [], //待审核的题目
      loading: true,
      problemProgramCondition: {
        //查询条件
        status: "", //状态 -1未通过 0待审核 1已通过
      },
      options: [
        {
          value: -1,
          label: "未通过",
        },
        {
          value: 0,
          label: "待审核",
        },
        {
          value: 1,
          label: "已通过",
        },
      ],
      currentPage: 1, //分页 当前页
      pageSize: 10, //分页 每页的大小
      dialogVisible: false,
      editDialogVisible: false,
      dataForm: this.courseEntity(),
      // 表单验证规则
      dataFormRules: {
        courseId: [{ required: true, message: "请选择课程", trigger: "blur" }],
        knowledgeId: [{ required: true, message: "请选择知识点", trigger: "blur" },],
        difficulty: [{ required: true, message: "请输入难易度", trigger: "blur" },],
        discrimination: [{ required: true, message: "请输入区分度", trigger: "blur" },],
        markup: [{required: true, message: "请输入题目来源", trigger: "blur"}],
        problemName: [{required: true, message: "请输入题目名", trigger: "blur"}],
        problemTimeLimit: [{required: true, message: "请输入时间限制", trigger: "blur"}],
        problemMemoryLimit: [{required: true, message: "请输入内存限制", trigger: "blur"}],
        problemDescription: [{required: true, message: "请输入题目描述", trigger: "blur"}],
        problemInputFormat: [{required: true, message: "请输入输入格式", trigger: "blur"}],
        problemOutputFormat: [{required: true, message: "请输入输出格式", trigger: "blur"}],
        problemSampleInput: [{required: true, message: "请输入样例输入", trigger: "blur"}],
        problemSampleOutput: [{required: true, message: "请输入样例输出", trigger: "blur"}],
        problemHint: [{required: true, message: "请输入提示", trigger: "blur"}]
        },

      allKnowledge: [],
      knowledgeState: "",
      treeKnowledgeId: null,
      knowledge: "",
    };
  },

  mounted() {
    this.getAllAudit();
  },

  methods: {
      // 知识点级联选择器处理
    getChildren(parentId, arr) {
      // console.log(parentId);
      // console.log(arr);
      // console.log('1');
      let array = [];
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].parentId === parentId) {
          array.push(arr[index]);
        }
      }
      return array;
    },
    beChildren(arr1, arr2) {
      // console.log(arr1);
      // console.log(arr2);
      let k = 0;
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr1[i].length; j++) {
          // console.log(arr2[k]);
          if (arr2[k] !== [] && arr2[k] !== undefined && arr2[k].length !== 0) {
            arr1[i][j].children = arr2[k];
          }
          // console.log(arr1[i][j]);
          // console.log(arr2[k]);
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
      // console.log(deep1);
      // console.log(deep2);
      // console.log(deep3);
      // console.log(deep4);
      // console.log(deep5);
      // console.log(deep6);
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
      // console.log(newDeep5);
      // let finalArry = []
      // for (let index = 0; index < deep2.length; index++) {
      //   finalArry.push()
      // }
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
      if (item === undefined || item === null || item === "" || item.length === 0) {
        this.knowledge = "";
        console.log(this.knowledge);
      }
      console.log(item[item.length-1]);
      this.knowledge = item[item.length-1];
    },
    //表格序号
    indexMethod(index) {
      return index + 1;
    },
    changedialogVisible() {
      this.dialogVisible = !this.dialogVisible;
    },
    //获取所有待审核记录
    getAllAudit() {
      this.problemProgramLogList = [];
      this.loading = true;
      this.$api.problem.prog
        .findPersonList(this.problemProgramCondition)
        .then((res) => {
          this.problemProgramLogList = res.data;
        });
      this.loading = false;
    },
    // 显示编辑页面
    handleEdit(params) {
      this.editDialogVisible = true;
      console.log(params.courseId);
      this.dataForm = Object.assign({}, params);
      this.knowledgeState = "";

    this.getKnowledge(params.courseId)
    },
    // 提交
    submitForm() {
         this.$refs.dataForm.validate((valid) => {
        if (valid) {
            let params = Object.assign({}, this.dataForm);
            params.courseId = this.courseId;
            params.knowledgeId = this.knowledge;
            console.log(params);
            this.$api.problem.prog.update(params).then((res) => {
                this.editDialogVisible = false;
            this.getAllAudit();
            })
        }
      });
    },
    // 删除
    handleDelete(row) {
      //   console.log(row);
      this.delete(row.id);
    },
    delete(ids) {
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning",
      }).then(() => {
        let params = [];
        let idArray = (ids + "").split(",");
        for (var i = 0; i < idArray.length; i++) {
          params.push({ id: idArray[i] });
        }
        this.$api.problem.prog.del(params).then((res) => {
          this.getAllAudit();
        });
      });
    },





    // 分页的回调
    handleSizeChange(pagesizes) {
      //每页的大小
      // console.log(pagesizes);
      this.pageSize = pagesizes;
    },
    handleCurrentChange(currentChange) {
      //当前页
      // console.log(currentChange);
      this.currentPage = currentChange;
    },
    
  },
};
</script>