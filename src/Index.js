navigator.splashscreen&&navigator.splashscreen.show();
import './Style';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
//import vConsole from 'vconsole';
//var vconsole=new vConsole();
function createCdv(){
	if(window.navigator.platform!='Win32'){
		var isAndroid=/Android/.test(navigator.userAgent);
		var isIos =/iPhone/.test(navigator.userAgent);
		Vue.prototype.isAndroid=isAndroid;
		Vue.prototype.isIos=isIos;
		var body=document.getElementsByTagName('body')[0];
		var script=document.createElement('script');
		script.type="text/javascript";
		script.charset="GBK";
		if(isIos){
			script.src="./static/cordova-ios/cordova.js";
		}else if(isAndroid){
			script.src="./static/cordova/cordova.js";
		}
		body.appendChild(script);
	}
}
/*
 * ※※※ this part will install some function to vue.prototype
 * ※※※ if you want to use it you can use as a data in a vue component
 * */
import nodata from './Components/nodata.vue'
Vue.component('no-data',nodata)
/*
 * Cube ui has a document in https://didi.github.io/cube-ui/#/zh-CN/docs/introduction
 * if your package.json has not cube-ui
 * you should install it by cnpm i cube-ui --save in commander
 * */
import Pot from '../pot_components'
Vue.use(Pot)
/*
 * use module witch needed will make project more litely
 * */

/*
 * Thank ui has a github in https://
 * */
import Thank from '../tk_components'
Vue.use(Thank)

import mh from './Components';
Vue.use(mh)
new Vue({
	el: '#app',
	router,store,
	mounted(){
		createCdv();
		navigator.splashscreen&&navigator.splashscreen.hide();
	},
	render: h => h(App)
})
