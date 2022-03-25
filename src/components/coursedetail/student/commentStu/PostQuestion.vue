<template>
	<div>
		<el-dialog top="5vh" align="left" title="发布主题" :visible.sync="postQuestionDialogVisible">
			
			<p class="flex">
				<span class="title">标签{{courseId}}</span>
				<el-cascader :options="tags" :props="optionProps" :show-all-levels="false" v-model="createQuestion.tag" filterable clearable></el-cascader>
			</p>
			<p class="flex">
				<span class="title">标题</span>
				<el-input type="textarea" placeholder="请输入标题" v-model ="createQuestion.title"></el-input>
			</p>
			<p class="flex">
				<span class="title">内容</span>
				<el-input
				 type="textarea"
				  placeholder="请输入内容"
					v-model ="createQuestion.description"></el-input>
			</p>
			
			<span class="cmtbtn">
				<el-button type="submit" value="添加" @click= "postQuestion">确定</el-button>
				<el-button @click="postQuestionDialogVisible = false">取消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	props:['courseId'],
	data(){
		return {
			postQuestionDialogVisible: false,
			tags:[],
			optionProps:{  //选择知识点的配置项
                    // label: 'name', 
                    value:'id',
                    // children:'child',
                    checkStrictly : true ,
                    filterable:true,
                    'show-all-levels': false, //仅显示最后一级
            },
			createQuestion:{
				courseId:this.courseId,
				title: null,
				description: null,
				tag: null,
			}
		}
	},
	methods: {
		changePostQuestionDialogVisible(){
			console.log("asd",this.courseId);
			this.postQuestionDialogVisible = !this.postQuestionDialogVisible;
		},
		findalltag(){
					console.log("获取所有知识点使用的课程id",this.courseId)
					this.$api.knowledge.knowledge.findByCourseId({courseId: this.courseId}).then((res) => {
						console.log("dsds",res)
						this.tags = res.data;
						this.tags = JSON.parse(JSON.stringify(this.tags).replace(/name/g, 'label').replace(/child/g, 'children'));
			})
		},
		//从知识点的id数组获取最后一个知识点id
		gettag(list){
				console.log("list",list)
				return list[list.length-1]
		},
		postQuestion(){
			this.createQuestion.courseId = this.courseId;
			if(!this.createQuestion.courseId || !this.createQuestion.tag || !this.createQuestion.title){
				this.errMsg("请填写完整")
				return
			}
			this.createQuestion.tag = this.gettag(this.createQuestion.tag);
			this.$api.commentMenu.option.insert(this.createQuestion).then((res) => {
				// this.$emit('')
				this.$emit('updateList');
				this.changePostQuestionDialogVisible();
				console.log("??",res);
				
			})
		}
	},
	watch:{
        postQuestionDialogVisible(val){
            //console.log(val);
            if(val)
              this.findalltag(); //查询所有知识点 
               
        }
    }
	
}
</script>
<style>
.flex {
    display:flex;
    margin: 10px;
    flex-basis: auto; 
    align-items: center;   /* // 垂直居中 */
    /*justify-content: center;  // 水平居中*/
}

.title {
    min-width: 60px;
}
.flex button {
    margin:0 5px;
    background-color: #F1F3F4;
}
</style>