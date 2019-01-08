<template>
	<div class="outpouring_feedback">
		<tk-header>跟踪反馈</tk-header>
		<tk-container style="bottom:50px;">
			<pot-scroll ref="scroll">
				<tk-title>反馈内容填写</tk-title>
				<tk-textarea 
					maxlength="600" 
					v-model="txt" 
					style="margin-top:10px;">
				</tk-textarea>
				<tk-title>
					反馈图片
				</tk-title>
				<tk-upload-photo 
					v-model="photos">
				</tk-upload-photo>
				<tk-title>
					反馈音频
				</tk-title>
				<tk-upload-audio 
					v-model="audios">
				</tk-upload-audio>
				<tk-title>
					反馈视频
				</tk-title>
				<tk-upload-video 
					v-model="videos">
				</tk-upload-video>
			</pot-scroll>
		</tk-container>
		<tk-button @click="submit" :type="2">
			反馈
		</tk-button>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				txt:'',
				photos:[],
				audios:[],
				videos:[]
			}
		},
		watch:{
			photos(){
				this.$refs.scroll.forceUpdate(true)
			},
			audios(){
				this.$refs.scroll.forceUpdate(true)
			},
			videos(){
				this.$refs.scroll.forceUpdate(true)
			}
		},
		methods:{
			submit(){
				this.$http.post('cs/feedBack',{
					uid:this.$store.state.uid,
					id:this.$route.query.id,
					goodsId:this.$route.query.goodsId,
					description:this.txt,
					data:this.photos.length?JSON.stringify(this.photos):'',
					videoData:this.videos.length?JSON.stringify(this.videos):'',
					audioData:this.audios.length?JSON.stringify(this.audios):''
				}).then(d=>{
					
				})
			}
		}
	}
</script>

<style>
</style>