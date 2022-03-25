<template>
  <div>
    <div class="select-bar">
      <select-tab-bar>
        <el-input v-model="input" placeholder="试题号" class="condition1" slot="select-condition1"></el-input>
        <el-button type="primary" slot="select-btn">查询</el-button>
      </select-tab-bar>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'ProgramSubmitList',
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

<style lang="scss" scoped>

</style>