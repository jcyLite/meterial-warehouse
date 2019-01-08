<template>
	<div class="sign">
		<tk-header>
			签名
		</tk-header>
		<tk-container>
			<tk-title>接收人签字：</tk-title>
			<tk-sign style="background:#fff;" :height='200' v-model="sign1"></tk-sign>
			<tk-title>归还人签字：</tk-title>
			<tk-sign color="#fcbd3a" style="background:#fff;" :height="200" v-model="sign2"></tk-sign>
			<tk-button :disabled="!sign1||(!sign2)" @click="submit" :type="2">提交</tk-button>
		</tk-container>
	</div>
</template>

<script>
	export default {
		name:'sign',
		data(){
			return {
				sign1:'',
				sign2:''
			}
		},
		methods:{
			submit(){
				this.$http.post('cs/saveReturnGoods',{
					data:JSON.stringify(this.$route.query.hasChoosedJson),
					applyNumbers:this.$route.query.applyNumbers,
					sign1:this.sign1.replace('data:image/png;base64,',''),
					sign2:this.sign2.replace('data:image/png;base64,',''),
					id:this.$route.query.id
				}).then(()=>{
					this.$router.push('/outpouring')
				})
			},
			import_from_image(){
				
			}
		}
		
	}
</script>

<style lang="less">
	
</style>