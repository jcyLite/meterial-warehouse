<style lang="less" scoped>
	.list-box {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20px;
		.add{
			position:absolute;
			width:30px;
			height:30px;
			background-size:contain;
			right:25px;
			bottom:-10px;
			background-image:url('~@/image/add.png');
		}
		>li {
			width:50%;
			position: relative;
			text-align: center;
			padding-top: 10px;
			p {
				padding-left: 10px;
				margin-top: 5px;
				text-align: left;
				font-size: 13px;
			}
			margin-bottom:20px;
			.image {
				background-color: green;
				width: 100px;
				height: 100px;
				border-radius: 10px;
				margin-left: 10px;
				background-size: cover;
			}
		}
	}
	
	.apply-button {
		position:fixed;
		width:100%;
		bottom:0;
		height:50px;
		z-index:1000;
		display: flex;
		>div:first-child {
			flex: 2;
			margin-right: 1px;
			background:#fff;
			color:#000;
			span {
				margin-left: 20px;
				font-size: 10px;
				line-height: 10px;
				vertical-align: middle;
			}
		}
		>div {
			flex: 1;
			text-align: center;
			line-height: 50px;
			height: 50px;
			background: #fcbd3a;
			color: #fff;
		}
		>div:last-child{
			&.disabled{
				background:#f7db9d;
			}
		}
	}
</style>
<template>
	<div class="apply">
		<tk-header>
			归还
			<span @click="clearAll" slot="right">
				清空
			</span>
		</tk-header>
		<tk-container style="bottom:50px;">
			<tk-search v-model="searchTxt"></tk-search>
			<pot-scroll>
				<tk-cell-four
					:data="{
						title:'物资名称:'+item.goodsName,
						content:'规格型号:'+item.goodsModelName,
						time:'出库数量：'+item.outpouringNum+' | 已归还数量:'+item.returnNum,
						status:'物资类别：'+item.goodsTypeName
					}"
					:filter="searchTxt"
					@click="popshopping({
						goodsName:item.goodsName,
						goodsModel:item.goodsModelName,
						num:item.outpouringNum-item.returnNum,
						max:item.outpouringNum,	
						min:item.returnNum,
						icon:item.icon
					},index,item)"
					v-for="(item,index) of $route.query.list"
					:key="index"
					></tk-cell-four>
			</pot-scroll>
		</tk-container>
		<div class="apply-button">
			<div v-if="hasChoosedNum" @click="tohasChoose" class="yixuan">
				已选择物资：{{hasChoosedNum}}条
				<span v-if="hasChoosedNum">点击查看<span class="tk-icon-right"></span></span>
			</div>
			<div v-if="!hasChoosedNum" class="yixuan">
				尚未选择
			</div>
			<div :class="{disabled:!this.hasChoosedJson.length}" @click="submit">签字提交</div>
		</div>
		<tk-pop-bottom :style="{transform:`translateY(-50px)`}" ref="popBottom">
			
			<tk-cell-with-image 
			:img_src="baseImageURL+item.fileRelatedId" 
			:title=item.goodsName 
			:middle="item.goodsModel" 
			:bottom="'已选：'+item.yx"
			v-for="item,index of selectedList"
			:key=index
			>
				<div slot="right-top">{{item.goodsTypeName}}</div>
			</tk-cell-with-image>
		</tk-pop-bottom>
	</div>
</template>

<script>
	function getFormatTime(time,onlyDate){
		var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
		var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
		if(onlyDate) return a;
		return a+' '+b
	}
	export default {
		data() {
			return {
				searchTxt:'',
				buttonTxt:'签字提交',
				data: [],
				innerWidth:window.innerWidth,
				page:1,
				translateY:-50,
				basa64_data:'',
				out_in_list:[],
				hasChoose:{},
				olist: [{
					name: '预计归还日期',
					model: this.getNewTime(),
					selectTime: true
				}]
			}
		},
		computed: {
			hasChoosedNum(){
				return this.hasChoosedJson.length;
			},
			hasChoosedJson() {
				var arr = [];
				for(var key in this.hasChoose) {
					arr.push({
						goodsId:key,
						num: this.hasChoose[key].count
					})
				}
				return arr
			},
			selectedList(){
				var list=this.$route.query.list;
				var data=this.hasChoosedJson;
				var arr=[]
				list.forEach(item=>{
					data.forEach(i=>{
						if(item.goodsId==i.goodsId){
							arr.push({
								fileRelatedId:item.fileRelatedId,
								goodsName:item.goodsName,
								id:item.goodsId,
								goodsTypeName:item.goodsTypeName,
								kc:item.kc,
								yx:i.num,
								num:item.num
							})
						}
					})
				})
				return arr;
			}
		},
		created() {
//			this.ajax();
			window.guihuan = this;
		},
		//销毁时保存数据到localStorage
		destroyed(){
			var uid=this.$store.state.uid
			var localString=localStorage.getItem(uid)||"{}";
			var local=JSON.parse(localString);
			local.outLocal=local.outLocal||[];
			local.outLocal.push({
				applyTime:new Date().getTime(),
				hasChoose:this.hasChoose
			})
			localStorage.setItem(uid,JSON.stringify(local));
		},
		methods: {
			choose_from_local(){
				var uid=this.$store.state.uid
				var localString=localStorage.getItem(uid)||"{}";
				var local=JSON.parse(localString);
				var outLocal=local.outLocal||[];
				if(!outLocal.length){
					this.$createPotDialog({
						type: 'alert',
						title: '温馨提示',
						content: '暂无历史纪录',
						icon: 'potic-alert'
					}).show()
					return;
				};
				var column1=[];
				outLocal.forEach(item=>{
					column1.push({
						text:getFormatTime(new Date(item.applyTime)),
						value:item.hasChoose
					})
				})
				this.choose_from_local_picker = this.$createPotPicker({
					title: '从历史订单中导入',
					data: [column1],
					cancelTxt:'清除',
					onCancel:(i)=>{
						outLocal.splice(i[0],1);
						column1.splice(i[0],1);
						if(!column1.length){
							this.choose_from_local_picker.hide();
						}
						local.outLocal=outLocal;
						localStorage.setItem(uid,JSON.stringify(local));
					},
					onSelect:(i)=>{
						this.hasChoose=i[0];
					}
				}).show()
			},
			tohasChoose(){
				if(this.hasChoosedNum){
					this.$refs.popBottom.show();
				}else{
					this.$createPotDialog({
						type: 'alert',
						title: '温馨提示',
						content: '你还未选择任何物资',
						icon: 'potic-alert'
					}).show()
				}
			},
			clearAll(){
				this.hasChoose={}
			},
			changeHandler() {},
			getNewTime(){
				var time=new Date();
				var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
				var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				return a
			},
			submit(){
				if(!this.hasChoosedJson.length){
					return;
				}else{
					this.$router.push({
						path:'/guihuan-sign',
						query:{
							hasChoosedJson:this.hasChoosedJson,
							applyNumbers:this.$route.query.applyNumbers,
							id:this.$route.query.id
						}
					})
				}
				
			},
			popshopping(food, index,item) {
				var that = this;
				console.log(food)
				if(!this[index]) {
					console.log(this)
					this[index] = this.$createMhGuihuan({
						data: food,
						model:0,
						onConfirm(e, data) {
							var goodsId=item.goodsId;
							console.log(data.num)
							if(data.num){
								var options={};
								options[goodsId]={
									count: data.num,
									goodsModelId:item.goodsTypeId,
									identifier:item.goodsIdentifier
								}
								var a=Object.assign({},that.hasChoose,options)
								that.hasChoose=a;
							}
						}
					})
				}
				this[index].show();
			}
		}
	}
</script>