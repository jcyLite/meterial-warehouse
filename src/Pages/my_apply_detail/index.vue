<style lang="less">
	.page-my_apply_detail{
		.applyRemark{
			line-height:25px;
			background:#fff;
			padding:13px;
		}
	}
</style>
<template>
	<div class="page-my_apply_detail">
		<tk-header>申请详情</tk-header>
		<tk-container>
			<pot-scroll ref="scroll" @pulling-down="pullDown" :options="{
				pullDownRefresh:true,
				pullUpLoad:false
			}">
				<tk-title>
					单号信息
				</tk-title>
				<tk-detail :list="t"></tk-detail>
				<tk-title>
					申请物资列表
				</tk-title>
				<tk-cell-box :data="d.applyInfolist">
					<tk-cell-with-image
						v-for="(item,index) of d.applyInfolist"
						:key=index @click="(active!=index)?(active=index):(active=-1)"
						:img_src="baseImageURL+item.fileRelatedId" 
						:title="item.goodsName"
						:middle="'申请数量：'+item.num" 
						:right_top="item.goodsTypeName"
						:bottom="'申请备注：'+(item.applyRemark?item.applyRemark:'无')">
						
					</tk-cell-with-image>
				</tk-cell-box>
				
				
				<tk-title>
					出库信息
				</tk-title>
				<tk-cell-box :data="d.outpouringInfoList">
					<tk-cell-with-image
						v-for="(item,index) of d.outpouringInfoList"
						:key=index
						:img_src="baseImageURL+item.fileRelatedId" 
						:title="item.goodsName"
						:middle="'规格型号：'+item.goodsModelName" 
						:bottom="'出库数量：'+item.outpouringNum" 
						:right_top="item.goodsTypeName">
						<tk-button @click="$router.push({
							path:'/feed_back',
							query:{
								id:$route.query.id,
								goodsId:item.goodsId
							}
						})" slot="right-bottom" :type="4">
							去反馈
						</tk-button>
					</tk-cell-with-image>
				</tk-cell-box>
				<tk-title>
					反馈信息
				</tk-title>
				<tk-cell-box :data="d.feedbackList">
					<tk-cell-with-image
						v-for="(item,index) of d.feedbackList"
						:key=index
						:img_src="baseImageURL+item.fileRelatedId" 
						:title="item.goodsName"
						:middle="item.goodsModel" 
						:right_top="item.goodsTypeName"
						:bottom="(item.description?item.description:'无')">
						<tk-button @click="$router.push({
							path:'/feedBack_list',
							query:{
								list:item
							}
						})" slot="right-bottom" :type="4">
							查看详情
						</tk-button>
					</tk-cell-with-image>
				</tk-cell-box>
				<tk-title>
					归还信息
				</tk-title>
				<tk-cell-box :data="d.returnList">
					<tk-cell-with-image
						v-for="(item,index) of d.returnList"
						:key=index
						:img_src="baseImageURL+item.fileRelatedId" 
						:title="item.goodsName"
						:middle="'规格型号：'+item.goodsModelName" 
						:right_top="item.goodsTypeName"
						:right_bottom="getFormatTime(item.returnDate)"
						:bottom="'归还数量：'+item.num" >
					</tk-cell-with-image>
				</tk-cell-box>
			</pot-scroll>
		</tk-container>
	</div>
</template>

<script>
	
	export default{
		data(){
			return {
				active:-1,
				d:{
					apply:{}
				}
			}
		},
		computed:{
			t(){
				var a=this.d.apply;
				return [{
					key:'申请时间',
					value:a.applyDate
				},{
					key:'预计归还日期',
					value:a.expectedReturn&&a.expectedReturn.substring(0,10)
				},{
					key:'申请单号',
					value:a.applyNumbers
				},{
					key:'申请状态',
					value:['待审批','审批通过','未通过'][a.examineStatus]
				},{
					key:'申领仓库',
					value:a.warehouseName
				}]
			}
		},
		created(){
			this.ajax();
		},
		methods:{
			ajax(){
				this.$http.post('/cs/getApplyXxInfo',{
					applyNumbers:this.$route.query.num
				}).then(d=>{
					this.d=d;
					this.$refs.scroll&&this.$refs.scroll.forceUpdate(true)
				})
			},
			pullDown(){
				console.log(12);
				this.ajax();
				
			},
			tog(){
//				active==index?(active=index):(active=-1)
			},
			getFormatTime(t,onlyDate){
				var time=new Date(t);
				var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
				var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				return a;
			}
		}
	}
</script>
