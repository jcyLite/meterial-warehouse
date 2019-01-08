<template>
	<div class="sign">
		<tk-header>签名
		</tk-header>
		<tk-container>
			<tk-title>出库人签字：</tk-title>
			<tk-sign :height='200' class="sign1" v-model="sign1"></tk-sign>
			<tk-title>接收人签名：</tk-title>
			<tk-sign color="#fcbd3a" :height='200' class="sign2" v-model="sign2"></tk-sign>
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
				this.$http.post('cs/saveOutGoods',{
					data:JSON.stringify(this.$route.query.hasChoosedJson),
					applyNumbers:this.$route.query.applyNumbers,
					id:this.$route.query.id,
					sign1:this.sign1.replace('data:image/png;base64,',''),
					sign2:this.sign2.replace('data:image/png;base64,','')
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
	.sign{
		.sign1{
			background:#fff;
		}
		.sign2{
			background:#fff;
		}
	}
</style>