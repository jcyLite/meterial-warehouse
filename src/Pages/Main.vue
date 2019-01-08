<style lang="less">
	.circle{
		border-radius:50%;
	}
	body{
		font-family:'DIN_MED' !important;
		background:#f8f8f8;
	}
	.top{
		display: flex;
		position:absolute;
		width:100%;
		color:#fff;
		padding-top:35px;
		z-index:2;
		padding-bottom:10px;
		>.left{
			flex:1;
			line-height:30px;
			padding-left:10px;
			height:30px;
			width:90px;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			position:relative;
			.icon{
				width:14px;
				height:8px;
				background-size:contain;
				background-repeat: no-repeat;
				position:absolute;
				display: block;
				right:-1px;
				top:11px;
			}
		}
		.pot-input{
			flex:2;
			height:32px;
			font-size:12px;
			width:221px;
			margin-left:6px;
			border-radius:20px;
			overflow: hidden;
			padding-left:10px;
		}
		.close-icon{
			height:45px;
			transform: translateY(-8px);
			margin-left:10px;
			border-top-left-radius: 16px;
			border-bottom-left-radius: 16px;
		}
	}
	.top-box{
		position:relative;
		.roleName{
			position:absolute;
			right:10px;
			color:#fff;
			font-size:16px;
			bottom:40px;
			img{
				width:20px;
				height:20px;
				vertical-align: middle;
			}
		}
	}
	
	.Main{
		bottom:0;
		position:fixed;
		left:0;
		top:0;
		right:0;
		.pot-scroll-wrapper{
			height:100%;
			.pot-scroll-list-wrapper{
				.container{
					
				}
				>.middle{
					height:100px;
					position:relative;
					background:#fff;
					margin-top:-20px;
					z-index:10;
					margin-left:15px;
					margin-right:15px;
					border-radius:14px;
					.msg{
						border-top:1px solid #e5e5e5;
						line-height:32px;
						margin-left:25px;
						margin-right:25px;
						font-size:12px;
						color:#999;
						&::before{
							margin-right:5px;
							transform: translateY(-2px);
							content:' ';
							width:15px;
							height:13px;
							vertical-align: middle;
							display: inline-block;
							background-image:url("~@/image/message.png");
							background-size:cover;
						}
					}
					
					.nav{
						color:#999;
						height:67px;
						display: flex;
						font-size:12px;
						>div{
							flex:1;
							text-align: center;
						}
						
						.icon{
							font-size:20px;
							color:#000;
							text-align: center;
							border-radius:10px;
							margin-top:17px;
							margin-bottom:8px; 
						}
						.circle{
							margin-top:30px;
							margin-left:8px;
							border:1px solid #ddd;
							width:50px;
							line-height:50px;
							font-size:50px;
							color:#ddd;
							height:50px;
						}
					}
				}
			}
		}
		.pot-slide{
			width:100%;
			height:220px;
			border-bottom:1px solid #ddd;
			img{
				width:100%;
				height:100%;
			}
		}
		.pot-slide-dots{
			height:30px;
			span{
				height:5px;
				border-radius:2.5px;
				width:10px;
				margin-right:10px;
				display: inline-block;
				&.active{
					width:50px;
					background:#fff;
				}
			}
		}
		.main-add,.main-add-daohang,.main-add-apply{
			position:fixed;
			right:29px;
			bottom:43px;
			width:53px;
			height:53px;
			transition:.3s all;
			border-radius:50%;
			background-size:cover;
		}
		.main-add{
			background-image:url('~@/image/add.png');
			z-index: 1000;
		}
		.main-add-daohang{
			background-image:url('~@/image/pos.png');
			z-index: 999;
			&.active{
				bottom:103px;
			}
		}
		.main-add-apply{
			background-image:url('~@/image/new.png');
			z-index: 998;
			&.active{
				bottom:163px;
			}
		}
		.main-add-list{
			
		}
	}
</style>
<template>
	<div class="Main">
		<div class="top" :style="{'background':`rgba(39,138,221,${col}`}">
			<div @click="chooseHouse" class="left">
				{{house?house:'暂无数据'}}
				<span class="icon" :style="{'background-image':`url(${require('@/image/down.png')})`}"></span>
			</div>
			<pot-input v-model="searchTxt" type="search" placeholder="请输入物资名称"></pot-input>
			<img @click="closeApp" :src="require('@/image/mclose.png')" class="close-icon" />
		</div>
		<pot-scroll 
			@scroll-end="active=true"
			:refreshDelay="200" 
			ref="scroll" 
			:scrollEvents="['before-scroll-start','scroll-end','scroll']" @pulling-down="pullDown" @scroll="scroll" :options="{
			pullDownRefresh:true,
			pullUpLoad:false
		}">
			<div class="top-box">
				<pot-slide ref="slide" :data="items" @change="changePage">
				  <pot-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
				    <!--<a>-->
				      <img :src="item.image">
				    <!--</a>-->
				  </pot-slide-item>
				</pot-slide>
				<div class="roleName">
					<img :src="require('@/image/mine.png')" alt="" />
					{{$store.state.username}}</div>
			</div>
			
			<div v-if="$store.state.roleName!='slyh'" style="height:80px;"  class="middle">
				<div  class="nav">
					<div v-if="$store.state.roleName!='fjb'&&$store.state.roleName!='slyh'" @click="$router.push('/outpouring')">
						<div class="icon">
							{{$store.state.num&&$store.state.num.out||0}}
						</div>
						出入库管理
					</div>
					<div v-if="$store.state.roleName=='admin'||$store.state.roleName=='fjb'" @click="$router.push('/examine')">
						<div class="icon">
							{{$store.state.num&&$store.state.num.dsp||0}}
						</div>
						审批管理
					</div>
					<div v-if="$store.state.roleName!='slyh'" @click="$router.push('/my_apply_list')">
						<div class="icon">
							{{$store.state.num&&$store.state.num.apply||0}}
						</div>
						我的申领
					</div> 
					
					<!--<div v-if="$store.state.roleName=='admin'||$store.state.roleName=='fjb'" @click="$router.push({
						path:'/examine',
						query:{
							type:'has_examine'
						}
					})">
						<div class="icon">
							{{$store.state.num&&$store.state.num.ysp||0}}
						</div>
						已审批
					</div>-->
					<!--app记忆功能--> 
			</div>
			</div>
			<div class="container">
				<div class="otitle">
					<div class="icon"></div>
					<span class="left">{{house}}</span>
					<!--<div class="more" @click="$router.push('/more')">更多>></div>-->
				</div>
				<div class="list">
					<div 
						@click="toDetail(item)"
						v-for="item of $store.state.list" 
					>
						<tk-cell-with-image
							:filter="searchTxt"
							:img_src="baseImageURL+item.fileRelatedId" 
							:title=item.goodsName 
							:middle="item.goodsModel" 
							:bottom="'在备：'+item.zb"
							:right_top="item.goodsTypeName"
							></tk-cell-with-image>
					</div>
					<no-data :data="$store.state.list"></no-data>
				</div>
			</div>
		</pot-scroll>
		<div @click="active=!active" class="main-add">
			
		</div>
		<div @click="daohang" :class="{active}" class="main-add-daohang">
			
		</div>
		<div @click="toApply" :class="{active}" class="main-add-apply">
			
		</div>
		<!--<mh-user-change @click="$refs.popMiddle.show()"></mh-user-change>-->
	</div>
</template>

<script>
	import login from './login.vue';
	export default {
		components:{login},
		data(){
			return {}
		},
		created(){
			if(this.$store.state.uid){
				this.$store.dispatch('getUserInfo',this.$store.state.uid);
			}
		},
		watch:{
			uid(newV){
				this.$store.dispatch('getUserInfo',newV);
			}
		},
		computed:{
			uid(){
				return this.$store.state.uid;
			},
			col(){
				return this.opacity;
			},
			house(){
				return this.$store.getters.warehouseName;
			}
		},
		data(){
			return {
				searchTxt:'',
				opacity:0,
				positionY:0,
				active:true,
				items:[
			        {
			          url: 'http://www.didichuxing.com/',
			          image: require('@/image/banner01.png')
			        },
			        {
			          url: 'http://www.didichuxing.com/',
			          image: require('@/image/banner02.png')
			        },
			        {
			          url: 'http://www.didichuxing.com/',
			          image: require('@/image/banner03.png')
			        }
			    ]
			}
		},
		methods: {
			loginConfirm($event,code){
				if(!code){
					this.$refs.popMiddle.hide();
				}else{
					this.$refs.popMiddle.shock();
				}
			},
			toDetail(data){
				
				this.$router.push({
					path:'/wuzi_detail',
					query:{
						data
					}
				})
			},
			closeApp(){
				console.log(222);
				console.log(navigator.userAgent)
//				console.log(Cordova);
				if(this.isIos){
					Cordova.exec(function(){}, function(){}, "WZCKEXITPlugin", "myMethod", ["退出物资仓库"]);
				}
				if(this.isAndroid){
					navigator.app.exitApp();
				}
//var isTouch = /Android|iPhone|SymbianOS|Windows Phone|iPad|iPod/.test(navigator.userAgent);
			
				console.log(navigator);
//				Cordova.exec(function(){}, function(){}, "WZCKEXITPlugin", "myMethod", ["退出物资仓库"]);
//				navigator.app.exitApp();
			},
			pullDown(){
				if(this.$store.state.uid){
					this.$store.dispatch('getUserInfo',this.$store.state.uid);
				}
				this.$store.dispatch('getWuziliebiao',this.$refs.scroll)
//				setTimeout(()=>{
//					this.$refs.scroll.forceUpdate(true);
//				},1000)
			},
			toApply(){
				if(this.$store.state.list&&this.$store.state.list.length){
					this.$router.push('/apply')
				}else{
					this.$createPotDialog({
						type: 'alert',
						title: '温馨提示',
						content: '该仓库无物资',
						icon: 'potic-alert'
					}).show()
				}
			},
		    changePage(current) {
		    },
		    clickHandler(item, index) {
		    },
		    scroll(position){
		    	this.active=false;
		    	var y=-position.y/100;
		    	this.positionY=y;
		    	if(y>1){
		    		this.opacity=1
		    	}else if(y<0){
		    		this.opacity=0
		    	}else {
		    		this.opacity=y;
		    	}
		    },
		    chooseHouse(){
		    	if(!this.house){
		    		this.$createPotDialog({
						type: 'alert',
						title: '温馨提示',
						content: '暂无数据',
						icon: 'potic-alert'
					}).show()
		    		return;
		    	}
		    	if(!this.picker){
		    		this.picker=this.$createPotPicker({
						title:'仓库选择',
						data:[this.$store.getters.warehouseItem],
						onSelect:(indexs)=>{
							this.$store.commit('setwarehouse_active',indexs[0])
						}
					})
		    	}
		    	this.picker.show()
		    },
		    daohang(){
		    	var x=parseFloat(this.$store.state.zuobiao.x);
		    	var y=parseFloat(this.$store.state.zuobiao.y);
		    	if(this.isAndroid){
		    		window._cordovaNative.startNavi(x,y);
		    	}
		    	if(this.isIos){
		    		Cordova.exec(function(){},function(){}, "WZCKNavPlugin", "myMethod", ["导航",x,y,this.house]);
		    	}
		    	
		    }
		},
		mounted(){
			if(!this.$store.state.uid){
				var username=location.href.substring(location.href.indexOf('=')+1,location.href.indexOf('#'))
				var devtest=username.indexOf('http')
				if(!username||(devtest!=-1)){
					this.$refs.popMiddle.show();
				}else{
					this.$http.post('cs/login',{
						userId:username,
						pwd:'qaz123!@#'
					}).then(d=>{
						this.$store.state.uid=d;
					})
				}
			}
		}
	}
</script>

