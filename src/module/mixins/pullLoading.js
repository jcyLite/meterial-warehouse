function listPost(){
	var postData=this.pullLoadingData.postData;
	var postURL=this.pullLoadingData.postURL;
	console.log('sdfsdf'+this.page);
	this.$http.post(postURL,Object.assign(postData,{page:this.page})).then(d=>{
		if(this.page==1){
			this.pullLoadingData.list=d;
		}else{
			if(d.length==0){
				this.canpullUp=false;
			}else{
				this.pullLoadingData.list=this.pullLoadingData.list.concat(d);
			}
		}
	})
}
function pullUp(){
	this.page++;
	if(this.canpullUp){
		this.listPost();
	}
	this.$refs.scroll.forceUpdate(true);
}
function pullDown(){
	this.page=1;
	this.canpullUp=true;
	this.listPost();
	setTimeout(()=>{
		this.$refs.scroll.forceUpdate(true);
	},2000)
}
const pullLoading={
	data(){
		return {
			page:1,
			canpullUp:true
		}
	},
	methods:{
		listPost,
		pullUp,
	    pullDown,
	}
}
const pullDownLoading={
	methods:{
		pullDown
	}
}
export default pullLoading;