<style lang="less">
	/*.has_choose-list{
		position:fixed;
		top:50px;
		width:100%;
		bottom:50px;
	}*/
</style>
<template>
	<div class="page-has_choose">
		<pot-header>
			已选物资列表
		</pot-header>
		<pot-container>
			
			<!--<div class="has_choose-list">-->
				<pot-scroll>
					<div v-for="item of selectedList">
						<mh-cell 
							:img_src="baseImageURL+item.fileRelatedId" 
							:title=item.goodsName 
							:middle="item.goodsTypeName" 
							:bottom="'已选：'+item.yx"></mh-cell>
					</div>
				</pot-scroll>
			<!--</div>-->
			<!--<div @click="submit" class="fix-button">
				提交
			</div>-->
		</pot-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				olist:[{
					name:'预计归还日期',
					model:this.getNewTime(),
					selectTime:true
				}]
			}
		},
		computed:{
			selectedList(){
				var list=this.$store.state.list;
				var data=this.$route.query.data;
				var arr=[]
				list.forEach(item=>{
					data.forEach(i=>{
						if(item.goodsModelId==i.goodsModelId){
							arr.push({
								fileRelatedId:item.fileRelatedId,
								goodsName:item.goodsName,
								goodsTypeName:item.goodsTypeName,
								kc:item.kc,
								yx:i.count
							})
						}
					})
				})
				return arr;
			}
		},
		mounted(){
			console.log(this.$route.query.data)
		},
		methods:{
			getNewTime(){
				var time=new Date();
				var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
				var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				return a
			},
			submit(){
				this.$store.dispatch('addApplyFromMobile',{o:this.$route.query.data,yjghrq:this.olist[0].model})
			}
		}
	}
</script>

