<template>
	<div class="in_list">
		<tk-header>入库列表</tk-header>
		<tk-container>
			<template v-for="i of list"> 
				<div class="mtitle">
					<div class="icon"></div>
					<span class="left">申请单号：</span>
					<span class="num">{{i.num}}</span>
					<div class="right">查看详情>></div>
				</div>  
				<tk-cell-with-image 
					:key="item.id" 
					:img_src=item.img_src 
					:title=item.title 
					:middle=item.spec 
					:bottom="'库存：'+item.num" 
					v-for="item of i.list"
					></tk-cell-with-image>
			</template>
			
		</tk-container>
	</div>
</template>

<script>
	var list=[{
		num:'1231231231123',
		list:[{
			img_src:require('./image/12.jpg'),
			title:'柴油机',
			spec:'混流泵系列 10寸',
			num:5
		},{
			img_src:require('./image/12.jpg'),
			title:'柴油机',
			spec:'混流泵系列 10寸',
			num:5
		}]
	},{
		num:'1231231231123',
		list:[{
			img_src:require('./image/12.jpg'),
			title:'柴油机',
			spec:'混流泵系列 10寸',
			num:5
		},{
			img_src:require('./image/12.jpg'),
			title:'柴油机',
			spec:'混流泵系列 10寸',
			num:5
		}]
	}]
	export default {
		data(){
			return {
				list:null
			}
		},
		created(){
			this.list=list;
		}
	}
</script>

<style>
</style>