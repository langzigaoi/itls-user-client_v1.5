<template>
  <div class="tcommonBox">
    <header>
      <h1>课程目标</h1>
    </header>
    <section style="width: 90%; margin: 2% auto">
     <el-card>
        <el-table
          :data="allinfo"
          style="width: 100%"
          :row-style="{ height: '70px' }"
        >
          <el-table-column label="课程目标 " width="1000">
            <template slot-scope="scope">
              <i class="el-icon-star-on"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allinfo: [],
    }
  },
   mounted(){
        this.findCinstanceTargets();
  },
  methods: {
    // 获取课程实例的课程目标
    findCinstanceTargets() {
      this.$api.course.target.findAllTargets({cinstance_id: this.$store.state.course.courseCinstanceId}).then( res => {
        this.allinfo = res.data
      })
    },
  }
}
</script>

<style scoped>
.tcommonBox{
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding:15px;
  border-radius: 5px;
  margin-bottom: 40px;
  font-size: 15px;
  text-align: left;
  margin-top: 5px;
}
.tcommonBox h1 {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
}
</style>