<style lang="less">
	.component-nodata{
		.nodata{
		    width:100%;
		    text-align: center;
		    padding:20px;
		    color:#999;
		}
	}

</style>
<template>
	<div class="component-nodata">
		<!--<div class="nulldata" v-if="!data">系统未返回数据</div>-->
		<div class="nodata" v-if="data&&data.length==0">暂无数据</div>
	</div>
</template>

<script>
	export default {
		props:{
			data:{
				type:Array,
				default:()=>[]
			}
		}
	}
</script>

