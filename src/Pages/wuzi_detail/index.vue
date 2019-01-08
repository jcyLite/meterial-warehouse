<template>
	<div class="page-wuzi-detail">
		<tk-header>物资详情</tk-header>
		<tk-container>
			<tk-detail :list="[{
				key:'物资名称',
				value:d.goodsName
			},{
				key:'物资类别',
				value:d.goodsTypeName
			},{
				key:'库存',
				value:d.kc+d.unit
			},{
				key:'物资型号',
				value:d.goodsModel
			},{
				key:'所属仓库',
				value:d.warehouseName
			}]"></tk-detail>
			
			<tk-title>物资照片</tk-title>
			<tk-detail-photo :list="[{
				src:baseImageURL+d.fileRelatedId
			}]">
				
			</tk-detail-photo>
		</tk-container>
	</div>
</template>

<script>
	export default {
		mounted(){
			console.log(this.$route.query.data)
		},
		computed:{
			d(){
				return this.$route.query.data
			}
		}
	}
</script>

<style>
</style>