<template>
	<div class="out_detail">
		<tk-header>出库详情</tk-header>
		<tk-container>
			<tk-detail :list=list></tk-detail>
			<tk-button :type='2'>确定</tk-button>
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
				data:null
			}
		},
		created(){
			this.data=data;
		},
		computed:{
			list(){
				var data=this.data;
				return [{
					key:'申请单号',
					value:data.number
				},{
					key:'所属仓库',
					value:data.warehouse
				},{
					key:'申请单位',
					value:data.unit
				},{
					key:'申请时间',
					value:data.apply_time
				},{
					key:'预计归还',
					value:data.return_time
				},{
					key:'审批状态',
					value:data.examine_status
				}]
			}
		}
	}
</script>

<style>
</style>