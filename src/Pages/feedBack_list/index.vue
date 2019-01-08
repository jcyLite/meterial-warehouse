<template>
	<div class="page-feedBack_list">
		<tk-header>
			反馈信息
		</tk-header>
		<tk-container>
			<pot-scroll>
				<tk-title>反馈内容</tk-title>
				<tk-detail-textarea>
					{{$route.query.list.description?$route.query.list.description:'暂无反馈内容'}}
				</tk-detail-textarea>
				<tk-title>图片反馈信息</tk-title>
				<tk-detail-photo :list="img_srcs"></tk-detail-photo>
				<tk-title>音频反馈信息</tk-title>
				<tk-detail-audio :list="audio_srcs"></tk-detail-audio>
				<tk-title>视频反馈信息</tk-title>
				<tk-detail-video :list="video_srcs"></tk-detail-video>
			</pot-scroll>
		</tk-container>
	</div>
</template>

<script>
	export default {
		mounted(){
			console.log(this.$route.query.list.fileList)
		},
		computed:{
			img_srcs(){
				var arr=[];
				this.$route.query.list.fileList.forEach(item=>{
					if(item.fileType=='jpeg'){
						arr.push({
							src:this.baseImageURL+item.path,
							time:item.createdDate,
							id:item.id
						})
					}
				})
				return arr;
			},
			video_srcs(){
				var arr=[];
				this.$route.query.list.fileList.forEach(item=>{
					if(item.fileType=='mp4'){
						arr.push({
							src:this.baseImageURL+item.path,
							time:item.createdDate,
							id:item.id
						})
					}
				})
				return arr;
			},
			audio_srcs(){
				var arr=[];
				this.$route.query.list.fileList.forEach(item=>{
					if(item.fileType=='wav'){
						arr.push({
							src:this.baseImageURL+item.path,
							time:item.createdDate,
							id:item.id
						})
					}
				})
				return arr;
			}
		}
	}
</script>

<style>
</style>