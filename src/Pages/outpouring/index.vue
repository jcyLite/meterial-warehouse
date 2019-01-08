<style lang="less">
	.pot-tab-bar{
		 background:#fff;
		 height:50px;
		.pot-tab{
			&.pot-tab_active{
				color:#2294FF;
			}
		}
		
		.pot-tab-bar-slider{
			background:#2294FF;
		}
	}
	.outpouring-scroll{
		padding-bottom:300px;
	}
</style>
<template>
	<div clas="page-outpouring">
		<tk-header :options="{
			leftClick:true
		}" @left-click="$router.push('/')">
			出入库
		</tk-header>
		<tk-container>
			<pot-tab-bar v-model="selectedLabel" show-slider :use-transition="false" ref="tabNav" :data="tabLabels">
			</pot-tab-bar>
			<tk-search v-model="searchTxt"></tk-search>
			<div class="tab-slide-container">
				<pot-slide ref="slide" :loop="false" :initial-index="initialIndex" :auto-play="false" :show-dots="false" :options="{
					listenScroll: true,
					probeType: 3,
					directionLockThreshold: 0
				}" @scroll="scroll" @change="changePage">
					<pot-slide-item>
						<tk-scroll :options="{
							pullDown:true,
							pullUp:true
						}" :style="{height:innerHeight-160+'px'}" class="outpouring-scroll" 
							v-model="list" 
						:param="{
							uid:$store.state.uid,
							status:'0'
						}" url="cs/getOutpouringList">
							<tk-cell-four 
								:key=index 
								:filter="searchTxt"
								@click="$router.push({
								path:'/outpouring_detail',
								query:{
									applyNumbers:item.applyNumbers,
									id:item.id,
									type:'churu'
								}
							})" :data="{
								title:'申领单号:'+item.applyNumbers,
								content:'申领单位:'+item.applyDeptName,
								time:item.applyDate
							}" v-for="item,index of list">
								:key="index"
							</tk-cell-four>
					</tk-scroll>
				</pot-slide-item>
					<pot-slide-item>
						<tk-scroll :options="{
							pullDown:true,
							pullUp:true
						}" :style="{height:innerHeight-160+'px'}" class="outpouring-scroll" v-model="list_2" :param="{
							uid:$store.state.uid,
							status:'12'
						}" url="cs/getOutpouringList">
							<tk-cell-four :filter="searchTxt" :key=index @click="$router.push({
								path:'/outpouring_detail',
								query:{
									applyNumbers:item.applyNumbers,
									id:item.id,
									type:'guihuan'
								}
							})" :data="{
								title:'申领单号:'+item.applyNumbers,
								content:'申领单位:'+item.applyDeptName,
								status:$store.state.outpouringStatus[item.outpouringStatus],
								colors:$store.state.outpouringStatusColors[item.outpouringStatus],
								time:item.applyDate
							}" v-for="item,index of list_2">
								
							</tk-cell-four>
						</tk-scroll>
					</pot-slide-item>
					<pot-slide-item>
						<tk-scroll :options="{
							pullDown:true,
							pullUp:true
						}" :style="{height:innerHeight-160+'px'}" class="outpouring-scroll" v-model="list_3" :param="{
							uid:$store.state.uid
						}" url="cs/getOutpouringList">
							<tk-cell-four :filter="searchTxt" :key=index @click="$router.push({
								path:'/outpouring_detail',
								query:{
									applyNumbers:item.applyNumbers,
									id:item.id,
									type:['churu','guihuan','guihuan','guihuan'][item.outpouringStatus]
								}
							})" :data="{
								title:'申领单号:'+item.applyNumbers,
								content:'申领单位:'+item.applyDeptName,
								status:$store.state.outpouringStatus[item.outpouringStatus],
								colors:$store.state.outpouringStatusColors[item.outpouringStatus],
								time:item.applyDate
							}" v-for="item,index of list_3">
								
							</tk-cell-four>
						</tk-scroll>
					</pot-slide-item>
				</pot-slide>
			</div>
		</tk-container>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				searchTxt:'',
				innerHeight:window.innerHeight,
				selectedLabel: ['待出库','待归还','全部纪录'][this.$route.query.page||0],
				tabLabels: [{
					label: '待出库'
				}, {
					label: '待归还'
				},{
					label:'全部纪录'
				}],
				list:[],
				list_2:[],
				list_3:[]
			}
		},
		watch:{
			initialIndex(newV){
				this.$router.push({
					path:'/outpouring',
					query:{
						page:newV
					}
				})
			}
		},
		computed:{
			initialIndex() {
				let index = 0
				index = this.findIndex(this.tabLabels, item => item.label === this.selectedLabel)
				return index
			}
		},
		methods:{
			scroll(pos) {
				const x = Math.abs(pos.x)
				const tabItemWidth = this.$refs.tabNav.$el.clientWidth
				const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
				const deltaX = x / slideScrollerWidth * tabItemWidth
				this.$refs.tabNav.setSliderTransform(deltaX)
			},
			changePage(current) {
				this.selectedLabel = this.tabLabels[current].label
			},
			findIndex(ary, fn) {
				if(ary.findIndex) {
					return ary.findIndex(fn)
				}
				/* istanbul ignore next */
				let index = -1
				/* istanbul ignore next */
				ary.some(function(item, i, ary) {
					const ret = fn.call(this, item, i, ary)
					if(ret) {
						index = i
						return ret
					}
				})
				/* istanbul ignore next */
				return index
			}
		}
	}
</script>

