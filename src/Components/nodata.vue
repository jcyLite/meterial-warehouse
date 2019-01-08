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
		<div class="nodata-icon" v-if="!$tkType.isArray(data)||(data&&data.length==0)"></div>
	</div>
</template>

<script>
	export default {
		props:['data']
	}
</script>

