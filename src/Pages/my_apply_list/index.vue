<template>
	<div class="my_apply_list">
		<pot-header>
			我的申领
			<span slot="right" @click="$router.push({
				path:'/apply'
			})">
				去申领
			</span>
		</pot-header>
		<pot-container>
			<pot-scroll ref="scroll" @pulling-up="pullUp" @pulling-down="pullDown" :options="{
				pullDownRefresh:true,
				pullUpLoad:canpullUp
			}">
				<template v-for="i of list"> 
					<div class="mtitle">
						<div class="icon"></div>
						<span class="left">申请单号：</span>
						<span class="num">{{i.danhao}}</span>
						<div @click="$router.push({
							path:'/my_apply_detail',
							query:{
								num:i.danhao
							}
						})" class="right">查看详情>></div>
					</div>  
					<mh-cell :img_src="baseImageURL+item.fileRelatedId" :title="item.goodsTypeName" :middle="item.goodsModelName" :bottom="'已申领：'+item.num" v-for="item of i.list"></mh-cell>
				</template>
				<no-data :data="list"></no-data>
				<div v-if="!canpullUp" class="no-more">
					暂无更多数据
				</div>
			</pot-scroll>
		</pot-container>
	</div>
</template>

<script>
	export default {
		created(){
			window.my_apply=this;
			this.ajax()
		},
		methods:{
			ajax(){
				this.$http.post('/cs/getMyApplys',{
					uid:this.$store.state.uid,
					page:this.page,
					wareHouseId:this.$store.getters.warehouseId
				}).then(d=>{
					console.log(this.$refs.scroll)
					this.$refs.scroll&&this.$refs.scroll.forceUpdate(true);
					if(this.page==1){
						this.list=d;
					}else{
						if(d.length==0){
							this.canpullUp=false;
						}else{
							this.list=this.list.concat(d)
						}
					}
					
				})
			},
			pullDown(){
				this.page=1;
				this.canpullUp=true;
				this.ajax()
			},
			pullUp(){
	    		if(this.canpullUp){
	    			this.page++;
	    			this.ajax();
	    		}
		    }
		},
		data(){
			return {
				list:null,
				page:1,
				canpullUp:true
			}
		}
	}
</script>

<style>
</style>