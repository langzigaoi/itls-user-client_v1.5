<template>
  <div>
    <div class="title">
      <span>单元考试</span>
    </div>
    <el-divider></el-divider>
    <div class="btn">
      <router-link class="addUnitExam" to="/course/AddUnitExam"><el-button type="primary">添加考试</el-button></router-link>
    </div>
    
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="exam"
        border
        :row-class-name="tableRowClassName"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        style="width: 100%"
      >
        <el-table-column prop="examName" label="考试" width="120">
        </el-table-column>
        <el-table-column prop="startRange" label="开始章节" width="120">
        </el-table-column>
        <el-table-column prop="endRange" label="结束章节" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="200">
          <template slot-scope="scope">
            <span>{{ parseDateFull(scope.row.startTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="截止时间" width="220">
          <template slot-scope="scope">
            <span>{{ parseDateFull(scope.row.endTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="isPub" label="状态" width="120">
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button  type="primary" size="small" @click="updatePub(scope.row.id)">发布</el-button>
            <el-button type="success" size="small" @click="updataUnitExam(scope.row.id)">修改</el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.$index, scope.row)"
              >取消发布</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exam: [], //考试信息
    };
  },
  mounted() {
    //获取考试信息
    this.getExams();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    //获取考试信息
    getExams() {
      this.$api.exam.midsemester
        .getExamInfo({
          insId: this.$store.state.course.courseCinstanceId,
          examType: 0,
        })
        .then((res) => {
          this.exam = res.data;
          for(let i = 0; i < this.exam.length; i++){
            if(this.exam[i].isPub == 0){
            this.exam[i].isPub = "未发布"
            }else {
              this.exam[i].isPub = "已发布"
            }
          }
          // console.log(res.data);
          console.log(this.exam);
        })
        .catch((err) => {
          console.log("数据获取失败");
        });
    },
    //修改单元考试
    updataUnitExam(index) {
      this.$router.push({
        path: "/course/updateUnitExam",
        query: { id: index },
      })
    },
    //修改考试的发布
    updatePub(index) {
      this.$api.exam.midsemester
        .updatePub({id: index})
        .then((res) => {
          console.log("修改成功");
        })
        .catch((err) => {
          console.log("修改失败");
        })
    },
    tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 0) {
          return 'warning-row';
        } 
        return '';
      },
    //编辑时间格式
    parseDateFull(time) {
      var x = new Date(time);
      var z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds(),
      };
      if (z.M < 10) {
        z.M = "0" + z.M;
      }
      if (z.d < 10) {
        z.d = "0" + z.d;
      }
      if (z.h < 10) {
        z.h = "0" + z.h;
      }
      if (z.m < 10) {
        z.m = "0" + z.m;
      }
      return z.y + "-" + z.M + "-" + z.d + " " + z.h + ":" + z.m;
    },
  },
};
</script>

<style>
#all{
  margin-left: 30px;
  width: 100%;
  height: 100%;
  text-align: left;
  /* background-color: red; */
}
.title{
  text-align: center;
  font-size: 30px;
}
.table{
  margin-left: 8%;
  width: 80%;
  height: 40%;
}

.el-table .warning-row {
    background: oldlace;
  }
</style>