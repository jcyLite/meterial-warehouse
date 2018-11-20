import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from './server-config.js';
import {Dialog} from '../../pot_components/src/module.js'
const storeOptions={
	state:{
		list:[],
		uid:'',
		loadingCount:0,
		goodsTypeNames:[],
		roleName:'',
		warehouses:[],
		hasChoose:{},
		hasChoosedNum:{},
		warehouse_active:0
	},
	getters:{
		isLoading(state){
			return state.loadingCount!=0;
		},
		apply_list(state){
			var data=[];
			var list=state.list;
			var goodsTypeNames=state.goodsTypeNames;
			goodsTypeNames.forEach(i=>{
				var o={
					name:i,
					list:[]
				}
				list.forEach((item)=>{
					if(item.goodsTypeName==i){
						o.list.push({
							name:item.goodsName,
							spec:"混流泵系列 5寸",
							num:5,
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
			var role=['admin'].indexOf(state.roleName)
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
	watchGetters:{
		warehouseId(newV){
			this.$store.dispatch('getWuziliebiao',newV)
		},
		isLoading(newV){
			console.log(newV)
			if(newV){
				this.toast=this.$createPotToast({
		          txt: 'Loading...',
		          time:0
		        }).show()
			}else{
				this.toast&&this.toast.hide();
			}
		}
	},
	mutations:{
		setUid(state,uid){
			state.uid=uid
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
			console.log('888888888888')
			state.list=list;
		},
		getWarehouses(state,warehouses){
			state.warehouses=warehouses;
		},
		setwarehouse_active(state,active){
			state.warehouse_active=active
		},
		getGoodsTypeNames(state,names){
			state.goodsTypeNames=names
		}
	},
	actions:{
		getUserInfo(store,uid){
			axios.post('cs/getUserInfo',{
				uid
			}).then(d=>{
				store.commit('setRole',d.role)
				store.commit('setUid',uid)
				store.commit('getWarehouses',d.warehouses)
			})
		},
		getWuziliebiao(store,wareHouseId){
			console.log(1212)
			var scroll;
			if(typeof wareHouseId!='string'){
				scroll=wareHouseId;
				wareHouseId=store.getters.warehouseId;
			}
			axios.post('cs/getWuziliebiao',{
				wareHouseId
			}).then(d=>{
				scroll&&scroll.forceUpdate(true);
				store.commit('setList',d.list)
				store.commit('getGoodsTypeNames',d.names)
				store.commit('sethasChoosedNum')
			})
		},
		addApplyFromMobile(store,{o,yjghrq}){
			var wareHouseId=store.getters.warehouseId;
			var uid=store.state.uid;
			var data=JSON.stringify(o);
			axios.post('cs/addApplyFromMobile',{
				wareHouseId,uid,data,yjghrq
			}).then(d=>{
				store.state.hasChoosedJson=[];
				store.commit('sethasChoosedNum')
				Dialog.$create({
					type: 'alert',
					title: '温馨提示',
					content: '提交成功',
					icon: 'potic-alert'
				}).show()
			})
		}
	}
}
export {storeOptions}; 
const store=new Vuex.Store(storeOptions)
window.store=store;
export default store