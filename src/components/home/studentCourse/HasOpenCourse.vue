<template>
  <div>
    <el-card class="box-card" v-loading="loading">
        <div slot="header" class="clearfix">
          <span>已开设课程</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">删除课程</el-button> -->
        </div>
        <div class="griddiv">
          <div class="grid" v-for="course in coursescistance" :key="course.id" @click="toOtherPath('/studycourse', course.id)">
            <!-- <p class="delete">删除</p> -->
            <!-- <p class="status"> {{coursescistanceStatus(course.isPub)}}</p> -->
            <img :src="course.image" alt="" />
            <div class="gridtext">
              <p style="color:#000">{{course.courseName}}</p>
              <!-- <router-link :to="{name:'studycourse',query:{'id':course.id}}" append>进入课程</router-link> -->
            </div>
          </div>
        </div>
        
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coursescistance: [],
      loading: true,
    }
  },
  computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
  },
  mounted() {
    this.getcoursescinstance();
  },
  methods: {
    toOtherPath(path, id) {
      this.$router.push({
        path: path,
        query: {
          id: id
        }
      })
    },
    getcoursescinstance() {
      this.loading = true;
      this.$api.course.cinstance
        .findAllCourseInstance({ teacherNo: this.userinfo.id })
        .then((res) => {
          this.coursescistance = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.coursescistance = [];
        });
    }
  }
  
}
</script>

<style scoped>
.box-card {
  margin-top: 10px;
  text-align: left;
  background-color: #f7f7f7;
}
.parent {
  position: relative;
  text-align: left;
  padding-top: 20px;
}
.kid {
  position: absolute;
  top: 20px;
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 5vh;
}
.griddiv {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-template-rows: repeat(auto-fill, 200px);
  grid-row-gap: 30px; /* 行间距 */
  grid-column-gap: 50px; /* 列间距 */
}
.grid {
  position: relative;
  min-height: 200px;
  min-width: 250px;
  border:15px solid #f3f4f6;
  /* box-shadow: 5px 5px 16px 0 rgba(0,0,0,0.2); */
  overflow: hidden;
  transition: all ease-in 1s;
}
.grid:hover {
  /* box-shadow: 15px 10px 16px 0 rgba(0,0,0,0.3); */
  box-shadow: 5px 4px 16px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
}
.grid .delete {
  font-weight: 700;
  cursor: pointer;
  top: 4px;
  left: 4px;
  position: absolute;
  display: none;
}
.grid .status {
  font-weight: 700;
  /* cursor: pointer; */
  top: 4px;
  right: 4px;
  position: absolute;
}
.grid img {
  z-index: 1;
  width: 100%;
  height: 100%;
}
.gridtext {
  position: absolute;
  /* z-index:2; */
  width: 100%;
  bottom: 0;
  /* padding: 5px; */
  background-color: rgba(255, 255, 255, 0.473);
  padding: 5px 0;
  font-weight: 500;
  color: rgb(255, 255, 255);
  text-align: center;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.gridtext a {
  color: #000;
  font-size: 0.9em;
  font-weight: 700;
  font-family: "宋体", "Times New Roman", Times, serif;
}
.grid:hover .delete {
  display: block;
}
</style>