<style lang="less">
	.page-my_apply_list{
		.button-group{
			position:absolute;
			bottom:0;
			width:100%;
		}
		.tk-search{
			top:80px;
			position: fixed;
			width:100%;
		}
		.tk-container{
			top:130px;
			background:#f8f8f8;
		}
	}
	
</style>
<template>
	<div class="page-my_apply_list">
		<tk-header>
			我的申领
			<span slot="right" @click="shaixuan">
				筛选
			</span>
		</tk-header>
		<tk-search class="tk-search" v-model="searchTxt">
		</tk-search>
		<tk-container>
			<tk-scroll :options="{
				pullDown:true,
				pullUp:true
			}" v-model="list"
			ref="scroll"
			 :param="param" url="cs/getMyApplys">
				<div @click="$router.push({
						path:'/my_apply_detail',
						query:{
							num:i.danhao,
							id:i.id
						}
					})" v-for="i of list"
					
					> 
					<tk-title>
						申请单号:
						<span style="font-size:13px;">
							<template v-for="(item,index) of i.danhao.split(searchTxt)">
								<span>{{item}}</span>
								<span style="color:rgb(255, 160, 101);margin-left:-4px;" v-if="index!=(i.danhao.split(searchTxt).length-1)">{{searchTxt}}</span>
							</template>
						</span>
						<span slot="right">
							查看详情
							<span class="tk-icon-right"></span>
						</span>
					</tk-title>
					<tk-cell-box :data="i.list"">
						<tk-cell-with-image 
							:filter="searchTxt"
							:key="index" 
							:img_src="baseImageURL+item.fileRelatedId" 
							:title="item.goodsTypeName" 
							:middle="item.goodsModelName" 
							:bottom="'已申领：'+item.num"
							v-for="item,index of i.list"
							></tk-cell-with-image>
					</tk-cell-box>
				</div>
			</tk-scroll>
		</tk-container>
		<tk-pop-right ref="popRight">
			<tk-filter
				style="padding-top:20px;"
				name="筛选">
				<span @click="outpouringStatus=0,rollbackStatus=0,examineStatus=0,warehouse=0" class="right" slot="right">重置</span>
				<tk-filter-item 
					v-model="outpouringStatus"
					:select="['全部','待出库 ','待归还','部分归还','已归还']" 
					name="出库状态">
				</tk-filter-item>
				<tk-filter-item 
					v-model="rollbackStatus" 
					:select="['全部','未撤销','已撤销']" 
					name="撤销状态">
				</tk-filter-item>
				<tk-filter-item 
					v-model="examineStatus" 
					:select="['全部','待审批','审批通过','未通过']" 
					name="审批状态">
				</tk-filter-item>
				<tk-filter-item 
					v-model="warehouse" 
					:select="['全部','当前仓库']" 
					name="仓库选择">
				</tk-filter-item>
			</tk-filter>
		</tk-pop-right>
	</div>
</template>

<script>
	export default {
		methods:{
		   shaixuan(){
		   		this.$refs.popRight.show();
		   		
		   },
		   cptStatus(a,newV){
		   		this.$store.state.status[a]=newV
				this.param[a]=newV-1;
				this.$refs.scroll.page=1;
				this.$refs.scroll.canpullUp=true;
				this.$refs.scroll.ajax();
		   }
		},
		watch:{
			outpouringStatus(newV){
				this.cptStatus('outpouringStatus',newV)
			},
			rollbackStatus(newV){
				this.cptStatus('rollbackStatus',newV)
			},
			examineStatus(newV){
				this.cptStatus('examineStatus',newV)
			},
			warehouse(newV){
				this.$store.state.status['warehouse']=newV
				this.param['warehouseId']=['-1',this.$store.getters.warehouseId][newV];
				this.$refs.scroll.page=1;
				this.$refs.scroll.canpullUp=true;
				this.$refs.scroll.ajax();
			}
		},
		data(){
			return {
				searchTxt:'',
				list:[],
				status:0,
				leibie:0,
				param:{
					uid:this.$store.state.uid,
					warehouseId:'-1'
				},
				outpouringStatus:0,
				rollbackStatus:0,
				examineStatus:0,
				warehouse:0
			}
		}
	}
</script>
