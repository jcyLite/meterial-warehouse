<style lang="less">
	.list-box {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20px;
		>li {
			flex: 1;
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
			.hasChoosedNum {
				position: absolute;
				top: 0;
				right: 20px;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				color: #fff;
				line-height: 20px;
				font-size: 10px;
				background: red;
			}
		}
	}
	
	.apply-button {
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
	}
</style>
<template>
	<div class="apply">
		<pot-header>
			申领
			<span @click="clearAll" slot="right">
				清空
			</span>
		</pot-header>
		<pot-container style="bottom:50px;">
			<tk-form style="position:fixed;top:50px;width:100%;height:50px;" :list="olist"></tk-form>
			<div style="position:fixed;top:100px;bottom:50px;">
				<pot-scroll-nav ref="scroll" :side="true" :data="data" :current="'混流泵系列'" @change="changeHandler">
					<pot-scroll-nav-panel style="background:#fff;" v-for="(item,i) in $store.getters.apply_list" :key="item.name" :label="item.name" :title="item.name">
						<ul class="list-box">
							<li @click="popshopping(food,index+'-'+i)" v-for="(food,index) in item.list">
								<div>
									<div v-if="hasChoosedNum[food.goodsModelId]" class="hasChoosedNum">
										{{hasChoosedNum[food.goodsModelId]}}
									</div>
									<div class="image" :style="{'background-image':`url(${baseImageURL+food.icon})`}"></div>
									<p>{{food.name}}</p>
									<p>{{food.spec}}</p>
									<p>库存：{{food.num}}台</p>
									<!--<p v-if="hasChoose[food.goodsModelId]">已选：{{hasChoose[food.goodsModelId]&&hasChoose[food.goodsModelId].count}}</p>-->
								</div>
							</li>
						</ul>
					</pot-scroll-nav-panel>
				</pot-scroll-nav>
				<div class="apply-button">
					<div @click="tohasChoose" class="yixuan">
						已选择物资：{{hasChoosed}}条
						<span v-if="hasChoosed">点击查看>></span>
					</div>
					<div @click="submit">提交</div>
				</div>
			</div>
		</pot-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				data: null,
				olist: [{
					name: '预计归还日期',
					model: this.getNewTime(),
					selectTime: true
				}]
			}
		},
		computed: {
			hasChoosedNum(){
				return this.$store.state.hasChoosedNum;
			},
			hasChoosed(){
				var num=0;
				for(var key in this.hasChoosedNum){
					if(this.hasChoosedNum[key]){
						num++
					}
				}
				return num;
			},
			hasChoosedJson() {
				var arr = [];
				var hasChoose=this.$store.state.hasChoose;
				for(var key in hasChoose) {
					arr.push({
						goodsModelId: key,
						count: hasChoose[key].count,
						remark: hasChoose[key].remark
					})
				}
				return arr
			}
		},
		created() {
			window.apply = this;
		},
		methods: {
			tohasChoose(){
				if(this.hasChoosed){
					this.$router.push({
						path:'/has_choose',
						query:{
							data:this.hasChoosedJson
						}
					})
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
				this.$store.state.hasChoosedJson=[];
				this.$store.commit('sethasChoosedNum')
			},
			changeHandler() {},
			getNewTime(){
				var time=new Date();
				var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
				var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				return a
			},
			submit(){
				if(!this.hasChoosed){
					this.$createPotDialog({
						type: 'alert',
						title: '温馨提示',
						content: '你还未选择任何物资',
						icon: 'potic-alert'
					}).show()
				}else{
					this.$store.dispatch('addApplyFromMobile',{
						o:this.hasChoosedJson,
						yjghrq:this.olist[0].model
					})
				}
				
			},
			popshopping(food, index) {
				var that = this;
				console.log(index)
				if(!this[index]) {
					this[index] = this.$createMhShopping({
						data: food,
						onConfirm(e, data) {
							that.hasChoosedNum[food.goodsModelId] = data.num;
							that.$store.state.hasChoose[food.goodsModelId] = {
								count: data.num,
								remark: data.content
							}
						}
					})
				}
				this[index].show();
			}
		}
	}
</script>