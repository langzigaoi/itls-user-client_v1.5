<template>
  <div>
    <el-page-header
      @back="goBack"
      content="题目详情页"
      class="header"
    ></el-page-header>
    <div>
      <div class="title">题目：{{ problemDetails.problemName }}</div>
      <div>
        <span>时间限制：{{ problemDetails.timeLimit }}</span>
        <span>内存限制：{{ problemDetails.memoryLimit }}</span>
        <span>提交：{{ problemDetails.totalSubmission }}</span>
        <span>解决：{{ problemDetails.acceptedSubmission }}</span>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="bigbox">
          <div class="box">
            <h4>题目描述</h4>
            <div class="text">{{ problemDetails.description }}</div>
            <div class="childrenbox">
              <h4>输入</h4>
              <div class="text">{{ problemDetails.inputFormat }}</div>
            </div>
            <div class="childrenbox">
              <h4>输出</h4>
              <div class="text">{{ problemDetails.outputFormat }}</div>
            </div>
            <div class="childrenbox">
              <h4>输入样例</h4>
              <div class="text">{{ problemDetails.sampleInput }}</div>
            </div>
            <div class="childrenbox">
              <h4>输出样例</h4>
              <div class="text">{{ problemDetails.sampleOutput }}</div>
            </div>
            <div>提示</div>
            <div class="text">{{ problemDetails.hint }}</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div class="submit-code">
          <div class="language-select">
            <el-select
              v-model="value"
              placeholder="请选择语言"
              style="background: #6e83e0"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-button type="danger" class="submit-btn" @click="submit">保存并提交</el-button>
          </div>
          <el-input
            type="textarea"
            :rows="20"
            placeholder="请填写代码"
            v-model="textarea"
          >
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ProgramDetails",
  data() {
    return {
      problemDetails: {},
      options: [
        {
          value: "text/x-csrc",
          label: "C",
        },
        {
          value: "text/x-c++src",
          label: "C++",
        },
        {
          value: "text/x-java",
          label: "Java",
        },
        {
          value: "text/x-python",
          label: "Python",
        },
      ],
      value: "",
      textarea: "",
    };
  },
  mounted() {
    this.getProblemById();
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push("/course/problemProgram");
    },
    // 根据id获取试题详情数据
    getProblemById() {
      this.$api.problem.program
        .getProblemById({ problemId: this.$route.query.id })
        .then((res) => {
          this.problemDetails = res.data;
          console.log(this.problemDetails);
        })
        .catch((err) => {
          console.log("获取失败");
        });
    },
    // 点击提交按钮提交用户代码
    submit() {
      let problemId= this.$route.query.id;
      if(!problemId ) return ;
      let data = {
        problemId: Number.parseInt(problemId),
        languageSlug: this.value,
        code: this.textarea,
      };
      this.$api.problem.program.submitCode(data)
      .then((res) => {
        this.refresh();
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
      
    },
    refresh() {
      this.textarea = null;
    },
  },
};
</script>

<style>
.header {
  margin-top: 15px;
}
.title {
  font-size: 24px;
}
span {
  margin-left: 20px;
}
.box {
  text-align: left;
  border: 1px solid #e8edf2;
  background: #eaf0f5;
  border-radius: 4px;
  margin-top: 30px;
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
}
.childrenbox {
  margin-bottom: 20px;
  position: relative;
}
.text {
  text-align: left;
  font-size: 14px;
  position: relative;
  border-left: 2px solid #6e83e0;
  padding: 10px 0 10px 10px;
  margin: 0.8em 0;
  background: #fdfdfd;
  word-break: break-word;
}
.submit-code {
  margin-top: 30px;
}
.submit-btn {
  margin-left: 100px;
}
.language-select {
  margin-bottom: 6px;
}
</style>