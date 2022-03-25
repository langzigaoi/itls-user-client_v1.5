<template>
    <div>
          <el-select v-model="isPubValue" placeholder="请选择记录审核状态" @change=updategetuserlog()>
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
       <el-table :data="LogList" border style="width: 100%;min-height:60vh"> 
                <!-- <el-table-column  prop="userId" label="userId"  width="150"> </el-table-column>  -->
                <!-- <el-table-column  prop="id" label="id"  width="150"> </el-table-column>  -->
                <!-- <el-table-column fixed prop="id" label="id"  width="150"> </el-table-column> 
                <el-table-column fixed prop="userId" label="userId"  width="150"> </el-table-column> 
                <el-table-column fixed prop="name" label="name"  width="150"> </el-table-column>  -->
                <!-- <el-table-column fixed prop="courseId" label="courseId"  width="150"> </el-table-column>  -->
                <!-- <el-table-column fixed prop="userName" label="userName"  width="150"> </el-table-column>  -->
                <el-table-column  prop="" label="课程名"  width="150"> </el-table-column> 
                <el-table-column  prop="name" label="名称"  width="150"> </el-table-column> 
                <el-table-column  prop="difficulty" label="难度"  width="150"> </el-table-column> 
                <el-table-column  prop="teachingGoalName" label="教学目标"  width="150"> </el-table-column> 
                <!-- <el-table-column fixed prop="" label=""  width="150"> </el-table-column> 
                <el-table-column fixed prop="" label=""  width="150"> </el-table-column> -->
                <el-table-column label="时间" sortable  width="180">
                    <template slot-scope="scope">
                        {{dateTimeFormate(new Date(scope.row.createTime))}}
                    </template>
                </el-table-column>  
                <el-table-column  v-if="this.LogList.action==0" label="操作"  width="100">
                    <template slot-scope="scope">
                        <el-button @click="cancle(scope.row.id)" type="text" size="small">撤销修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        <!-- 分页器 -->
        <div>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 2, 1, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagesNum">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            LogList:[],  //待审核的知识点
            currentPage:1 , //当前页
            pageSize:10, //每页条数
            pagesNum:0, //总页数  
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
            isPubValue: 0
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
        //本用户最近操作记录列表/Public/userList?courseId=1&pageNum=1&pageSize=1&userId=2001
        getUserLog(){
            this.LogList  = [];
            this.$api.knowledge.cpublic.userList({courseId:1, pageNum:this.currentPage,pageSize:this.pageSize, isPub:this.isPubValue}).then((res) => {
              console.log("用户操作记录")
              console.log(res)
              this.LogList = res.data.list;
              this.pagesNum = res.data.pages;
            })
        },
        //用户撤销修改
        cancle(id){
            this.$api.knowledge.cpublic.deletePublic({id:id}).then((res) => {
              this.Msg("撤销成功")
              this.getUserLog();
            })
        },
        //分页的回调函数
        handleSizeChange(pageSize){
            // console.log("当前页",this.currentPage);
            // console.log("每页条数",pageSize);
            this.pageSize = pageSize;
            this.getUserLog();
        },
        handleCurrentChange(currentPage){
            // console.log("当前页",currentPage);
            // console.log("每页条数",this.pageSize);
            this.currentPage = currentPage;
            this.getUserLog();
        }
    }
}
</script>