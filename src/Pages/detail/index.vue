<style>
	.page-detail{
		
	}
</style>
<template>
	<div class="page-detail">
		<tk-header>物资详情</tk-header>
		<tk-container>
			<tk-detail :list="[{
					key:'物资名称',
					value:data.meterial_name
				},{
					key:'物资系列',
					value:data.series
				},{
					key:'库存',
					value:data.inventory
				},{
					key:'物资照片',
					value:data.img_src
				},{
					key:'备注信息',
					value:data.return_time
				}]"></tk-detail>
		</tk-container>
	</div>
</template>

<script>
	var data={
		meterial_name:'柴油机',
		series:'混流泵系列',
		inventory:'5台',
		img_src:'',
		remark:''
	}
	export default{
		data(){
			return {
				data:null
			}
		},
		created(){
			this.data=data;
		}
	}
</script>
