<style lang="less">
	.login{
		.login-title{
			text-align: center;
			margin-top:20px;
			font-size:20px;
		}
		.confirm{
			width:240px;
			left:0;
			right:0;
			top:30px;
			margin:auto;
		}
	}
	.login-container{
		margin-top:40px;
		>div{
			margin-left:20px;
			margin-right:20px;
			margin-top:10px;
			margin-bottom:20px;
			border:1px solid #f8f8f8;
			border-radius:5px;
		}
	}
	
</style>
<template>
	<div class="login">
		<div class="login-title">
			登录
		</div>
		<div class="login-container">
			 <pot-input v-model="a"></pot-input>
			 <pot-input type="password" v-model="b"></pot-input>
		</div>
		<tk-button :disabled="!c" class="confirm" @click="confirm">确定</tk-button>
		<!--<div >确定</div>-->
	</div>
</template>

<script>
	export default {
		data(){
			return {
				a:localStorage.getItem('uname')||'admin',
				b:'qaz123!@#'
			}
		},
		computed:{
			c(){
				return this.a&&this.b
			}
		},
		methods:{
			confirm(){
				localStorage.setItem('uname',this.a);
				this.$http.post('cs/login',{
					userId:this.a,
					pwd:this.b//qaz123!@#
				}).then(d=>{
					this.$store.state.uid=d;
					this.$emit('confirm',d.code)
				})
			}
		}
	}
</script>

