<style lang="less">
	.out_list{
		.list{
			height:100px;
			background:#fff;
			margin:5px;
			border-radius:5px;
			padding:13px;
		}
	}
</style>

<template>
	<div class="out_list">
		<tk-header>出库列表</tk-header>
		<tk-container>
			<div class="list" v-for="item of list">
				<div>{{item.meterial_name}}</div>
				<div>{{item.meterial_model}}</div>
				<div>
					<div>{{item.selected_num}}</div>
					<tk-add-minus v-model="item.active_num">
					</tk-add-minus>
				</div>
			</div>
		</tk-container>
		tk-
	</div>
</template>

<script>
	var data=[{
		meterial_name:'柴油机',
		meterial_model:'混流泵系列 10寸',
		selected_num:'3',
		num:'AU3051'
	},{
		meterial_name:'支架',
		meterial_model:'混流泵系列 10寸',
		selected_num:'3',
		num:'AU3051'
	}]
	export default {
		data(){
			return {
				data:null
			}
		},
		computed:{
			list(){
				var d=[];
				for(var i=0;i<this.data.length;i++){
					this.data[i].active_num=this.data[i].selected_num;
					d.push(this.data[i])
				}
				console.log(d);
				return d;
			}
		},
		created(){
			this.data=data;
		},
		methods:{
			
		}
	}
</script>
