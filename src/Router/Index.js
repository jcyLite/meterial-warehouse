import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var routerOptions={
	routes:[{
		path:'/',
		component:()=>import('@/Pages/Main.vue')
	},{
		path:'/out_manage',
		component:()=>import('@/Pages/out_manage')
	},{
		path:'/out_list',
		component:()=>import('@/Pages/out_list')
	},{
		path:'/out_detail',
		component:()=>import("@/Pages/out_detail")
	},{
		path:'/sign',
		component:()=>import('@/Pages/sign')
	},{
		path:'/in_list',
		component:()=>import('@/Pages/in_list')
	},{
		path:'/apply',
		component:()=>import('@/Pages/apply')
	},{
		path:'/wait_return',
		component:()=>import("@/Pages/wait_return")
	},{
		path:'/has_return',
		component:()=>import("@/Pages/has_return")
	},{
		path:'/msg',
		component:()=>import("@/Pages/msg")
	},{
		path:'/detail',
		component:()=>import('@/Pages/detail')
	},{
		path:'/more',
		component:()=>import('@/Pages/more')
	},{
		path:'/has_choose',
		component:()=>import('@/Pages/has_choose')
	},{
		path:'/daohang',
		component:()=>import("@/Pages/daohang")
	},{
		path:'/my_apply_list',
		component:()=>import("@/Pages/my_apply_list")
	},{
		path:'/my_apply_detail',
		component:()=>import("@/Pages/my_apply_detail")
	},{
		path:'/feed_back',
		component:()=>import("@/Pages/feed_back")
	}]
}
var router=new Router(routerOptions);
	router.goBack=function(index){
		router.isBack=true;
		if(!index){
			window.history.go(-1)
		}else{
			window.history.go(index)
		}
	}
//	document.addEventListener("backbutton",function(){
//		var path=router.currentRoute.path;
//		router.goBack();
//	}, false);
	export default router;