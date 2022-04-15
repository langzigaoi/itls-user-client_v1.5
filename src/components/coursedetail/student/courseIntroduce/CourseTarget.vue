<template>
  <div>
    <com-table
      :data="pageResults"
      :columns="columns"
      :showOperation="false"
      @findPage="findPage"
    ></com-table>
  </div>
</template>

<script>
import ComTable from "../../../common/ComTable.vue";

export default {
   components: {
    ComTable,
  },
  data() {
    return {
      pageResults: {},
      columns: [
        {
          prop: "name",
          label: "课程目标",
          minWidth: 150,
          align: "center",
        },
      ],
      allinfo: [],
    };
  },
  mounted() {
    this.findCinstanceTargets();
  },
  methods: {
     // 分页查询
    findPage(data) {
      if (data !== null) {
        this.pageRequest = data.pageRequest;
      }
      this.$api.course.target
        .findAllTargets({
          cinstance_id: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          // console.log(res.data);
          this.pageResults = res.data;
        })
        .then(data != null ? data.callback : "");
    },
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.target
        .findAllTargets({
          cinstance_id: this.$store.state.course.courseCinstanceId,
        })
        .then((res) => {
          this.allinfo = res.data;
        });
    },
  },
};
</script>

<style scoped>
.outside {
  text-align: center;
}
</style>