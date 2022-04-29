<template>



  <div class="outside" style="padding:50px " >

    <com-table 
      :data="pageResults"
      :columns="columns"
      :showOperation="true"
      @findPage="findPage"
      @handleRemove="handleRemove"
      :showFlag="showFlag"
    ></com-table>
    

  </div>
</template>
<script>
import ComTable from '../../../common/ComTable.vue';

export default {
    components: {
        ComTable
    },
    data() {
    return {
      record: {},
      pageRequest: { pageNum: 1, pageSize: 10 },
      pageResults: {},

      columns: [
        { prop: "stuNo", label: "学号", minWidth: 150, align: "center" },
        { prop: "name", label: "名字", minWidth: 150, align: "center" },
      ],
      selections: [],
      multipleSelection: [],

      // 设置需显示和禁用的标记
      showFlag:{
        batchRemove: true,
        removeStudent: true,  
      },
      // disableFlag:{
      //   // view: true,
      // },
    };
  },
  methods: {
    // 分页查询
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.pageRequest.params = [
        { name: "cinstanceId", value: this.$store.state.course.courseCinstanceId },
      ];
      // console.log(this.pageRequest);
      this.$api.course.choosing
        .findPage(this.pageRequest)
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
          // console.log(this.pageResults);
        })
        .then(data != null ? data.callback : "");
    },

    // 删除
    handleRemove(data) {
      // console.log("diaodaole");
      console.log(data.params);
      this.$api.course.choosing.remove(data.params)
      .then(data != null ? data.callback : "");
    },




  },
  filters: {
    isAssistantFilter(isAssistant) {
      if (isAssistant == 1) return "助教";
      else if (isAssistant == 0) return "学生";
      else if (isAssistant == "主讲") {
        return "主讲";
      } else if (isAssistant == "开课教师") {
        return "开课教师";
      }
    },
  },
  mounted() {
    // this.findInfoByCid();
    // this.findPage();
  },
};
</script>
<style scoped>
.outside{
  text-align: center;
}

</style>