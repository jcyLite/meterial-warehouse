<style lang="less" scoped>
	.mh-cell{
		padding-top:16px;
		padding-left:29px;
		padding-bottom:16px;
		background:#fff;
		margin-top:9px;
		display: flex;
		position: relative;
		.image{
			width:68px;
			height:68px;
			background-size: cover;
			border-radius:10px;
			background-color:#666;
			margin-right:20px;
			
		}
		.content{
			border-left:1px solid #e5e5e5;
			padding-left:20px;
			.title{
				margin-top:4px;
				font-size:14px;
				color:#333;
			}
			.middle{
				margin-top:12px;
				color:#999;
				font-size:12px;
			}
			.bottom{
				margin-top:12px;
				color:#999;
				font-size:12px;
				width:200px;
				text-overflow:ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
		.right{
			position:absolute;
			right:20px;
			bottom:10px;
		}
	}
</style>
<template>
	<div @click="$emit('click')" class="mh-cell">
		<div :style="{'background-image':`url(${img_src})`}" class="image">
			
		</div>
		<div class="content">
			<div class="title">
				{{title}}
			</div>
			<div class="middle">
				{{middle}}
			</div>
			<div class="bottom">
				{{bottom}}
			</div>
		</div>
		<div class="right">
			<slot name="right"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name:'mh-cell',
		props:{
			img_src:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			middle:{
				type:String,
				default:''
			},
			bottom:{
				type:String,
				default:''
			}
		}
	}
</script>

