//js module
import CreateAPI from 'vue-create-api'
//vue component
import MhCell from './MhCell.vue';
import Mhshopping from './Mhshopping.vue';

const components=[
	MhCell
]
const mh={
	install(Vue){
	    //防止重复加载
	  if (mh.install.installed) {
	    return;
	  }
	  mh.install.installed = true;
	  Vue.use(CreateAPI,{componentPrefix: 'mh-'})
	  Vue.createAPI(Mhshopping,['confirm', 'cancel', 'close', 'btn-click', 'link-click']);
	  components.forEach((Component) => {
	   Vue.component(Component.name,Component)
	  })
	}
}
export default mh;