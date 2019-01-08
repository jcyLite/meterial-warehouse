<style lang="less">
	.page-examine{
		/*.tk-search{
			top:50px;
			position: fixed;
			width:100%;
		}
		.tk-container{
			top:100px;
		}*/
	}
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
</style>
<template>
	<div class="page-examine">
		<tk-header
			@left-click="$router.push('/')"
			>
			审批管理
		</tk-header>
		
		<tk-container class="tk-container">
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
						}" url="cs/getExamineList">
							<tk-cell-four 
								:key=index 
								:filter="searchTxt"
								@click="$router.push({
								path:'/examine-detail',
								query:{
									applyNumbers:item.applyNumbers,
									id:item.id,
									type:'/need_examine'
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
							status:'1'
						}" url="cs/getExamineList">
							<tk-cell-four :filter="searchTxt" :key=index @click="$router.push({
								path:'/examine-detail',
								query:{
									applyNumbers:item.applyNumbers,
									id:item.id,
									type:'has_examine'
								}
							})" :data="{
								title:'申领单号:'+item.applyNumbers,
								content:'申领单位:'+item.applyDeptName,
								status:$store.state.examineStatus[item.examineStatus],
								colors:$store.state.examineStatusColors[item.examineStatus],
								time:item.applyDate
							}" v-for="item,index of list_2">
							:key=index
							</tk-cell-four>
						</tk-scroll>
					</pot-slide-item>
					<pot-slide-item>
						<tk-scroll :options="{
							pullDown:true,
							pullUp:true
						}" :style="{height:innerHeight-160+'px'}" class="outpouring-scroll" v-model="list_3" :param="{
							uid:$store.state.uid,
							status:'2'
						}" url="cs/getExamineList">
							<tk-cell-four :filter="searchTxt" :key=index @click="$router.push({
								path:'/examine-detail',
								query:{
									applyNumbers:item.applyNumbers,
									id:item.id,
									type:'has_examine'
								}
							})" :data="{
								title:'申领单号:'+item.applyNumbers,
								content:'申领单位:'+item.applyDeptName,
								status:$store.state.examineStatus[item.examineStatus],
								colors:$store.state.examineStatusColors[item.examineStatus],
								time:item.applyDate
							}" v-for="item,index of list_3">
								
							</tk-cell-four>
						</tk-scroll>
					</pot-slide-item>
				</pot-slide>
			</div>
			<!--<tk-search class="tk-search" v-model="searchTxt"></tk-search>
			<tk-scroll :options="{
				pullUp:true,
				pullDown:true
			}" 
			v-model="list" 
			:param="{
				uid:$store.state.uid,
				status
			}" url="cs/getExamineList">
				<tk-cell-four
					:filter="searchTxt"
					@click="$router.push({
						path:'/examine-detail',
						query:{
							applyNumbers:item.applyNumbers,
							type:$route.query.type,
							id:item.id
						}
					})"
					:data="{
						title:'申领单号:'+item.applyNumbers,
						content:'申领单位:'+item.applyDeptName,
						time:item.applyDate,
						status:'审批状态：'+$store.state.examineStatus[item.examineStatus]
					}"
					v-for="item of list"
					:key=item.id
					></tk-cell-four>
			</tk-scroll>-->
		</tk-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[],
				list_2:[],
				list_3:[],
				innerHeight:window.innerHeight,
				page:1,
				size:10,
				searchTxt:'',
				applyNumbers:1,
				canpullUp:true,
				tabLabels: [{
					label: '待审批'
				}, {
					label: '我的审批'
				},{
					label:'全部审批'
				}],
				selectedLabel: ['待审批','我的审批','全部审批'][this.$route.query.page||0]
			}
		},	
		computed:{
			nodata(){
				return !this.canpullUp||this.list.length
			},
			status(){
				var type=this.$route.query.type;
				if(type=='has_examine'){
					return void(0)
				}else{
					return 0;
				}
			},
			initialIndex() {
				let index = 0;
				index = this.findIndex(this.tabLabels, item => item.label === this.selectedLabel)
				return index
			}
		},
		watch:{
			initialIndex(newV){
				this.$router.push({
					path:'/examine',
					query:{
						page:newV
					}
				})
			}
		},
		created(){
			window.examine=this;
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
			},
			ajax(){
				var type=this.$route.query.type,status;
				if(type=='has_examine'){
					status=void(0);
				}else{
					status=0;
				}
				this.$http.post('cs/getExamineList',{
					uid:this.$store.state.uid,
					page:this.page,
					status
				}).then(d=>{
					
					if(this.page==1){
						this.list=d;
					}else{
						if(d.length==0){
							this.canpullUp=false;
						}else{
							this.list=this.list.concat(d);
						}
					}
					this.$refs.scroll.forceUpdate(true);
				})
			},
			pullUp(){
	    		this.page++;
	    		if(this.canpullUp){
	    			
	    			this.ajax();
	    		}else{
	    			this.$refs.scroll.forceUpdate(true);
	    		}
	    		
		    },
		    pullDown(){
	    		this.page=1;
	    		this.canpullUp=true;
	    		this.ajax();
	    		
		    }
		}
	}
</script>
