<template>
	<div>
        <!-- 主题列表{{this.courseId}} -->
        <div align="right">
						<el-dropdown>
							<el-button type="primary">
								消息记录<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item  split-button="true" @click.native="getAllbycreater()">个人帖子</el-dropdown-item>
								<el-dropdown-item>参与帖子</el-dropdown-item>>
							</el-dropdown-menu>
						</el-dropdown>
            <el-button @click="getAll" style=""><i class="el-icon-refresh"></i></el-button>
						<el-cascader :options="tags" :props="optionProps" placeholder="全部帖子" :show-all-levels="false"  v-model="tag" @change="getAllbytag" @click="getAllbytag()" filterable clearable></el-cascader>
            <el-input v-model="search" style="width:20%" placeholder="输入标签搜索"/>
        </div>
        <el-table  :data="questionList.filter(data => !search  || data.title.toLowerCase().includes(search.toLowerCase()) ||data.creater.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"  border style="overflow: scroll;width: 100%;max-height:70vh;min-height:70vh;" v-loading="loading">
            <el-table-column prop="id" label="id" width="60"> </el-table-column>
            <el-table-column   label="主题" >
							<!-- 评论信息 -->
							<template slot-scope="scope">
								<router-link
								:to="{path:'/studycourse/messagelogging',query:{id:scope.row.id}}"
								@click.native="selectbyid(scope.row)"
								:parent_id="id" >
								{{scope.row.title}}
								</router-link>
								<!-- <router-link
								to="/studycourse/messagelogging" 
								:parent_id="id"
								@click="viewCount">
								{{scope.row.title}}
								</router-link> -->

							</template>
							</el-table-column>
            <el-table-column prop="courseId" label="kecheng" width="80"> </el-table-column>
            <el-table-column prop="knowledge.name" label="标签" width="120"> </el-table-column> 
            <el-table-column prop="creater" label="作者" width="120"> </el-table-column>
            <el-table-column  label="发布时间" width="300"> 
							<template slot-scope="scope">
								<time>{{$moment(scope.row.gmtCreate).format('YYYY-MM-DD hh:mm')}}</time>
							</template>
						</el-table-column>
            <el-table-column  label="更新时间" width="320">
							<template slot-scope="scope">
								<time>{{$moment(scope.row.gmtModified).format('YYYY-MM-DD hh:mm')}}</time>
							</template> </el-table-column>
            <!-- <el-table-column prop="teacher" label="老师参与" width="120"> </el-table-column>  -->
            <el-table-column label="操作">
                <template slot-scope="scope">
									<el-badge :value="scope.row.likeCount" class="item">
										<!-- <el-button size="small" >点赞</el-button> -->
										<el-button size="mini" icon="el-icon-thumb" @click="addLikeCount(scope.row)" circle></el-button>
									</el-badge>
									<el-badge :value="scope.row.commentCount" @click="commentCount(scope.row)" class="item">
										<el-button size="mini" icon="el-icon-chat-round" circle></el-button>
									</el-badge>
									<el-badge :value="scope.row.viewCount"  class="item">
										<el-button size="mini" icon="el-icon-chat-round" circle></el-button>
									</el-badge>
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
        :total="questionList.length">
        </el-pagination>
				 <el-popover
						placement="top-start"
						width="200"
						trigger="click">
						<el-carousel :interval="4000" type="card" height="200px" class="ppt">
								<el-carousel-item >									
										<el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
										<el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
										<el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
										<el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
								</el-carousel-item>
								<el-carousel-item v-for="item in 4" :key="item">
									<h3 class="small">{{ item }}</h3>
								</el-carousel-item>
							</el-carousel>
						<el-button slot="reference">课程讨论信息</el-button>
					</el-popover>
    </div>
	
</template>
<script>

export default {
	props:['courseId'],
	data() {
		return {
			questionList:[],
			tags:[],
			tag:null,
			search:'',
			loading:true,
			currentPage:1,
			pageSize:10,
			parent_id:null,
			id: null,
			no:JSON.parse(localStorage.uInfo).principal.no,
			optionProps:{  //选择知识点的配置项
                    // label: 'name', 
                    value:'id',
                    // children:'child',
                    checkStrictly : true ,
                    filterable:true,
                    'show-all-levels': false, //仅显示最后一级
      },
			selectbytag:null

			
		}
	},
	methods:{
		getAllbycreater(){
			console.log("aaaa",this.no);
			this.$api.commentMenu.option.getAllbycreater({courseId:this.courseId,isDelete:0,creater:this.no}).then((res) =>{
				console.log("res",res);
				this.questionList=res.data;
			}).catch(err =>{
				console.log("sds",err);
			})
		},
		getAllbytag(){
			console.log("hahahd",this.courseId);
			this.tag=this.gettag(this.tag)
			this.$api.commentMenu.option.getAllbytag({courseId:this.courseId,isDelete:0,tag:this.tag}).then((res) =>{
				console.log("aaaa",res);
				this.questionList=res.data;
				console.log("enan",this.tag);
			})
		},
		findalltag(){
					console.log("jinru",this.courseId)
					this.$api.knowledge.knowledge.findByCourseId({courseId: this.courseId}).then((res) => {
						console.log("aaaa",res)
						this.tags = res.data;
						this.tags = JSON.parse(JSON.stringify(this.tags).replace(/name/g, 'label').replace(/child/g, 'children'));
			})
		},
		gettag(list){
				console.log("list",list)
				return list[list.length-1]
		},
		addLikeCount(row){
			
				console.log("nice",row.likeCount);
				row.likeCount++;
				console.log(row);
				console.log(this.questionList);
				this.$api.commentMenu.option.addLikeCount({likeCount:row.likeCount,id:row.id}).then((res) => {
						console.log("res");
				}).catch(err =>{
					console.log("guigui",row);
				})
			

		},
		selectbyid(row){
			console.log("dianji",row.id);
			// row.viewCount++;
			this.parent_id = row.id;
			console.log("ddd",this.parent_id);
			this.$api.commentMenu.option.selectbyid({id:row.id}).then((res) =>{
				console.log("haoe",res);
			}).catch(err =>{
				console.log("aaa",err);
			})
		},
		updateTimeQuestion(){
			console.log("time");
			this.$api.commentMenu.option.updateTimeQuestion({id:row.id,gmtModified:this.gmtModified}).then((res) =>{
				console.log("ressss",res); 
			})
		},
		getAll() {
			this.loading = true;
			console.log("neirong ",this.questionList);
			console.log("neirong ",this.questionList.id);
			// console.log("testaa ",this.$route);
			this.$api.commentMenu.option.getAll({courseId:this.courseId,isDelete:0}).then((res) => {
				// console.log("neirong ",res);
				this.questionList = res.data;
				this.loading = false;
				this.findalltag();
				console.log("haode",this.questionList);
				console.log("biaot",this.courseId	);

			}).catch(err => {
				console.log("gui",this.questionList);
				this.loading = false;
				console.log(err);
				console.log("gui",this.questionList);

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
		changeAlterAProblemDialogVisible(problem){
				// console.log(problem,"111111")
				let problem1 = JSON.parse(JSON.stringify(problem))
				this.$emit('changeAlterAProblemDialogVisible',problem1)
		}
			
	},
	mounted() {
		console.log("loj",this.no);
		console.log("neirong ",this.questionList);
		setTimeout(() =>{this.getAll()},1000)  
		console.log("daadad");
		
	}
	
}
</script>
<style >
	.item {
  margin-top: 10px;
  margin-right: 40px;
	}
	.ppt{
		width: 1500px;
		height: 600px;
		position: fixed;
		top: 100px;
		left: 300px;
		color: black;
		background-color: #99a9bf;
		opacity: 0.75;

	}
</style>