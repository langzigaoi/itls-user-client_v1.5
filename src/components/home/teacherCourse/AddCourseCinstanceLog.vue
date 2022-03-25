<template>
    <!-- 添加课程实例的记录 -->
    <div>
        
     <el-dialog title="课程实例操作记录" width="80%" :visible.sync="cinstanceLogVisible" :before-close="handleClosecinstanceLogdia" top="8vh" >
        <el-select v-model="isPubValue" placeholder="请选择课程实例审核状态" @change=updategetuserlog()>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
       <el-table :data="LogList" border style="width: 100%;min-height:60vh"> 
                <el-table-column  prop="" label="课程名"  width="150"> </el-table-column> 
                <el-table-column  prop="semester" label="学期"  width="150"> </el-table-column> 
                <el-table-column  prop="intro" label="简介"  width="150"> </el-table-column> 
                <el-table-column  prop="teachingTypeName" label="教学目标"  width="150"> </el-table-column> 
                <el-table-column  prop="hoursOfWeek" label="周学时"  width="150"> </el-table-column> 
                <el-table-column  prop="grade" label="学分"  width="150"> </el-table-column> 
                 <el-table-column label="起止时间" sortable  width="180">
                    <template slot-scope="scope">
                        {{dateFormate(new Date(scope.row.startYear))}}~{{dateFormate(new Date(scope.row.endYear))}}
                    </template>
                </el-table-column> 
                <el-table-column label="时间" sortable  width="180">
                    <template slot-scope="scope">
                        {{dateTimeFormate(new Date(scope.row.createTime))}}
                    </template>
                </el-table-column>  

                <el-table-column  v-if="this.isPubValue==0" label="操作"  width="100">
                    <template slot-scope="scope">
                        <el-button @click="cancle(scope.row.id)" type="text" size="small">撤销申请</el-button>
                    </template>
                </el-table-column>
            </el-table>
        <!-- 分页器 -->
        <!-- <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 2, 1, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagesNum">
            </el-pagination>
        </div> -->
     </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            LogList:[],  //待审核的知识点
            // currentPage:1 , //当前页
            // pageSize:10, //每页条数
            // pagesNum:0, //总页数  
            options: [{
                value: -1,
                label: '未通过'
                }, {
                value: 0,
                label: '待审核'
                }, {
                value: 1,
                label: '已通过'
                }],
            isPubValue: 0,
            cinstanceLogVisible:false,
        }
    },
    mounted(){
        this.getUserLog();
    },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
    methods:{
        updategetuserlog(newisPubValue){
            console.log("更新用户记录")
            // console.log("option的值"+newisPubValue,this.isPubValue);
            // this.isPubValue = newisPubValue;
            this.getUserLog();
        },
        //本用户课程实例操作记录
        getUserLog(){
            this.LogList  = [];
            this.$api.course.cinstance.findAllCourseInstance({isPub: this.isPub, teacherNo:this.userinfo.id}).then((res) => {
              console.log("用户课程实例操作记录",res)
              this.LogList = res.data;
            })
        },
        //控制弹框显示
        handleClosecinstanceLogdia(){
            this.cinstanceLogVisible = !this.cinstanceLogVisible;
        },
        //用户撤销申请添加实例
        cancle(id){
          this.$api.course.cinstance.delete({id:id, teacherNo:this.userinfo.id}).then((res) => {
            this.Msg(res.data.msg)
            this.getUserLog();
          })
        },
        // //分页的回调函数
        // handleSizeChange(pageSize){
        //     // console.log("当前页",this.currentPage);
        //     // console.log("每页条数",pageSize);
        //     this.pageSize = pageSize;
        //     this.getUserLog();
        // },
        // handleCurrentChange(currentPage){
        //     // console.log("当前页",currentPage);
        //     // console.log("每页条数",this.pageSize);
        //     this.currentPage = currentPage;
        //     this.getUserLog();
        // }
    }
}
</script>