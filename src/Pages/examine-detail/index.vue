<style lang="less">
</style>
<template>
	<div class="page-examine-detail">
		<tk-header>
			详情
		</tk-header>
		<tk-container :style="{'padding-bottom':$route.query.type?0:'50px'}">
			<pot-scroll :scrollEvents="['scroll']" ref="scroll">
				<tk-title>申领详情</tk-title>
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
					}].concat(d.approvalRemark?[{
						key:'审核备注',
						value:d.approvalRemark
					}]:[])"
					></tk-detail>
				<tk-title>申领列表</tk-title>
				<tk-cell-four
					:data="{
						title:'物资名称:'+item.goodsName,
						content:'规格型号:'+item.goodsModelName,
						time:'申领数量：'+item.num,
						status:'物资类别：'+item.goodsTypeName
					}"
					v-for="item,index of d.applyInfoList" 
					:key="index"
				></tk-cell-four>
				<template v-if="$route.query.type!='has_examine'">
					<tk-title >填写表单</tk-title>
					<tk-textarea 
						placeholder="请输入审核内容" 
						v-model="content" 
						@focus="focus"
						maxlength="200" 
						name="备注">
					</tk-textarea>
					<tk-switch 
						style="margin-bottom:50px;"
						name="是否通过" 
						v-model="v">
					</tk-switch>
				</template>
				
			</pot-scroll>
			<tk-button @click="submit" :type="2" v-if="$route.query.type!='has_examine'">审批</tk-button>
			
		</tk-container>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				d:{},
				v:true,
				content:''
			}
		},
		computed:{
			examineStatus(){
				return this.v?1:2
			}
		},
		created(){
			this.ajax();
		},
		methods:{
			ajax(){
				this.$http.post('cs/getExamineInfo',{
					applyNumbers:this.$route.query.applyNumbers
				}).then(d=>{
					this.d=d;
				})
			},
			focus(){
//				var y=this.$refs.scroll.scroll.y;
				console.log(this.$refs.scroll)
				var scrollerHeight=this.$refs.scroll.scroll.scrollerHeight;
				var wrapperHeight=this.$refs.scroll.scroll.wrapperHeight;
				this.$refs.scroll.scrollTo(0,-250-scrollerHeight+wrapperHeight)
			},
			ajax_2(){
				this.$http.post('cs/examine',{
					id:this.$route.query.id,
					uid:this.$store.state.uid,
					approvalRemark:this.content,
					examineStatus:this.examineStatus
				}).then(d=>{
					setTimeout(()=>{
		    			this.$router.push({
		    				path:'/examine',
		    				query:{
		    					page:1
		    				}
		    			})
		    		},1000)
				})
			},
			popConfirm(){
				var str=this.v?'通过':'不通过';
				this.$createPotDialog({
					type: 'confirm',
					title: '温馨提示',
					content:'你确定审核结果为'+str+'吗？',
					icon: 'potic-alert',
					onConfirm:()=>{
						this.ajax_2()
					}
				}).show()
			},
			submit(){
				var str=this.v?'通过':'不通过';
				if(!this.content){
					this.$createPotDialog({
						type: 'confirm',
						title: '温馨提示',
						content:'尚未输入审核内容，是否填写内容为'+str,
						icon: 'potic-alert',
						onConfirm:()=>{
							this.content=str;
							this.popConfirm()
						}
					}).show()
				}else{
					this.popConfirm()
				}
			}
		}
	}
</script>
