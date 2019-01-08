//js module
import CreateAPI from 'vue-create-api'
//vue component
import Mhshopping from './Mhshopping.vue';
import mhGuiHuan from './guihuan-car.vue';
import mhCar from './mh-car.vue'
import userChange from './user-change.vue'
const mh={
	install(Vue){
	    //防止重复加载
	  if (mh.install.installed) {
	    return;
	  }
	  mh.install.installed = true;
	  Vue.use(CreateAPI,{componentPrefix: 'mh-'})
	  Vue.createAPI(Mhshopping,['confirm', 'cancel', 'close', 'btn-click', 'link-click']);
	  Vue.createAPI(mhCar,['confirm','cancel','close', 'btn-click', 'link-click'])
	  Vue.createAPI(mhGuiHuan,['confirm','cancel','close', 'btn-click', 'link-click'])
	  Vue.component('mh-user-change',userChange)
	}
}
export default mh;