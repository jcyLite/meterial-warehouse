<template>
	<div class="page-feed_back">
		<pot-header>
			反馈
		</pot-header>
		<pot-container>
			<tk-upload-photo :withBase64="true" v-model="photos"></tk-upload-photo>
			<tk-button :type="2">
				反馈
			</tk-button>
		</pot-container>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				photos:[]
			}
		},
		
	}
</script>

<style>
</style>