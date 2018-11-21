<style lang="less">
	.tk-upload-photo{
		display: flex;
		flex-wrap: wrap;
		.tk-upload-photo-image{
			background-size:cover;
			margin:5px;
		}
		>div{
			width:80px;
			height:80px;
			border:1px solid #ddd;
			border-radius:5px;
			text-align: center;
			line-height:80px;
			font-size:80px;
		}
	}
</style>
<template>
	<div class="tk-upload-photo">
		<div 
			@click="toBigger"
			v-for="item of tkValue" 
			class="tk-upload-photo-image" 
			:style="{
				'background-image':`url(${withBase64?item:('data:image/jpeg;base64,'+item)})`,
				'width':`${innerWidth/4-10}px`,
				'height':`${innerWidth/4-10}px`
			}"></div>
		<div class="tk-upload-photo-image"  @click="image">+</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				tkValue:this.value,
				innerWidth:window.innerWidth
			}
		},
		watch:{
			value(newVal){
				this.tkValue=newVal
			},
			tkValue(newVal){
				this.$emit('input',newVal)
			}
		},
		props:{
			value:{
				type:Array,
				default:()=>[]
			},
			withBase64:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			toBigger(e){
				
			},
			image(){
				var that=this;
				this.choosePic((imageData)=>{ 
					if(this.withBase64){
						this.tkValue.push("data:image/jpeg;base64,"+imageData)
					}else{
						this.tkValue.push(imageData)
					}
				},true)
			},
			mycamera(callback,type){
				function successCallback(imageData){
					callback(imageData);
				}
				function errorCallback(message){
					
				}
				navigator.camera.getPicture(successCallback,errorCallback,{
					quality: 50,
					destinationType:Camera.DestinationType.DATA_URL
				});
			},
			choosePic(callback,type){
				function successCallback(imageData){
					callback(imageData);
				}
				function errorCallback(message){
				}
				navigator.camera.getPicture(successCallback,errorCallback,{
					quality: 50,
					destinationType:Camera.DestinationType.DATA_URL,
					sourceType :Camera.PictureSourceType.SAVEDPHOTOALBUM
				});
			}

		}
	}
</script>

