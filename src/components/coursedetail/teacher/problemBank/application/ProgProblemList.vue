<template>
    <div>
        <!-- 选择题列表{{this.courseId}} -->
        <div align="right">
            <el-button @click="getAllList" style=""><i class="el-icon-refresh"></i></el-button>
            <el-input v-model="search" style="width:20%" placeholder="输入题干/知识点搜索"/>
        </div>
        <el-table  :data="problemList.filter(data => !search  || data.knowledge.name.toLowerCase().includes(search.toLowerCase()) ||data.title.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"  border style="overflow: scroll;width: 100%;max-height:70vh;min-height:70vh;" v-loading="loading">
            <el-table-column prop="id" label="id" width="60"> </el-table-column>
            <el-table-column prop="courseId" label="课程id" width="80"> </el-table-column>
            <el-table-column prop="knowledge.name" label="知识点" width="120"> </el-table-column>
            <el-table-column prop="title" label="题干" width="300"> </el-table-column>
            <el-table-column prop="options" label="选项" width="320">
                <template slot-scope="scope">
                    <!-- {{JSON.parse(scope.row.options)[scope.row.answer].option}} -->
                    <p v-for="option in JSON.parse(scope.row.options)" :key="option.id">
                        <span style="font-weight:700">:</span>{{option.option}}
                    </p>
                </template>   
            </el-table-column>
            <el-table-column prop="answer" label="答案" width="120">
                 <template slot-scope="scope">
                    {{JSON.parse(scope.row.options)[scope.row.answer].option}}
                </template>   
            </el-table-column> 
            <el-table-column prop="analysis" label="解析" width="120"> </el-table-column> 
            <el-table-column prop="difficulty" label="难度" width="120"> </el-table-column> 
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="deletePro(scope.row)" type="text" size="small">删除</el-button>
                    <el-button @click="changeAlterAProblemDialogVisible(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
       <el-pagination  
        align="left"
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="problemList.length">
        </el-pagination>
    </div>
</template>
<script>
export default {
    props:['courseId'],
    data() {
        return {
            search:'',
            loading:true,
            problemList:[], //所有查出来的问题
            currentPage:1, //分页 当前页
            pageSize:10, //分页 每页的大小
        }
    },
    mounted(){
        setTimeout(() => {this.getAllList()},1000)
    },
    methods:{
        /////分页的回调
        handleSizeChange(pagesizes){ //每页的大小
            // console.log(pagesizes);
            this.pageSize = pagesizes;
        },
        // 
        handleCurrentChange(currentChange){ //当前页
            // console.log(currentChange);
            this.currentPage = currentChange;
        },
        //删除
        deletePro(row) {
            if(confirm('确定要删除吗')==true){
              console.log("要删除的id",row.id);
              this.$api.problem.prog.del({id:row.id}).then((res) => {
                this.Msg(res.msg);
                this.getAllList();
              })
            }
        },
        //获取所有
        getAllList(){
            this.loading = true;
            // console.log("courseId",this.courseId)
            this.$api.problem.prog.getAllList({courseId:this.courseId, isDelete:0}).then((res) => {
              this.problemList = res.data;
              this.loading = false;
            }).catch(err =>{
              this.loading = false;
            })
        },
        //调用父组件view的子组件Add
        changeAlterAProblemDialogVisible(problem){
            // console.log(problem,"111111")
            let problem1 = JSON.parse(JSON.stringify(problem))
            this.$emit('changeAlterAProblemDialogVisible',problem1)
        }
    }
}
</script>
