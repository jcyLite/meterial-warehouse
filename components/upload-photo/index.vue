<style lang="less">
	.tk-upload-photo{
		display: flex;
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
		<div v-for="item of img_list" :style="{'background-image':`url(${item})`}"></div>
		<div @click="image">+</div>
	</div>
</template>

<script>
	
	export default {
		data(){
			return {
				img_list:[]
			}
		},
		methods:{
			image(){
				var that=this;
				this.choosePic((imageData)=>{
					alert(1);
					this.img_list.push(imageData)
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
					destinationType:type?Camera.DestinationType.DATA_URL:Camera.DestinationType.FILE_UR
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
					destinationType: type?Camera.DestinationType.DATA_URL:Camera.DestinationType.FILE_UR,
					sourceType :Camera.PictureSourceType.SAVEDPHOTOALBUM
				});
			}

		}
	}
</script>

