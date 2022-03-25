<template lang="">
  <div align="center">
    <el-dialog
      top="5vh"
      align="left"
      title="完成情况"
      :visible.sync="dialogVisible"
      width="80%"
      style="">

    <div style="width: 800px; text-align: left;">
      <el-collapse accordion>
        <el-collapse-item :key="index" :name="index" v-for="(item,index) in experimentList">
          <template slot="title">
            <span style="font-weight: bolder;padding-inline-start: 2em; font-size: 16px; width: 80px">{{index+1}} </span>
            <span class="title">{{item.name}}</span>
            <span class="description" style="
              width:600px;
              overflow:hidden;
              color: grey;
              text-overflow:ellipsis;
              white-space:nowrap;
              word-break:keep-all;
              display:block;">
              {{item.object}}</span>
          </template>
          <completion-table :experimentId="item.id"></completion-table>
        </el-collapse-item>
      </el-collapse>
    </div>

  </el-dialog>
  </div>
</template>
<script>
  import CompletionTable from './CompletionTable.vue'
  export default {
    components: {
      CompletionTable
    },
    data() {
      return {
        dialogVisible: false,
        experimentList: [],
      }
    },
    methods: {
      // 改变弹框的显示
    changeDialogVisible() {
      this.dialogVisible = !this.dialogVisible;
      this.getExperiment();
      // this.dataForm = Object.assign({});
      },
      goBack() {
        this.$router.push({
          path: "/course/searchExperiment",
        })
      },
      getExperiment() {
        this.$api.experiment.experiment.searchAll({ insId: this.$store.state.course.courseCinstanceId }).then((res) => {
          this.experimentList = res.data
        })
      }
    },
    mounted() { 
    },
  }
</script>
<style lang="scss" scoped>
  .title {
    font-weight: 1000;
    /* font-family: '宋体'; */
    font-size: 16px;
    width: 200px;
    padding-inline-start: 2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
    display: block;
  }

  .description {
    font-weight: 300;
    font-family: '宋体';
    font-size: 14px;
    /* text-indent: 2em; */
    padding-inline-start: 2em;
  }
</style>