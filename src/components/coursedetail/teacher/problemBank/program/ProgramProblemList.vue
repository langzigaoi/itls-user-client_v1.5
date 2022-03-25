<template>
  <div>
    <div class="select-bar">
      <select-tab-bar>
        <el-input v-model="keywords" placeholder="试题关键字" class="condition1" slot="select-condition1"></el-input>
        <el-select
          class="condition2" 
          slot="select-condition2"
          v-model="category"
          placeholder="试题分类"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" slot="select-btn">查询</el-button>
      </select-tab-bar>
    </div>
    <div class="program-list">
      <el-table :data="tableData" height="620" style="width: 100%" v-loading="loading">
        <el-table-column prop="problemId" label="题号" width="120"></el-table-column>
        <el-table-column label="题目名称" width="450">
          <template slot-scope="scope">        
            <a @click="handleSelect(scope.$index, scope.row)">{{scope.row.problemName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="标签" width="500">
          <template slot-scope="scope">
              <el-tag size="medium" v-for="item in scope.row.problemTags" :key="item.id">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalSubmission" label="提交数" width="120"></el-table-column>
        <el-table-column label="AC%" width="120">
          <template slot-scope="scope">
              <p v-if="scope.row.totalSubmission == 0">0%</p>
              <p size="medium" v-else>{{Math.floor(scope.row.acceptedSubmission * 100 / scope.row.totalSubmission)}}%</p>
          </template>
        </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import SelectTabBar from './SelectTabBar.vue';
export default {
  name: 'ProgramProblemList',
  components: { SelectTabBar },
  data() {
    return {
      loading: true,
      tableData: [],
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
      ikeywords: '',
      category: ''
    }
  },
  mounted() {
    this.getAllProgram()
  },
  methods: {
    // 获取具体试题的试题详情
    handleSelect(index, row) {
      this.$router.push({
        path: '/course/programDetails',
        query: {
          id: row.problemId
        }
      })
      console.log(index, row);
    },
    // 获取所有编程题
    getAllProgram() {
      this.$api.problem.program.getAllProgram().then(res => {
        this.tableData = res.data
        this.loading = false;
        console.log(this.tableData)
      }).catch(err =>{
        console.log("获取全部编程题失败")
      })
    }
  },
};
</script>

<style>
.select-bar {
  text-align: right;
  margin-right: 50px;
  margin-bottom: 20px;
}
  .condition1 {
    width: 220px;
    height: 30px;
    margin-right: 30px;
  }
  .condition2 {
    height: 30px;
    margin-right: 30px;
  }
</style>