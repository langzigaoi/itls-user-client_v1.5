<template>
    <div>
        <!-- 用户操作记录 -->
        <el-dialog top="5vh" align="left" title="操作记录" :visible.sync="dialogVisible" width="80%" >
          <div align="left">
            <el-select v-model="problemProgCondition.status" placeholder="请选择记录审核状态" clearable @change=getAllAudit()>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="problemProgCondition.action" placeholder="请选择操作类型" clearable @change=getAllAudit()>
                <el-option v-for="item in actionoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </div>
          
          <div>
              <el-table :data="problemProgLogList.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%;min-height:60vh" v-loading="loading"> 
                  <el-table-column prop="id" label="id" width="60"> </el-table-column>
              <el-table-column prop="courseId" label="课程id" width="80"> </el-table-column>
              <el-table-column prop="knowledge.name" label="知识点" width="120"> </el-table-column>
              <el-table-column prop="title" label="题干" width="300"> </el-table-column>
              <el-table-column prop="options" label="选项" width="300">
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
              <el-table-column prop="problemProgId" label="problemProgId" width="120"> </el-table-column> 
              <el-table-column prop="difficulty" label="难度" width="120"> </el-table-column> 
              <el-table-column  prop="" label="操作"  width="150">
                <template slot-scope="scope">
                    {{scope.row.action | actionfilter}}
                </template>
              </el-table-column>
              
              </el-table>
          </div>
          <!-- 分页器 -->
          <el-pagination  
              align="left"
              style="border:1px solid #ccc"
              @size-change="handleSizeChange" 
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 10, 300, 400]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="problemProgLogList.length">
          </el-pagination>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            problemProgLogList:[], //待审核的题目
            loading:true,
            problemProgCondition:{ //查询条件
              // courseId:2, //课程id
              status:0, //状态 -1未通过 0待审核 1已通过
              action:0, //动作 1增加 2修改 3删除
              userId:0,  //用户id
            },
            options: [{
                value: -1,
                label: '未通过'
                }, {
                value: 0,
                label: '待审核'
                }, {
                value: 1,
                label: '已通过'
                }
            ],
            actionoptions: [{
                value: 1,
                label: '增加题目'
                }, {
                value: 2,
                label: '修改题目'
                }, {
                value: 3,
                label: '删除题目'
                }
            ],
            currentPage:1, //分页 当前页
            pageSize:10, //分页 每页的大小
            dialogVisible:false,
        }
    },
    mounted(){
        this.getAllAudit();
    },
    computed:{
      userinfo(){
        return this.$store.state.user.userInfo;
      }
    },
    filters:{
        actionfilter(action){
            if(action==1){
                return "添加";
            }
            if(action==2){
                 return "修改";
            }
            if(action==3){
                 return "删除";
            }
        }
    },
    methods:{
        //获取所有待审核记录
        getAllAudit(){  
          if(!this.userinfo.id){
            this.errMsg("获取当前用户失败");
            return
          }
          this.problemProgCondition.userId = this.userinfo.id;
          this.loading = true;
          console.log("problemProgCondition",this.problemProgCondition)
          this.$api.problem.prog.getAUserList(this.problemProgCondition.userId).then((res) => {
               console.log(res);
            
                  this.problemProgLogList = res.data;
                    this.loading = false;
               
            })
            
        },
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
        changedialogVisible(){
          this.dialogVisible = !this.dialogVisible;
        }
       
        
    }
}
</script>