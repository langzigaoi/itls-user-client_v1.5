<template>
  <div >
    <el-dialog
      top="5vh"
      align="left"
      title="新增作业"
      :visible.sync="dialogVisible"
      width="80%"
      style=""
      destroy-on-close
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

        <!-- <el-form-item label="知识点">
          <el-cascader
            style="width: 100%"
            v-model="knowledgeState"
            placeholder="请选择知识点"
            :options="allKnowledge"
            :props="{ checkStrictly: true }"
            @change="handleSelectByKnowledge"
            clearable
          ></el-cascader>
        </el-form-item> -->

        <el-form-item label="题干" prop="title" required>
          <el-input
            type="textarea"
            v-model="dataForm.title"
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
      dataForm: {
        title: '',
        answer: '',
        analysis: '',
        markup: '',
        difficulty: null,
        discrimination: null,
        knowledgeId: null
      },
      cinstanceSectionsId: null,
      dataFormRules: {
        title: [{ required: true, message: "请输入题干", trigger: "blur" }],
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
    };
    
  },
  methods: {
    // 改变新增弹框的显示
    changeDialogVisible(id) {
      this.dialogVisible = !this.dialogVisible;
      this.cinstanceSectionsId = id;
    },
    submitForm() {
      this.dataForm.knowledgeId = this.cinstanceSectionsId
      this.$api.course.shortAnserQues.addShortAnserQues(this.dataForm).then(res => {
        console.log(res);
        this.$message.success(res.msg)
        this.$emit('addSAQSuccess')
        this.dialogVisible = false
      })
    }
    
  }
};
</script>

<style scope>
</style>