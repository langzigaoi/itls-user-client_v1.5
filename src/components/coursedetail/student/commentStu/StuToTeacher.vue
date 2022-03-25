<template>
	<div>
		<div class="top">
			<div class="title">
				<h2 align="">老师答疑区</h2>
			</div>
		</div>
		<p class="notice">发表关于作业、课件、课件内容，希望得到老师回答的疑问</p>
		<div class="middle">
			<button class="cmtqtn" @click="$refs.postDialog.changePostQuestionDialogVisible()" >发布主题</button>
			<post-dialog ref="postDialog"></post-dialog>
		</div>
		<div class="comment">
			<div class="cmttop">
				<div class="allqtn">
					<h2>全部主题</h2>
				</div>
				<div>
					<el-select placeholder="请选择相关主题">
						<el-option v-for="item in content" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
				<div class="sortway">
					<a href="" class="newqtn">最新发表</a>
					<a class="lastcmt">最后回复</a>
					<a class="hotcmt">热度排序</a>
				</div>
			</div>
			<div class="qtnshow">
				<ul class="qtnshowlist">
					<li class="qtn"></li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
import postDialog from './PostQuestion' 

export default {
		name: 'StuToTeacher',
		data() {
			return {
				content: [
					{
						value: -1,
						label: '第一节'
					},
					{
						value: 0,
						label: '第二节'
					},
					{
						value: 1,
						label: '第三节'
					},
					{
						value: 2,
						label: '第四节'
					},
					{
						value: 3,
						label: '第五节'
					},
				]
			}
		},
		components: {
			postDialog
		}
}
</script>

<style>
	.top {
		justify-items: center;
		display: flex;
		flex-basis: auto;
		text-align: justify;
		margin: 40px;
		border-bottom: 1px solid #eee;
		margin-bottom: 15px;
		padding-bottom: 5px;
	}
	.title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.cmttop {
		text-align: justify;
		display: flex;
	}
	.sortway {
		position: absolute;
		right: 10%;
		height: 0px;
		border: 1px solid #eee;
		padding: 20px;
		text-align: justify;
	}
	.a {
		display: inline-block;
		color:black;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
	}
</style>