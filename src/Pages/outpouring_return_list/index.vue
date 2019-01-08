<style lang="less">
	.sign-detail{
		height:80px;
		display: flex;
		>div{
			background-repeat: no-repeat;
			box-shadow: 2px 2px 3px rgba(0,0,0,.2);
			flex:1;
			background-size:contain;
			background-color:#fff;
		}
	}
</style>
<template>
	<div class="page-outpouring_return_list">
		<tk-header>归还纪录</tk-header>
		<tk-container>
			<tk-title>归还详情</tk-title>
			<tk-detail
				:list="[{
					key:'归还时间',
					value:$route.query.item.returnDate
				}]"
				>
				
			</tk-detail>
			<tk-title>接收人与归还人签名展示</tk-title>
			<tk-nodata v-if="!d.path1&&!d.path2"></tk-nodata>
			<div class="sign-detail">
				<div :style="{'background-image':`url(${baseImageURL+d.path1})`}"></div>
				<div :style="{'background-image':`url(${baseImageURL+d.path2})`}"></div>
			</div>
			<tk-title>归还列表</tk-title>
			<tk-cell-four
				:data="{
					title:'物资名称:'+item.goodsName,
					content:'规格型号:'+item.goodsModelName,
					time:'归还数量：'+item.num,
					status:'物资类别：'+item.goodsTypeName
				}"
				v-for="item,index of $route.query.item.returnInfoGlList"
				:key=index
				>
			</tk-cell-four>
		</tk-container>
	</div>
</template>

<script>
	export default {
		computed:{
			d(){
				return this.$route.query.item
			}
		}
	}
</script>

