<template>
  <div >
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
        style="width: 40%; text-align: center; padding-left:300px ">

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

        <el-form-item label="题干" prop="title" required>
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
        knowledgeId: [
          { required: true, message: "请选择知识点", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入题干", trigger: "blur" }],
        options: [{ required: true, message: "请输入选项", trigger: "blur" }],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }],
        analysis: [{ required: true, message: "请输入解析", trigger: "blur" }],
        difficulty: [
          { required: true, message: "请输入难易度", trigger: "blur" },
        ],
        discrimination: [
          { required: true, message: "请输入区分度", trigger: "blur" },
        ],
        markup: [{required: true, message: "请输入题目来源", trigger: "blur"}]
      },
      fileList: [{ name: "choiceBank.xlsx", url: "" }],

      allKnowledge: [],
      knowledgeState: "",
      treeKnowledgeId: null,
      knowledgeId:"",
      // course:"",



    };
    
  },
  mounted() {
    this.getKnowledge(this.courseId);
  },

  methods: {
    
    // 改变新增弹框的显示
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
      console.log(this.courseId);
      this.getKnowledge(this.courseId);
      this.dataForm = Object.assign({});
      this.knowledgeState="";
    },
    // 提交
    submitForm() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          console.log(this.dataForm)
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let params = Object.assign({}, this.dataForm);
            params.courseId = this.courseId;
            params.knowledgeId = this.knowledgeId;
            // console.log(params);
            this.$api.problem.choice.add(params).then((res) => {
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
      if (item === undefined || item === null || item === "" || item.length === 0) {
        this.knowledgeId = "";
        console.log(this.knowledgeId);
      }
      console.log(item[item.length-1]);
      this.knowledgeId = item[item.length-1];
    },


    // 定义上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
  watch: {
    addAProblemDialogVisible(val) {
      //console.log(val);
      if (val) this.findallknowledge(); //查询所有知识点
    },
  },
};
</script>

<style scope>
</style>