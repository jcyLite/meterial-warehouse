import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var routerOptions={
	routes:[
		{
			path:'',
			component:()=>import('@/Pages/Main.vue')
		},
		{
			path:'/out_manage',
			component:()=>import('@/Pages/out_manage')
		},
		{
			path:'/out_list',
			component:()=>import('@/Pages/out_list')
		},
		{
			path:'/out_detail',
			component:()=>import("@/Pages/out_detail")
		},
		{
			path:'/sign',
			component:()=>import('@/Pages/sign')
		},
		{
			path:'/in_list',
			component:()=>import('@/Pages/in_list')
		},{
			path:'/apply',
			component:()=>import('@/Pages/apply')
		},
		{
			path:'/wait_return',
			component:()=>import("@/Pages/wait_return")
		},
		{
			path:'/has_return',
			component:()=>import("@/Pages/has_return")
		},
		{
			path:'/msg',
			component:()=>import("@/Pages/msg")
		},
		{
			path:'/detail',
			component:()=>import('@/Pages/detail')
		},
		{
			path:'/more',
			component:()=>import('@/Pages/more')
		},
		{
			path:'/has_choose',
			component:()=>import('@/Pages/has_choose')
		},
		{
			path:'/daohang',
			component:()=>import("@/Pages/daohang")
		},
		{
			path:'/my_apply_list',
			component:()=>import("@/Pages/my_apply_list")
		},
		{
			path:'/my_apply_detail',
			component:()=>import("@/Pages/my_apply_detail")
		},
		{
			path:'/feed_back',
			component:()=>import("@/Pages/feed_back")
		},
		{
			path:'/examine',
			component:()=>import('@/Pages/examine')
		},
		{
			path:'/examine-detail',
			component:()=>import('@/Pages/examine-detail')
		},
		{
			path:'/outpouring',
			component:()=>import('@/Pages/outpouring')
		},
		{
			path:'/outpouring_detail',
			component:()=>import("@/Pages/outpouring_detail")
		},
		{
			path:'/daiguihuan_detail',
			component:()=>import("@/Pages/daiguihuan_detail")
		},
		{
			path:'/chuku',
			component:()=>import('@/Pages/chuku')
		},
		{
			path:'/my_local',
			component:()=>import('@/Pages/my_local')
		},
		{
			path:'/guihuan',
			component:()=>import('@/Pages/guihuan')
		},
		{
			path:'/guihuan-sign',
			component:()=>import('@/Pages/guihuan-sign')
		},
		{
			path:'/feedBack_list',
			component:()=>import('@/Pages/feedBack_list')
		},
		{
			path:'/outpouring_return_list',
			component:()=>import ('@/Pages/outpouring_return_list')
		},
		{
			path:'/outpouring_feedback',
			component:()=>import('@/Pages/outpouring_feedback')
		},
		{
			path:'/wuzi_detail',
			component:()=>import('@/Pages/wuzi_detail')
		}
	]
}
var router=new Router(routerOptions);
window.router=router;
	router.goBack=function(index){
		router.isBack=true;
		if(!index){
			window.history.go(-1)
		}else{
			window.history.go(index)
		}
	}
	document.addEventListener("backbutton",function(){
		var path=router.currentRoute.path;
		if(path=='/'){
			navigator.app.exitApp();
		}else{
			window.history.go(-1)
		}
	}, false);
	export default router;