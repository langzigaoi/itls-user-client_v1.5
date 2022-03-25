

<template>
  <div>
    <el-dialog
      top="5vh"
      align="left"
      title="新增题目"
      :visible.sync="dialogVisible"
      width="80%"
      style=""
    >
      <!--新增编辑界面-->
      <el-form
        v-if="dialogVisible"
        :model="dataForm"
        :rules="dataFormRules"
        ref="dataForm"
        size="meduim"
        label-position="center"
        label-width="100px"
        style="width: 60%; text-align: center; padding-left: 300px"
      >

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

        <!-- <div slot="footer" class="dialog-footer"> -->
        <el-button size="small" @click.native="dialogVisible = false"
          >关闭</el-button
        >
        <el-button size="small" type="primary" @click.native="submitForm"
          >提交</el-button
        >
        <!-- </div> -->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["courseId"],
  data() {
    return {
      dialogVisible: false, //控制新增题目弹框的实现
      dataForm: this.courseEntity(),
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
      knowledgeId:"",
    };
  },
  mounted() {
  },

  computed: {
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
        this.knowledgeId = "";
        console.log(this.knowledgeId);
      }
      console.log(item[item.length-1]);
      this.knowledgeId = item[item.length-1];
    },
    //改变弹框的显示
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
      this.getKnowledge(this.courseId);
      this.dataForm = Object.assign({});
      this.knowledgeState="";
    },
    
        // 提交
    submitForm() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.dataForm);
            params.courseId = this.courseId;
            params.knowledgeId = this.knowledgeId;
            // console.log(params);
            this.$api.problem.prog.add(params).then((res) => {
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                this.dialogVisible = false;
                // this.$refs.getAllAudit()
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
            });
          });
        }
      });
    },
    
  } 
};
</script>
<style scope>

</style>