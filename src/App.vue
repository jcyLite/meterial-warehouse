<template>
	<transition :name="transitionName">
		<router-view class="child-view"></router-view>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex';
	import {storeOptions} from './store/Index.js';
	console.log(storeOptions.watchGetters)
	var getters=[];
	function watchPush(){
		Object.keys(storeOptions.watchGetters).forEach((index)=>{
			getters.push(index);
		})
	}
	watchPush();
	export default {
		data(){
			return {
				uids:['297ec0a85c1e8b79015c1e997ab70001','402881df670695880167069c07b30003',
				'402881df6706cbae016706cf29e80001','402881df670d39b301670d3fe5930000'],
				transitionName:'slide-disappear'
			}
		},
		watch:storeOptions.watchGetters,
		computed:{
			...mapGetters(getters)
		},
		created(){
		},
		mounted(){
			window.App=this;
			var that=this;
			this.$createPotDialog({
	        	type: 'select',
		        selects:['系统管理员','防汛办','仓库管理员','普通用户'],
		        title: '请选择您的角色',
		        onConfirm(e,index){
		        	that.$store.dispatch('getUserInfo',that.uids[index]);
		        }
		     }).show()
		}
	}
</script>

<style lang="less">
	@speed:100px;
	@speed2:100px;
	@opt:0;
	.child-view {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition: all .3s cubic-bezier(.55, 0, .1, 1);
	}
	.slide-disappear-enter{
		opacity:0;
		transform: scale(.8);
	}
	.slide-disappear-leave-active{
		opacity:0;
		transform: scale(1);
	}
	.slide-left-enter{
		opacity: @opt;
		transform: translate(@speed, 0);
	}
	.slide-right-leave-active {
		opacity: @opt;
		transform: translate(@speed2, 0);
	}
	.slide-right-enter {
		opacity: @opt;
		transform: translate(-@speed, 0);
	}
	.slide-left-leave-active{
		opacity: @opt;
		transform: translate(-@speed2, 0);
	}
	.slide-up-leave-active{
		opacity: @opt;
		transform:translate(0,-@speed2);
	}
	.slide-up-enter{
		opacity: @opt;
		transform:translate(0,@speed);
	}
	.slide-down-leave-active{
		opacity: @opt;
		transform:translate(0,@speed2);
	}
	.slide-down-enter{
		opacity: @opt;
		transform:translate(0,-@speed);
	}
	
</style>