<template >
	<div >
		<el-col :span="20" style="padding: 2px;">
			<el-col >
				<el-card>
					<div slot="header" class="clearfix">
						<span style="float: left" >{{questionList.title}}</span>
					</div>
					<div class="content">
						<span >{{questionList.description}}</span>
						<span >{{questionList.is_endtitle}}aa</span>
					</div>
					<!-- <div class="bottom clearfix">
							<span >{{questionList.gmtCreate}}</span>
					</div> -->
					<el-row class="smessage">
							<div class="bottom clearfix">
								<time class="time">{{$moment(questionList.gmtCreate).format('YYYY-MM-DD')}}</time>
								<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
										编辑
									</el-button>
								<el-button size="mini">回复</el-button>
							</div>
					</el-row>
				</el-card>
			</el-col>
			<el-col v-for="comment in comments.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="comment.id" >
			<!-- <el-col> -->
				<el-card >
					<!-- <div class="header"> </div> -->
					<el-row :rows="1" class="header">
						<div>{{comment.commenter}}:</div>
						<div>{{comment.content}}</div>
						</el-row>
					<el-row :rows="1">
						<div class="nt">
							
							<time>{{$moment(comment.gmt_create).format('YYYY-MM-DD hh:mm')}}</time>
						</div>
						<div class="count">
							<button class="header-icon el-icon-info"></button>
							<button>jubao</button>
						</div>
					
					</el-row>
					<el-row>
						<el-collapse accordion>
							<el-collapse-item  name="1">
								<!-- <template slot="title" @click="selectcomment(comment.id,type)"> -->
								<template slot="title" >
									更多评论.....{{comment.id}}<i class="header-icon el-icon-info" @click="tyption(comment)"></i>
								</template>
								<div>	
									<el-col v-for="commentd in commentdouble" :key="commentd.id">
									<!-- <el-col v-for="commentt in commentdouble" :key="commentt.id"> -->
										<el-card>
											<el-row class="header" :rows=1>
												<div >{{commentd.commenter}}:</div>
												<div>{{commentd.content}}</div>
											</el-row>
											
											<div class="middle">
												<time>{{$moment(commentd.gmt_create).format('YYYY-MM-DD hh:mm')}}</time>
											</div>
										</el-card>
									</el-col>
									<div>
										<el-input type="textarea" placeholder="pinglun" v-model="postcomment.content"></el-input>
										<!-- <el-input type="textarea" placeholder="pinglun" v-model="commentt.content"></el-input> -->
										<el-button @click="insertComment" class="cmbtn" :disabled="disable" >pinglun</el-button>
									</div>
									
								</div>
							</el-collapse-item>
						</el-collapse>
					</el-row>
				</el-card>
				
			</el-col>
			<el-col>
				<el-pagination  
            align="left"
            style="border:1px solid #ccc"
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 10, 300, 400]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="comments.length">
        </el-pagination>
			</el-col>
			
			<!-- <div class="dynamic">
				<el-input type="textarea" placeholder="pinglun" :rows="3" v-model="postcomment.content"></el-input> -->
				<!-- <el-button type="submit" @click="insertComment" class="cmbtn" >评论</el-button> -->
				<!-- <el-button type="submit" @click="insertComment" class="cmbtn" :disabled="disable">评论</el-button>
			</div> -->
		</el-col>
		<el-popover class="dynamiccomment"
				placement="right"
				width="400"
				
				trigger="click">
				<div class="dynamic">
						<el-input type="textarea" placeholder="pinglun" :rows="3" v-model="postcomment.content"></el-input>
						<!-- <el-button type="submit" @click="insertComment" class="cmbtn" >评论</el-button> -->
						<el-button type="submit" @click="insertComment" class="cmbtn" :disabled="disable" icon="el-icon-search"  circle>评论</el-button>
					</div>
				<el-button slot="reference" icon="el-icon-search" type="primary" circle>评论</el-button>
			</el-popover>
		<el-drawer
				title="我是标题"
				:visible.sync="drawer"
				:direction="direction"
				:before-close="handleClose">
				<el-button :disabled="questionList.creater !=this.username" @click="endtitle">默认按钮</el-button>
			</el-drawer>
		<!-- <el-row> -->
					<!-- <el-button :disabled="questionList.creater !=this.username" >默认按钮</el-button> --> 
					<!-- <el-button :disabled="questionList.creater !=this.username" @click="endtitle">默认按钮</el-button> -->
					 <!-- <div>本贴已获得解决方案，评论功能关闭</div> -->
		<!-- </el-row> -->
	</div>
</template>

<script>
export default {
	name:'MessageLogging',
	props:['id'],
	data() {
    return {
			questionList:{},
			tcomment:false,
			type:1,
			parent_id:this.$route.query.id,
			comments:[],
			commentdouble:{},
			comment:[],
			postcomment:{
				parentId:null,
				content:null,
				type:null
			},
			typing:true,
			currentPage:1, //分页 当前页
      pageSize:5,
			username:JSON.parse(localStorage.uInfo).principal.username,
			drawer: false,
			direction: 'rtl',//编辑面板
			is_endtitle:null,
			disable:false

    };
  },
	methods:{
		disableCt(){
			console.log("zhenjia",this.disable);
			if(this.is_endtitle==1){this.disable=true;}
			console.log("zhenjia",this.disable);
			

		},
		handleClose(done) {  //编辑面板
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
		handleSizeChange(pagesizes){ //每页的大小
            // console.log(pagesizes);
            this.pageSize = pagesizes;
        },
		handleCurrentChange(currentChange){ //当前页
				// console.log(currentChange);
				this.currentPage = currentChange;
		},
		tyption(comment){
			this.typing = !this.typing;
			console.log("??",this.typing)
			if(this.typing == true){this.type = 1;this.parent_id=this.$route.query.id;}
			else{this.type = 2;this.parent_id=comment.id;this.selectComment(comment);}
			console.log(">>",this.type);
		},
		selectbyid(){
			console.log("chuanrus",this.$route.query.id);
			console.log("chuanrus",this.$store.state.user);
			console.log("chuanrus",JSON.parse(localStorage.uInfo).principal.username);
			this.$api.commentMenu.option.selectbyid({id:this.parent_id}).then((res) =>{
				console.log("res",res);
				this.questionList = res.data;
				console.log("ss",this.questionList);
			}).catch(err =>{
				console.log("aaa",err);
			})
		},
		selectComment(){
			console.log("aa",this.$route.query.id);
			console.log("aa",this.is_endtitle);
			this.$api.commentMenu.comment.selectComment({parentId:this.parent_id,type:this.type}).then((res) =>{
					console.log("res",res);
					if(this.type==1){this.comments = res.data;}
					else{this.commentdouble = res.data;}
			}).catch(err =>{
				console.log("err",err);
			})
			
		},
		insertComment(){
			this.postcomment.parentId = this.parent_id;
			console.log("he",this.parent_id);
			this.postcomment.type = this.type;
			console.log("he",this.type);
			console.log("aaaa",this.postcomment);
			this.$api.commentMenu.comment.insertComment(this.postcomment).then((res) =>{
				console.log("res",res);
				this.postcomment.content=null;
				this.selectComment();
			}).catch(err =>{
				console.log("aaa",err);
			})
		},
		endtitle(){
			console.log("ress",this.parent_id);
			console.log("ress",this.username);
			this.$api.commentMenu.option.endtitle({id:this.parent_id,creater:this.username}).then((res) =>{
				console.log("aaa",res);
				console.log("aaa",this.questionList);
				this.questionList.is_endtitle = res.data;
				console.log("aaa",this.questionList.is_endtitle);
				this.is_endtitle = res.data;
				this.disableCt();
				
			}).catch(err =>{
				console.log("saa",err);
			})
		}
			
		

	},
	mounted() {
		console.log("sds",this.$route.query.id);
		this.selectbyid();
		this.selectComment();
		// this.selectComment();
	},
}
</script>

<style>
	.content{
		height: 500px;

	}
	.bottom {
		position: relative;
  }
	.time {
    font-size: 13px;
    color: #999;
		left: 0px;
  }
	.clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
	.smessage{
		position: relative;
		bottom: 0;
	}
	.comment_1{
		position: relative;
		display: block;
	}
	.count {
		float: right;
		
	}
	.nt {
		float: left;
		position: relative;
		display: flex;
	}
	.header{
		position: relative;
		display: flex;
	}
	.cmbtn{
		float: right;
	}
	.dynamic{
		position: fixed;
		width: 1500px;
		bottom: 0;
		left: 200px;

	}
	.dynamiccomment{
		position: fixed;
		right: 0;
		bottom: 0;
	}
</style>