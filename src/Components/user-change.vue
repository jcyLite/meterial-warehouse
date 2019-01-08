<template>
	<div class="mh-user-change" @click="$emit('click')">
		{{$store.state.roleName?$store.state.roleName:"切换账号"}}
	</div>
</template>

<script>
	export default {
		data(){
			return {
				uids:['297ec0a85c1e8b79015c1e997ab70001','402881df670695880167069c07b30003',
				'402881df6706cbae016706cf29e80001','402881df670d39b301670d3fe5930000'],
				unames:['系统管理员','防汛办','仓库管理员','普通用户']
			}
		},
		computed:{
			buttonTxt(){
				if(!this.$store.state.uid){
					return '选择角色'
				}else{
					return '当前角色：'+this.unames[this.uids.indexOf(this.$store.state.uid)]
				}
			}
		},
		methods:{
			change(){
				
			}
		}
	}
</script>

<style lang="less">
	.mh-user-change {
		background: #ffb243;
		z-index: 1000;
		border-radius: 10px;
		position: fixed;
		bottom: 10px;
		right: 10px;
		padding-left:10px;
		padding-right:10px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #fff;
	}
</style>