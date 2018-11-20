/*嵌入式组件*/
import Basic from './Basic';
import Canvas from './Canvas'
import Form from './Form/Form.vue';
import Scroll from './Scroll'
import Menu from './Menu'
import detail from './detail'
import addMinus from './add-minus'
import uploadPhoto from './upload-photo'
/*挂载组件*/
import Bottom from './Poper/Bottom';
import Tip from './Poper/Tip';
import Voice from './Cordova_Plugin/Voice';
/*引入样式*/
import './Style/Style.less';
function install_component(options){
	for(var key in options){
		var name=key.toLowerCase();
		name=name.replace('_','-');
		this.component('tk-'+name,options[key])
	}
}
const Thank={
  version:1.0,
  install(Vue){
  	install_component.call(Vue,Object.assign(Basic,Canvas,Scroll,Menu));
  	Vue.component('tk-detail',detail)
  	Vue.component('tk-form',Form)
  	Vue.component('tk-add-minus',addMinus)
  	Vue.component('tk-upload-photo',uploadPhoto)
  	Vue.prototype['tk_bottom']=Bottom;
  	Vue.prototype['tk_tip']=Tip;
  	Vue.prototype['tk_voice']=Voice;
  }
}
export default Thank;