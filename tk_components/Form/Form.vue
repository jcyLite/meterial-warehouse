<style lang="less">
	.tk-form {
		margin-bottom: 10px;
		overflow: hidden;
		.list {
			background: #fff;
			border-bottom:1px solid #efefef;
			padding-left:13px;
			padding-right:13px;
			display: flex;
			height: 50px;
			line-height: 50px;
			div {
				flex: 1;
				width: 100px;
				text-align:justify;
			}
			input {
				color:#999;
				margin-right:10px;
				text-align: right;
				flex: 1;
				width: 150px;
				background: transparent;
				text-overflow : ellipsis ;
				&::-webkit-input-placeholder{
					color:#999;
				}
			}
			span {
				flex: 0;
				line-height: 50px;
				width: 70px;
				text-align: center;
			}
		}
		.textarea{
			height:200px;
			background:transparent;
			.name{
				line-height: 50px;
				text-align:justify;
			}
			textarea{
				border:none;
				height:300px;
				width:100%;
				font-family:"agency fb";
			}
		}
	}
</style>
<template>
	<div class="tk-form">
		<template v-for="(item,index) of list">
			<div v-if="!item.istextarea" @click="touch(item,index)" class="list" >
				<div>{{item.name}}</div>
				<input :disabled="item.select||item.selectTime||item.selects||item.click||item.selectDate" :placeholder="item.placeholder" type="text" v-model="item.model" />
				<!--<span v-if="item.select||item.selectTime||item.selects||item.click||item.selectDate" class="glyphicon glyphicon-menu-right"></span>-->
				<img v-if="item.select||item.selectTime||item.selects||item.click||item.selectDate" style="width:7px;height:13px;margin-top:18px;" :src="require('./right.png')" alt="" />
			</div>
			<div class="textarea content" v-if="item.istextarea">
				<div class="title">
					<div class="icon"></div>
					<span class="left">{{item.name}}</span>
				</div>
				<textarea :placeholder="item.placeholder" v-model="item.model" name="" rows="" cols="">
					
				</textarea>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'tk-form',
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			}
		},
		beforeDestroy(){
			this.picker=null;
			this.dateTimePicker=null;
		},
		mounted() {
		},
		methods: {
			touch(item,index) {
				item.select&&this.select(item,index);
				item.selectTime&&this.selectTime(item,index);
				item.selectDate&&this.selectTime(item,index,true)
				item.selects&&this.selects(item,index);
				if(item.click){
					item.click()
				}
			},
			selects(item,index){
				if(!this.selects_picker){
					this.selects_picker=[];
				}
				if(!this.selects_picker[index]){
					this.selects_picker[index]=this.$createPotDialog({
						title:item.name+'选择',
						selects:item.selects,
						hasSelect:item.hasSelect,
						type:'selects',
						onConfirm(e,is){
							item.model='已选择'+is.length+'项',
							item.hasSelect=is;
						}
					})
				}
				this.selects_picker[index].show()
			},
			select(item,index){
				if(!this.picker){
					this.picker=[];
				}
				if(!this.picker[index]){
					var column1=[];
					for(var i=0;i<item.select.length;i++){
						column1.push({
							text:item.select[i],
							value:i
						})
					}
					this.picker[index] = this.$createPotPicker({
						title: item.name+'选择',
						data: [column1],
						onSelect(i) {
							item.model=item.select[i]
						}
					})
				}
				this.picker[index].show()
			},
			getFormatTime(time,onlyDate){
				var a=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate());
				var b=time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
				if(onlyDate) return a;
				return a
			},
			selectTime(item,index,onlyDate){
				if(!this.dateTimePicker){
					this.dateTimePicker=[];
				}
				if(!this.dateTimePicker[index]){
					this.dateTimePicker[index] = this.$createPotDatePicker({
				        title: '请选择日期',
				        min: new Date(2008, 7, 8),
				        max: new Date(2020, 9, 20),
				        value: new Date(),
				        columnCount: 3,
				        onSelect:(v)=>{
				        	console.log(v)
				        	item.model=this.getFormatTime(v)
				        }
				    })
				}
				this.dateTimePicker[index].show();
			}
		}
	}
</script>