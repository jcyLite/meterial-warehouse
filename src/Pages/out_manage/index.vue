<style lang="less">
	.pop-bottom{
		.mask{
			position:fixed;
			top:0;
			bottom:0;
			right:0;
			left:0;
			background:#000;
			opacity:0;
			z-index:1000;
		}
		.box{
			position:fixed;
			bottom:0;
			margin:5px;
			box-sizing: border-box;
			height:300px;
			width:auto;
			transition:.3s all;
			transform:translateY(300px);
			background:#fff;
			z-index:2000;
		}
		&.active{
			.box{
				transform:translateY(0);
			}
			.mask{
				opacity:.3;
			}
		}
	}
</style>
<template>
	<div class="out-manage">
		<tk-header>出库管理</tk-header>
		<tk-container>
			<pot-scroll>
				<div class="detail">
					<div @click="$router.push('/out_detail')">
						<div>查看详情</div>
						<div >
							<span class="pot-icon-right"></span>
						</div>
					</div>
					<div @click="$router.push('/out_list')">
						<div>出库</div>
						<div >
							<span class="pot-icon-right"></span>
						</div>
					</div>
					<div>
						<div>零配件消耗</div>
						<div>
							<pot-switch style="margin-top:6px;"></pot-switch>
						</div>
					</div>
					<div>
						<div>零配件名称</div>
						<div>
							<span class="select">请选择</span>
							<span class="pot-icon-right"></span>
						</div>
					</div>
					<div>
						<div>规格型号</div>
						<div>
							<span class="select">请选择</span>
							<span class="pot-icon-right"></span>
						</div>
					</div>
					<div>
						<div>数量</div>
						<div>
							<input placeholder="请输入" type="text" />
						</div>
					</div>
					<div>
						<div>编号</div>
						<div>
							<input placeholder="请输入" type="text" />
						</div>
					</div>
				</div>
			</pot-scroll>
			<tk-button @click="$router.push('/sign')" :type='2'>确定</tk-button>
		</tk-container>
	</div>
</template>

<script>
	var data={
		 number:'1231231231',
		 warehouse:'江阴市抗旱排涝队',
		 unit:'农机处',
		 apply_time:'2018-09-03',
		 return_time:'2018-10-03',
		 examine_status:'同意'
	}
	export default {
		data(){
			return {
				data:null,
				active:false
			}
		},
		created(){
			this.data=data;
		},
		mounted(){
		},
		methods:{
			out(){
				this.active=!this.active;
			}
		}
		
	}
</script>

