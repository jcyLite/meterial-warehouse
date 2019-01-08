<style lang="less">
	.page-more{
		
	}
</style>
<template>
	<div class="page-more">
		<tk-header>物资列表-更多</tk-header>
		<tk-container>
			<pot-scroll :refreshDelay="200" ref="scroll" :listenScroll="true" @pulling-down="pullDown" @pulling-up="pullUp" :options="{
				pullDownRefresh:true,
				pullUpLoad:true
			}">
				<div v-for="item of $store.state.list" @click="$router.push({
						path:'/detail',
						query:{
							
						}
					})">
						<tk-cell-with-image 
							:img_src="baseImageURL+item.fileRelatedId" 
							:title=item.goodsName 
							:middle="item.goodsTypeName" 
							:bottom="'库存：'+item.kc"></tk-cell-with-image>
					</div>
					<no-data :data="$store.state.list"></no-data>
			</pot-scroll>
		</tk-container>
	</div>
</template>

<script>
	var list=[{
		img_src:require('@/image/12.jpg'),
		title:'柴油机',
		spec:'混流泵系列 10寸',
		num:5
	},{
		img_src:require('@/image/12.jpg'),
		title:'柴油机',
		spec:'混流泵系列 10寸',
		num:5
	},{
		img_src:require('@/image/12.jpg'),
		title:'柴油机',
		spec:'混流泵系列 10寸',
		num:5
	},{
		img_src:require('@/image/12.jpg'),
		title:'柴油机',
		spec:'混流泵系列 10寸',
		num:5
	},{
		img_src:require('@/image/12.jpg'),
		title:'柴油机',
		spec:'混流泵系列 10寸',
		num:5
	},{
		img_src:require('@/image/12.jpg'),
		title:'柴油机',
		spec:'混流泵系列 10寸',
		num:5
	}]
	export default{
		data(){
			return {
				list:null
			}
		},
		created(){
			this.list=list;
		},
		methods:{
			pullUp(){
		    	setTimeout(()=>{
		    		this.list=this.list.concat(list)
		    	},2000)
		    },
		    pullDown(){
		    	setTimeout(() => {
		    		 this.$refs.scroll.forceUpdate()
		    	},1000)
		    }
		}
	}
</script>

