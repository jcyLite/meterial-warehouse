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
		padding-top:25px;
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
	}
</style>
<template>
	<div class="Main">
		<div class="top" :style="{'background':`linear-gradient(rgba(39,138,221,${opacity*0.5}),rgba(0,0,0,0))`}">
			<div @click="chooseHouse" class="left">
				{{house}}
				<span class="icon" :style="{'background-image':`url(${require('@/image/down.png')})`}"></span>
			</div>
			<pot-input type="search" placeholder="请输入物资名称"></pot-input>
			<img :src="require('@/image/close.png')" class="close-icon" />
		</div>
		<pot-scroll :refreshDelay="200" ref="scroll" :listenScroll="true" @pulling-down="pullDown" @scroll="scroll" :options="{
			pullDownRefresh:true,
			pullUpLoad:false
		}">
			<pot-slide ref="slide" :data="items" @change="changePage">
			  <pot-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
			    <!--<a>-->
			      <img :src="item.image">
			    <!--</a>-->
			  </pot-slide-item>
			</pot-slide>
			<div class="middle">
				<div class="nav">
					<div @click="$router.push('/out_manage')">
						<div class="icon">
							80
						</div>
						出库
					</div>
					<div @click="$router.push('in_list')">
						<div class="icon">
							80
						</div>
						入库
					</div>
					<div>
						<div @click="$router.push('/my_apply_list')" class="icon">
							80
						</div>
						我的申领
					</div> 
					<!--<div>
						<div @click="$router.push('/wait_return')" class="icon">
							80
						</div>
						待归还
					</div>
					<div>
						<div @click="$router.push('/has_return')" class="icon">
							80
						</div>
						已归还
					</div> -->
					
				</div>
				<div class="msg">
					你申请的单号2011621626已全部通过审核
				</div>
			</div>
			<div class="container">
				<div class="otitle">
					<div class="icon"></div>
					<span class="left">物资列表</span>
					<!--<div class="more" @click="$router.push('/more')">更多>></div>-->
				</div>
				<div class="list">
					<div v-for="item of $store.state.list" @click="$router.push({
						path:'/detail',
						query:{
							
						}
					})">
						<mh-cell 
							:img_src="baseImageURL+item.fileRelatedId" 
							:title=item.goodsName 
							:middle="item.goodsTypeName" 
							:bottom="'库存：'+item.kc"></mh-cell>
					</div>
					<no-data :data="$store.state.list"></no-data>
				</div>
			</div>
		</pot-scroll>
		<div @click="active=!active" class="main-add">
			
		</div>
		<div @click="$router.push('/daohang')" :class="{active}" class="main-add-daohang">
			
		</div>
		<div @click="toApply" :class="{active}" class="main-add-apply">
			
		</div>
	</div>
</template>

<script>
	export default {
		created(){
			
		},
		computed:{
			col(){
				return 255-this.opacity*255;
			},
			house(){
				return this.$store.getters.warehouseName;
			}
		},
		data(){
			return {
				opacity:0,
				active:false,
				items:[
			        {
			          url: 'http://www.didichuxing.com/',
			          image: require('./Main/1.png')
			        },
			        {
			          url: 'http://www.didichuxing.com/',
			          image: require('./Main/2.png')
			        },
			        {
			          url: 'http://www.didichuxing.com/',
			          image: require('./Main/3.png')
			        }
			    ]
			}
		},
		methods: {
			pullDown(){
				console.log(12121212)
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
		    	var y=-position.y/300;
		    	if(y>1){
		    		this.opacity=1
		    	}else if(y<0){
		    		this.opacity=0
		    	}else {
		    		this.opacity=y;
		    	}
		    },
		    chooseHouse(){
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
		    }
		},
		mounted(){
			window.main=this;
		}
	}
</script>

