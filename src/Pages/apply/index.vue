<style lang="less">
	.hasChoosedNum {
		position: absolute;
		top: -10px;
		z-index:100;
		right: -10px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		color: #fff;
		line-height: 20px;
		font-size: 10px;
		background: red;
		&:not(.active){
			transition:.3s all;
		}
	}
	.list-box {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20px;
		padding-right:10px;
		.add{
			position:absolute;
			width:30px;
			height:30px;
			background-size:contain;
			right:5px;
			bottom:5px;
			background-image:url('~@/image/add.png');
		}
		.list-box-item{
			margin-top:10px;
			border-radius:3px;
			box-shadow:1px 1px 8px rgba(0,0,0,.2);
			background:#fff;
			padding-top:15px;
			padding-bottom:20px;
			margin-left:10px;
			margin-right:10px;
			width:calc( 50% - 20px );
		}
		>li {
			
			position: relative;
			text-align: center;
			p {
				padding-left: 10px;
				margin-top: 5px;
				text-align: left;
				font-size: 13px;
			}
			margin-bottom:20px;
			.image {
				background-color: #f2f3e1;
				width:calc( 100% - 20px );
				height:90px;
				border-radius: 10px;
				margin-left: 10px;
				background-size: cover;
			}
			
		}
	}
	
	.apply-button {
		z-index:1000;
		position:fixed;
		bottom:0;
		width:100%;
		display: flex;
		>div:first-child {
			position:relative;
			flex: 2;
			margin-right: 1px;
			background:#fff;
			color:#000;
			.hasChoosedNum{
				top:15px;
				right:20px;
			}
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
	.apply{
		.buttons{
			height:40px;
			line-height:40px;
			background:#fff;
			>div{
				&:last-child{
					background:#fcbd3a;
					color:#fff;
				}
			}
		}
	}
	
</style>
<template>
	<div class="apply">
		<tk-header @left-click="$router.goBack">
			申领
			<span @click="$router.push('/my_apply_list')" slot="right">
				我的申领
			</span>
		</tk-header>
		<tk-container style="bottom:50px;">
			<tk-form :list="olist"></tk-form>
			<div style="position:fixed;top:130px;bottom:50px;width:100%;">
				<pot-scroll-nav ref="scroll" :side="true" :data="data" :current="'混流泵系列'" @change="changeHandler">
					<pot-scroll-nav-panel style="background:#fff;" v-for="(item,i) in $store.getters.apply_list" :key="item.name" :label="item.name" :title="item.name">
						<ul class="list-box">
							<li class="list-box-item" @click="popshopping(food,index+'-'+i)" v-for="(food,index) in item.list">
								<div>
									<div 
										:class="{active}"
										style="z-index:10000000;"
										:style="{transform:`translate(${active==food.goodsModelId?movedX:0}px,${active==food.goodsModelId?movedY:0}px)`}"
										@touchend.stop="odelete($event,food.goodsModelId)" 
										@touchstart.stop="odelete($event,food.goodsModelId)" 
										@touchmove.stop="odelete($event,food.goodsModelId)" 
										v-if="hasChoose[food.goodsModelId]&&hasChoose[food.goodsModelId].count" class="hasChoosedNum">
										{{hasChoose[food.goodsModelId].count>99?'99+':hasChoose[food.goodsModelId].count}}
									</div>
									<div class="image" :style="{'background-image':`url(${baseImageURL+food.icon||require('./nodata.png')})`}"></div>
									<p>{{food.name}}</p>
									<p>{{food.spec}}</p>
									
									<p>{{food.num}}{{food.unit}}</p>
									<div @click.stop="add($event,food.goodsModelId,food.num)" class="add"></div>
								</div>
							</li>
						</ul>
					</pot-scroll-nav-panel>
				</pot-scroll-nav>
			</div>
		</tk-container>
		<tk-pop-bottom style="transform: translateY(-50px);" ref="popBottom">
			<tk-cell-with-image 
			:img_src="baseImageURL+item.fileRelatedId" 
			:title=item.goodsName 
			:middle="item.goodsModel" 
			:bottom="'已选：'+item.yx"
			v-for="item,index of selectedList"
			:key=index
			>
				<div slot="right-top">{{item.goodsTypeName}}</div>
				<tk-add-minus :max="item.kc" :min="1" v-model="hasChoose[item.goodsModelId].count" slot="right-bottom"></tk-add-minus>
			</tk-cell-with-image>
		</tk-pop-bottom>
		<div v-if="!choose_from_local_show" class="apply-button">
				<div v-if="hasChoosedNum" @click="tohasChoose" class="yixuan">
					点击查看已选物资
					<div 
						:class="{active}"
						:style="{transform:`translate(${active=='all'?movedX:0}px,${active=='all'?movedY:0}px)`}"
						class="hasChoosedNum"
						@touchend.stop="odelete($event,'all')" 
						@touchstart.stop="odelete($event,'all')" 
						@touchmove.stop="odelete($event,'all')" >
						{{hasChoosedNum}}
					</div>
				</div>
				<div v-if="!hasChoosedNum" class="choose_from_local">
					暂无任何选择
				</div>
				<div :class="{disabled:!this.hasChoosedJson.length||(olist[0].model=='请选择')}" @click="submit">提交</div>
		</div>
		<tk-pop-middle :maskClickAble="false" height="400" ref="popmiddle">
			<tips></tips>
			<div slot="bottom" class="buttons" style="display: flex;">
				<div @click="tipsCancel" style="text-align:center;flex:1">拒绝</div>
				<div @click="tipsConfirm" style="text-align:center;flex:1">我已同意</div>
			</div>
		</tk-pop-middle>
	</div>
</template>

<script>
	import {getFormatTime} from './util.js'
	import tips from './tips.vue';
	export default {
		components:{tips},
		computed: {
			choose_from_local_show(){
				return this.choose_from_local_picker&&this.choose_from_local_picker.isVisible;
			},
			selectedList(){
				var list=this.$store.state.list;
				var data=this.hasChoosedJson;
				var arr=[]
				list.forEach(item=>{
					data.forEach(i=>{
						if(item.goodsModelId==i.goodsModelId){
							arr.push({
								fileRelatedId:item.fileRelatedId,
								goodsName:item.goodsName,
								goodsTypeName:item.goodsTypeName,
								goodsModel:item.goodsModel,
								goodsModelId:item.goodsModelId,
								kc:item.kc,
								yx:i.count
							})
						}
					})
				})
				return arr;
			},
			hasChoosedNum(){
				return this.hasChoosedJson.length;
			},
			hasChoosedJson() {
				var arr = [];
				for(var key in this.hasChoose) {
					if(this.hasChoose[key].count){
						arr.push({
							goodsModelId: key,
							count: this.hasChoose[key].count,
							remark: this.hasChoose[key].remark
						})
					}
				}
				return arr
			}
		},
		mounted(){
			var uid=this.$store.state.uid
			var localString=localStorage.getItem(uid)||"{}";
			var local=JSON.parse(localString);
			if(!local.hasgree){
				this.$refs.popmiddle.show();
			}
		},
		//读取local级的数据到session级
		created() {
			var uid=this.$store.state.uid;
			var warehouseId=this.$store.getters.warehouseId;
			var localString=localStorage.getItem(uid)||"{}";
			var local=JSON.parse(localString)[warehouseId]||{};
//			this.hasChoose=local.hasChoose||{};
			this.hasChoose={};
			this.myLocal=this.getMyLocal();
		},
		//销毁后将session级的数据纪录到local级
		destroyed(){
			var uid=this.$store.state.uid;
			var warehouseId=this.$store.getters.warehouseId;
			var localString=localStorage.getItem(uid)||"{}";
			var local=JSON.parse(localString)||{};
			local[warehouseId]=local[warehouseId]||{};
			local[warehouseId].hasChoose=this.hasChoose;
			localStorage.setItem(uid,JSON.stringify(local));
		},
		data() {
			return {
				hasChoose:{},
				active:false,
				startX:0,
				startY:0,
				movedX:0,
				movedY:0,
				data: null,
				choose_from_local_picker:null,
				olist: [{
					name: '预计归还日期',
					model: '请选择',
					selectTime: true
				}],
				myLocal:[],
			}
		},
		methods: {
			tipsConfirm(){
				this.$refs.popmiddle.hide();
				var uid=this.$store.state.uid
				var localString=localStorage.getItem(uid)||"{}";
				var local=JSON.parse(localString);
				local.hasgree=true;
				localStorage.setItem(uid,JSON.stringify(local));
			},
			tipsCancel(){
				this.$router.push('/')
			},
			getMyLocal(){
				var uid=this.$store.state.uid;
				var warehouseId=this.$store.getters.warehouseId;
				var localString=localStorage.getItem(uid)||"{}";
				var local=JSON.parse(localString)[warehouseId]||{};
				var myLocal=local.myLocal||[];
				return myLocal;
			},
			saveMyLocal(){
				var uid=this.$store.state.uid;
				var warehouseId=this.$store.getters.warehouseId;
				var localString=localStorage.getItem(uid)||"{}";
				var local=JSON.parse(localString);
				var warehouseLocal=local[warehouseId]||{};
				warehouseLocal.myLocal=warehouseLocal.myLocal||[];
				warehouseLocal.myLocal.push({
					applyTime:new Date().getTime(),
					hasChoose:this.hasChoose
				})
				this.myLocal=warehouseLocal.myLocal;
				local[warehouseId]=warehouseLocal;
				localStorage.setItem(uid,JSON.stringify(local));
			},
			clearMyLocal(){
				var uid=this.$store.state.uid;
				var warehouseId=this.$store.getters.warehouseId;
				var localString=localStorage.getItem(uid)||"{}";
				var local=JSON.parse(localString);
				var warehouseLocal=local[warehouseId]||{};
				warehouseLocal.myLocal=[];
				this.myLocal=warehouseLocal.myLocal;
				local[warehouseId]=warehouseLocal;
				localStorage.setItem(uid,JSON.stringify(local));
			},
			odelete(e,goodsModelId){
				this.active=goodsModelId;
				if(e.type=='touchstart'){
					this.startX=e.changedTouches[0].clientX;
					this.startY=e.changedTouches[0].clientY;
				}else if(e.type=='touchmove'){
					this.movedX=e.changedTouches[0].clientX-this.startX;
					this.movedY=e.changedTouches[0].clientY-this.startY;
				}else{
					if(Math.pow(this.movedX,2)+Math.pow(this.movedY,2)>10000){
						if(goodsModelId=='all'){
							this.hasChoose={};
						}else if(goodsModelId=='i'){
							this.clearMyLocal();
						}else{
							this.hasChoose[goodsModelId].count=0;
						}
					}
					this.movedX=0;
					this.movedY=0;
					this.active=false;
				}
			},
			//从历史订单中导入
			choose_from_local(){
				var myLocal=this.getMyLocal();
				if(!myLocal.length){
					this.$createPotDialog({
						type: 'alert',
						title: '温馨提示',
						content: '暂无历史纪录',
						icon: 'potic-alert'
					}).show()
					return;
				};
				var column1=[];
				myLocal.forEach(item=>{
					column1.push({
						text:getFormatTime(new Date(item.applyTime)),
						value:item.hasChoose
					})
				})
				this.choose_from_local_picker = this.$createPotPicker({
					title: '从历史订单中导入',
					data: [column1],
					onSelect:(i)=>{
						this.hasChoose=i[0];
					}
				}).show()
			},
			add(e,goodsModelId,max){
				var a=this.hasChoose;
				a[goodsModelId] = a[goodsModelId]||{
					count: 0,
					remark: ''
				};
				if(a[goodsModelId].count<max){
					a[goodsModelId].count++;
					this.hasChoose=Object.assign({},a);
				}else{
					this.$createPotToast({
				        time: 1000,
				        txt: '已到最大值',
				        type:'warn'
				    }).show()
				}
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
				this.hasChoose={};
				this.$refs.popBottom.hide();
			},
			changeHandler() {},
			getNewTime(){
				var time=new Date();
				var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
				var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				return a+' '+b
			},
			submit(){
				if(!this.hasChoosedJson.length||(this.olist[0].model=='请选择')){
					return;
				}else{
					this.$store.dispatch('addApplyFromMobile',{
						o:this.hasChoosedJson,
						yjghrq:this.olist[0].model,
						success:()=>{
							//清除数据之前，将session中的数据保存到local，记忆功能
							this.saveMyLocal()
							//清除数据
							this.clearAll();
							this.$createPotDialog({
								type: 'confirm',
								title: '温馨提示',
								content: '已提交成功，是否回到首页',
								confirmBtn:{
									text:'确定返回',
									active:true
								},
								cancelBtn:{
									text:'留在本页面',
									active:false
								},
								icon: 'potic-alert',
								onConfirm:()=>{
									this.$router.push('/')
								}
							}).show()
						}
					})
				}
				
			},
			popshopping(food, index) {
				var that = this;
				that.hasChoose[food.goodsModelId]=that.hasChoose[food.goodsModelId]||{};
				var count=that.hasChoose[food.goodsModelId].count||0;
				this[food.goodsModelId] = this.$createMhShopping({
					data: food,
					model:count,
					onConfirm(e, data) {
						var a=that.hasChoose;
						a[food.goodsModelId] = {
							count: data.num,
							remark: data.content
						};
						that.hasChoose=Object.assign({},a);
					}
				})
				this[food.goodsModelId].show();
			}
		}
	}
</script>