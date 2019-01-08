<template>
	<div class="page-my-local">
		<tk-header>我的痕迹</tk-header>
		<tk-container>
			<pot-scroll>
				<tk-cell-three
					:data="{
						title:' asdf',
						time:' asdf',
						content:' asdf'
					}"
					v-for="item,index of list"
					:key=index
					></tk-cell-three>
			</pot-scroll>
		</tk-container>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				list:[]
			}
		},
		//创建时获取历史数据
		created(){
			var uid=this.$store.state.uid;
			var localString=localStorage.getItem(uid)||'{}'
			var myLocal=JSON.parse(localString).myLocal||[];
			console.log(myLocal)
			this.list=myLocal;
		}
	}
</script>

<style>
</style>