<template>
	<transition :name="transitionName">
		<router-view class="child-view"></router-view>
	</transition>
</template>
<script>
	import {mapGetters} from 'vuex';
	export default {
		data(){
			return {
				transitionName:'slide-disappear'
			}
		},
		computed:{
			...mapGetters(['warehouseId','isLoading'])
		},
		mounted(){
		},
		watch:{
			warehouseId(newV){
				console.log(newV)
				if(!newV){
					this.$createPotToast({
				        time: 1000,
				        txt: '当前用户没有仓库',
				        type:'warn'
				    }).show()
				    this.$store.commit('setList',[]);
				}else{
					this.$store.state.hasChoose={};
					this.$store.dispatch('getWuziliebiao',newV)
				}
			},
			isLoading(newV){
				if(newV){
					this.toast=this.$createPotToast({
			          txt: '正在加载中...',
			          time:0
			        }).show()
				}
				else{
					this.toast&&this.toast.hide();
				}
			}
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