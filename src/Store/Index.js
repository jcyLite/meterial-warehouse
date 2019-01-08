import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
Vue.use(VueAxios,axios);
import Vuex from 'vuex';
Vue.use(Vuex);
import Qs from 'qs';
import {encryptByDES,decryptByDES} from '%/encryption/des.js';

import {Dialog,Toast} from '../../pot_components/src/module.js'
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
var proxyTable=require('../webpack.config.json').proxy.target;
//开发环境下，因为设置了跨域代理，所以使用本地ip地址，再webpack.config.json中配置
if(process.env.NODE_ENV==='development'){
	var localUrl=location.origin;//音频文件下载不可以使用相对路径
	Set(localUrl+"/")
}else{
	Set(proxyTable+"/")
	
}
axios.defaults.timeout=12000;
axios.defaults.headers={ //设置相应头
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	'Accept': 'application/json, text/plain'
}
axios.defaults.transformRequest=[
	d => { //对发送的数据进行处理
		d = d || {};
		d.uid=store.state.uid;
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
			if(res.data.code!=0){
				Toast.$create({
			        time: 1000,
			        txt: res.data.msg,
			        type:'warn'
			    }).show()
			}else{
				Toast.$create({
			        time: 1000,
			        txt: res.data.msg,
			        type:'correct'
			    }).show()
			}
			
		}
		return res.data.data
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


const storeOptions={
	state:{
		status:{
			outpouringStatus:0,
			rollbackStatus:0,
			examineStatus:0,
			warehouse:0
		},
		num:{},
		list:[],
		uid:'',
		examineStatus:['待审批','审批通过','审批不通过'],
		examineStatusColors:['#ff6600','#52c41a','#d9d9d9'],
		outpouringStatus:['待出库','待归还','部分归还','已归还'],
		outpouringStatusColors:['#52c41a','#52c41a','#f05050','#999'],
		loadingCount:0,
		goodsTypeNames:[],
		roleName:'',
		warehouses:[],
		hasChoose:{},
		hasChoosedNum:{},
		warehouse_active:0,
		zuobiao:{},
		username:'username'
	},
	getters:{
		isLoading(state){
			return state.loadingCount!=0;
		},
		hasChoosedJson(state) {
			var arr = [];
			for(var key in state.hasChoose) {
				arr.push({
					goodsModelId: key,
					count: state.hasChoose[key].count,
					remark: state.hasChoose[key].remark
				})
			}
			return arr
		},
		apply_list(state){
			var data=[];
			var list=state.list;
			var goodsTypeNames=state.goodsTypeNames||[];
			goodsTypeNames.forEach(i=>{
				var o={
					name:i,
					list:[]
				}
				list.forEach((item)=>{
					if(item.goodsTypeName==i){
						o.list.push({
							name:item.goodsName,
							spec:item.goodsModel,
							num:item.zb,
							unit:item.unit,
							icon:item.fileRelatedId,
							goodsModelId:item.goodsModelId
						})
					}
				})
				data.push(o)
			})
			return data;
		},
		role(state){
			var role=['admin','fjb','ckgl','slyh'].indexOf(state.roleName);
			return role
		},
		warehouseName(state){
			return state.warehouses[state.warehouse_active]&&state.warehouses[state.warehouse_active]['name']||'';
		},
		warehouseId(state){
			var warehouseId=state.warehouses[state.warehouse_active]&&state.warehouses[state.warehouse_active]['id']
			return warehouseId;
		},
		warehouseItem(state){
			var list=state.warehouses;
			var arr=[];
			state.warehouses.forEach((item,index)=>{
				arr.push({
					text:item.name,
					value:index
				})
			})
			return arr;
		}
	},
	mutations:{
		setUsername(state,username){
			state.username=username
		},
		setXY(state,zuobiao){
			state.zuobiao=zuobiao;
		},
		sethasChoosedNum(state){
			console.log(store.getters.apply_list)
			var hasChoosedNum = {};
			store.getters.apply_list.forEach(item => {
				item.list.forEach(i => {
					hasChoosedNum[i.goodsModelId] = 0;
				})
			})
			store.state.hasChoosedNum = hasChoosedNum;
		},
		setRole(state,roleName){
			state.roleName=roleName
		},
		setList(state,list){
			state.list=list;
		},
		getWarehouses(state,warehouses){
//			if(!warehouses.length){
//				this.$createPotToast({
//			        time: 1000,
//			        txt: '当前用户没有仓库',
//			        type:'warn'
//			    }).show()
//			    state.list=[];
//			}else{
				state.warehouses=warehouses;
//			}
			
		},
		setwarehouse_active(state,active){
			state.warehouse_active=active
		},
		getGoodsTypeNames(state,names){
			state.goodsTypeNames=names
		},
		setMsgNum(state,num){
			state.num=num
		}
	},
	actions:{
		getUserInfo(store,uid){
			axios.post('cs/getUserInfo',{
				uid
			}).then(d=>{
				store.commit('setUsername',d.userName)
				store.commit('setMsgNum',d.num)
				store.commit('setRole',d.role)
				store.commit('getWarehouses',d.warehouses)
			})
		},
		getWuziliebiao(store,wareHouseId){
			var scroll;
			if(typeof wareHouseId!='string'){
				scroll=wareHouseId;
				wareHouseId=store.getters.warehouseId;
			}
			axios.post('cs/getWuziliebiao',{
				wareHouseId
				,uid:store.state.uid
			}).then(d=>{
				scroll&&scroll.forceUpdate(true);
				store.commit('setList',d.list||[]);
				store.commit('setXY',{x:d.lat,y:d.lng})
				store.commit('getGoodsTypeNames',d.names)
				store.commit('sethasChoosedNum')
			})
		},
		addApplyFromMobile(store,{o,yjghrq,success}){
			var wareHouseId=store.getters.warehouseId;
			var uid=store.state.uid;
			var data=JSON.stringify(o);
			axios.post('cs/addApplyFromMobile',{
				wareHouseId,uid,data,yjghrq
			}).then(d=>{
				store.state.hasChoosedJson=[];
				store.commit('sethasChoosedNum');
				success()
			})
		}
	}
}
export {storeOptions};
const store=new Vuex.Store(storeOptions)
window.store=store;
export default store
