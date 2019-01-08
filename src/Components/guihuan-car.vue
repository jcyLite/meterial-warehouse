<style lang="less" scoped>
	.guihuan-car{
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		z-index:100;
		.mh-shopping-mask{
			position:absolute;
			width:100%;
			height:100%;
			background-color:#25262d;
			opacity:.4;
		}
		.mh-dialog-main{
			position:absolute;
			top:0;
			right:0;
			bottom:0;
			left:0;
			background:#fff;
			border-radius:5px;
			width:300px;
			height:200px;
			margin:auto;
		}
		.btns{
			position:absolute;
			bottom:0;
			height:50px;
			display: flex;
			line-height:50px;
			width:100%;
			>div{
				flex:1;
				text-align: center;
			}
		}
		.mh-num{
			display: flex;
			>div:nth-child(1){
				flex:1;
				margin-left:13px;
			}
			>div:nth-child(2){
				flex:2;
			}
		}
	}
	.mh-dialog-fade-enter-active{
		animation: dialog-fadein .4s;
		.mh-dialog-main{
	    	animation: dialog-zoom .4s
	    }
	}
    .mh-dialog-fade-leave{
		animation: dialog-fadeout .4s;
		.mh-dialog-main{
	    	animation: dialog-zoom-leave .4s
	    }
	}
    
      

  @keyframes dialog-fadein{
  	0%{
  		opacity: 0;
  	}
    100%{
    	 opacity: 1;
    }
  }
   @keyframes dialog-fadeout{
  	0%{
  		opacity: 1;
  	}
    100%{
    	 opacity: 0;
    }
  } 
  @keyframes dialog-zoom{
  	0%{
  		transform: scale(0);
  	}
     
    50%{
    	transform: scale(1.1);
    }
    100%{
    	transform: scale(1);
    }
  }
   @keyframes dialog-zoom-leave{
   	0%{
  		transform: scale(1);
  	}
     
    50%{
    	transform: scale(1.1);
    }
    100%{
    	transform: scale(0);
    }
   }
</style>
<template>
	<transition name="mh-dialog-fade">
		<div v-show="isVisible" class="guihuan-car">
			<div @click="maskClick" class="mh-shopping-mask"></div>
			<div class="mh-dialog-main">
				<div class="mh-dialog-container">
					<tk-cell-with-image :img_src="false" :title=item.title :middle=item.spec :bottom="'剩余归还数量：'+item.num">
						<div style="margin-right:20px;" slot="right-top">
							归还数量
						</div>
						<div slot="right-bottom">
							<tk-add-minus 
							:max="item.num" :min="0"
							v-model="num"></tk-add-minus>
						</div>
						
					</tk-cell-with-image>
				</div>
				<div class="btns">
					<div @click="cancel" class="cancel">取消</div>
					<div @click="confirm" class="confirm">确认</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import visibilityMixin from './visibility.js'
	export default {
		 mixins: [visibilityMixin],
		name:'mh-guihuan',
		data(){
			return {
				num:this.model||0,
				content:''
			}
		},
		props:['data','model'],
		computed:{
			item(){
				var data=this.data;
				return {
					img_src:this.baseImageURL+data.icon,
					title:data.goodsName,
					spec:data.goodsModel,
					num:data.num,
					max:data.max,
					min:data.min
				}
			}
		},
		methods:{
			maskClick(){
				console.log(1212)
				this.hide()
			},
			cancel(){
				this.hide();
			},
			confirm(e){
				this.hide();
				this.$emit('confirm', e, {
					num:this.num,
					content:this.content
				})
			}
		}
		
	}
</script>
