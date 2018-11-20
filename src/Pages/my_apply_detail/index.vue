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
		<pot-header>申请详情</pot-header>
		<pot-container>
			<pot-scroll>
				<tk-detail :list="t"></tk-detail>
				<div v-for="(item,index) of d.applyInfo">
					<mh-cell :key=index @click="(active!=index)?(active=index):(active=-1)"
						:img_src="baseImageURL+item.fileRelatedId" 
						:title="item.goodsName+'-'+item.goodsTypeName"
						:middle="'申请数量：'+item.num" 
						:bottom="'申请备注：'+(item.applyRemark?item.applyRemark:'无')">
						<tk-button @click="$router.push({
							path:'/feed_back'
						})" slot="right" :type="4">
							去反馈
						</tk-button>
					</mh-cell>
					<div v-if="item.applyRemark" class="applyRemark" v-show="active==index">
						{{item.applyRemark}}
					</div>
				</div>
			</pot-scroll>
		</pot-container>
	</div>
</template>

<script>
	
	export default{
		data(){
			return {
				active:-1,
				d:{
					apply:{},
					applyInfo:[]
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
					key:'申请单号',
					value:a.applyNumbers
				},{
					key:'申请状态',
					value:['待审批','审批通过','未通过'][a.examineStatus]
				}]
			}
		},
		created(){
			this.ajax();
		},
		methods:{
			ajax(){
				this.$http.post('/cs/getApplyInfoByNum',{
					num:this.$route.query.num
				}).then(d=>{
					this.d.apply=d.apply;
					this.d.applyInfo=d.applyInfo;
				})
			},
			tog(){
//				active==index?(active=index):(active=-1)
			}
		}
	}
</script>
