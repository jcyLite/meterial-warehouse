import Vue from 'vue'
import App from './App.vue'
import createRouter from './Router/createRouter.js'
import createStore from './Store/createStore'
Vue.config.productionTip=false;
export function createApp(){
	const router=createRouter();
	const store=createStore()
	const app=new Vue({
		router,store,render:h=>h(App)
	})
	return {app,router,store}
}
