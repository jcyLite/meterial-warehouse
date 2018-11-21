<style lang="less">
	.tk-add-minus{
		height:40px;
		width:300px;
		>*{
			float:left;
		}
		>div,>svg{
			width:20px;
			height:20px;
			background-size:cover;
			border-radius:10px;
			text-align:center;
			font-size:30px;
			line-height:15px;
			color:#ddd;
			padding:0;
		}
		>input{
			border-radius: 5px;
			height:20px;
			line-height: 20px;
			border:1px solid #ddd;
			margin-left:10px;
			margin-right:10px;
			width:50px;
			text-align: center;
		}
	}
</style>
<template>
	<div class="tk-add-minus">
		<div @click="tkValue>min&&tkValue--" :style="{'background-image':`url(${require('./minus.svg')})`}"></div>
		<input disabled :max="max" :min="min" @change="change" type="number" v-model="tkValue"/>
		<div @click="tkValue<max&&tkValue++" :style="{'background-image':`url(${require('./add.svg')})`}"></div>
	</div>
</template>

<script>
	export default {
		name:'tk-add-minusc',
		props:['value','max','min'],
		data(){
			return {
				tkValue:this.value
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
		methods:{
			change(){
				if(this.tkValue<this.min){
					this.tkValue=this.min
				}else if(this.tkValue>this.max){
					this.tkValue=this.max
				}
			}
		},
		mounted(){
			
		}
	}
</script>
