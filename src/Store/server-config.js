import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
import Qs from 'qs';
import {encryptByDES,decryptByDES} from '%/encryption/des.js';
Vue.use(VueAxios,axios);
import {Dialog} from '../../pot_components/src/module.js'
const des_key="h1y2i3j4l8";//设置加密协议
const objToStr=(d)=>{//将对象变为字符串
	var str='';
	for(var key in d){
		str+=(key+'='+d[key]+',')
	}
	return str;
}
function Set(url){
	Vue.prototype.baseURL=url+'fxwz/';
	Vue.prototype.baseImageURL=url.substring(0,url.length-1);
	//临时
	axios.defaults.baseURL=url+'fxwz/';;
}
var proxyTable=require('../webpack.config.json').proxy;
//开发环境下，因为设置了跨域代理，所以使用本地ip地址，再webpack.config.json中配置
if(process.env.NODE_ENV==='development'){
	Set("/");
//	Set("/")
}else{
	Set(proxyTable+"/fxwz/")
	
}
axios.defaults.timeout=12000;
axios.defaults.headers={ //设置相应头
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	'Accept': 'application/json, text/plain'
}
axios.defaults.transformRequest=[
	d => { //对发送的数据进行处理
		d = d || {};
		store.state.loadingCount++;
		var str=objToStr(d);
		console.info('%c你加密的值为:'+str,'color:#0ff;background:#000;')
//		return Qs.stringify({
//			para:encodeURIComponent(encryptByDES(str,des_key))
//		});
		return Qs.stringify(d)
	}
];
axios.interceptors.request.use(
	request=>{
		return request
	}
)

axios.interceptors.response.use(
	res=>{
		store.state.loadingCount--;
		console.log('接口：')
		console.log(res.config.url)
		console.log('数据：')
		console.log(res.data)
		if(res.data.msg){
			Dialog.$create({
				type: 'alert',
				title:'系统提示!',
				content:res.data.msg,
				icon: 'potic-alert'
			}).show()
		}
		if(res.data.code!=0){
			console.log( Vue.prototype.$createPotDialog)
			
		}else {
			return res.data.data
		}
	},
	err => {
		store.state.loadingCount--;
		Dialog.$create({
			type: 'alert',
			title:'系统异常提示!',
			content:'服务器异常',
			icon: 'potic-alert'
		}).show()
	}
)
module.exports=axios
