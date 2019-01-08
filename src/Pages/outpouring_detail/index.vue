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
	<div class="page-outpouring_detail">
		<tk-header>出入库详情</tk-header>
		<tk-container :style="{bottom:d.outpouringStatus!='3'?'50px':'0'}">
			<pot-scroll>
				<tk-title>出入口详情</tk-title>
				<tk-detail 
					:list="[{
						key:'申领时间',
						value:d.applyDate
					},{
						key:'申领单位',
						value:d.applyDeptName
					},{
						key:'申领单号',
						value:d.applyNumbers
					},{
						key:'申领状态',
						value:$store.state.examineStatus[d.examineStatus]
					},{
						key:'预计归还时间',
						value:d.expectedReturn&&d.expectedReturn.substring(0,10)
					},{
						key:'申领仓库',
						value:d.warehouseName
					}].concat($route.query.type?[{
						key:'审核备注',
						detail:d.approvalRemark,
						value:d.approvalRemark
					}]:[])"
					></tk-detail>
				<tk-title>出库人与接收人签名展示</tk-title>
				<tk-nodata v-if="!d.path1&&!d.path2"></tk-nodata>
				<div class="sign-detail">
					<div :style="{'background-image':`url(${baseImageURL+d.path1})`}"></div>
					<div :style="{'background-image':`url(${baseImageURL+d.path2})`}"></div>
				</div>
				<tk-title>归还纪录</tk-title>
				<tk-nodata v-if="getReturnList&&(!getReturnList.length)"></tk-nodata>
				<tk-cell-one 
					:title=item.returnDate
					@click.native="$router.push({
						path:'/outpouring_return_list',
						query:{
							item:item
						}
					})"
					v-for="item,index of getReturnList"
					></tk-cell-one>
				<!--<tk-cell-four
					:data="{
						title:item.returnDate,
						content:' ',
						time:' ',
						status:' '
					}"
					@click="$router.push({
						path:'/outpouring_return_list',
						query:{
							item:item
						}
					})"
					v-for="item,index of getReturnList"
					:key=index
					>
				</tk-cell-four>-->
				<tk-title v-if="$route.query.type=='churu'">申领列表</tk-title>
				<tk-title v-if="$route.query.type=='guihuan'">出库列表</tk-title>
				<tk-cell-four
					v-if="d.applyInfoList" 
					:data="{
						title:'物资名称:'+item.goodsName,
						content:item.goodsModelName+(item.identifier?(' | '+item.identifier):''),
						time:'申请数量：'+item.num,
						status:'物资类别：'+item.goodsTypeName
					}"
					v-for="item,index of d.applyInfoList"
					:key="index"
					></tk-cell-four>
				<tk-cell-four
					@click="$router.push({
						path:'/outpouring_feedback',
						query:{
							id:item.id
						}
					})"
					v-if="d.applyList" 
					:data="{
						title:'物资名称:'+item.goodsName,
						content:item.goodsModelName+(item.identifier?(' | '+item.identifier):''),
						time:'出库数量：'+item.outpouringNum+' | 已归还数量:'+item.returnNum,
						status:'物资类别：'+item.goodsTypeName 
					}"
					v-for="item,index of d.applyList"
					:key="index"
					></tk-cell-four>
			</pot-scroll>
			<tk-button 
				v-if="$route.query.type=='guihuan'&&d.outpouringStatus!='3'"
				:type="2"
				@click="$router.push({
					path:'/guihuan',
					query:{
						applyNumbers:$route.query.applyNumbers,
						list:d.applyList,
						id:$route.query.id
					}
				})"
				>
				归还
			</tk-button>
			<tk-button 
				v-if="$route.query.type=='churu'"
				@click="$router.push({
				path:'/chuku',
				query:{
					id:$route.query.id,
					applyNumbers:$route.query.applyNumbers,
					warehouseId:d.warehouseId,
					warehouseName:d.warehouseName
				}
			})" :type="2">出库</tk-button>
		</tk-container>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				d:{},
				getReturnList:[]
			}
		},
		created(){
			this.ajax();
			this.ajax_1()
		},
		methods:{
			ajax_1(){
				this.$http.post('cs/getReturnList',{
					id:this.$route.query.id
				}).then(d=>{
					this.getReturnList=d
				})
			},
			ajax(){
				if(this.$route.query.type=='churu'){
					this.$http.post('cs/getOutpouringPage',{
						id:this.$route.query.id
					}).then(d=>{
						this.d=d;
					})
				}else if(this.$route.query.type=='guihuan'){
					this.$http.post('cs/getOutpouringGoodsList',{
						id:this.$route.query.id
					}).then(d=>{
						this.d=d;
					})
				}
			}
		}
	}
</script>

