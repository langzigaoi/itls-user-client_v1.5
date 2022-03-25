<template>
  <div>
    <div class="ProgTabbar">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">试题</span>
          <program-problem-list></program-problem-list>
        </el-tab-pane>
        <el-tab-pane label="提交记录">
          <program-submit-list></program-submit-list>
        </el-tab-pane>
        <el-tab-pane label="试题管理">创建试题</el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
import ProgramProblemList from "./ProgramProblemList"
import ProgramSubmitList from "./ProgramSubmitList"
export default {
  name: 'ProgramProblemView',
  components: { 
    ProgramProblemList,
    ProgramSubmitList
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style>
  .ProgTabbar {
    margin-top: 6px;
  }
</style>