import Vue from 'vue'
import App from './App.vue'
//三级联动组件--全局组件
import TypeNav from "@/components/TypeNav";
import Carsouel from '@/components/Carsouel/car.vue'
import Pagination from '@/components/Pagination'
//引入elmeui
import { Button, MessageBox } from 'element-ui';

//引入图片懒加载
import VueLazyload from 'vue-lazyload'
import hy from '@/assets/火影.gif'
//引入全部的请求函数
import * as API from '@/api';


//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsouel.name, Carsouel)
Vue.component(Pagination.name, Pagination)
//引入elmeui
Vue.component(Button.name, Button);
//注册图片懒加载
Vue.use(VueLazyload, {
  loading: hy,
})

//注册弹框组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//测试
// import { reqCategoryList } from './api';
import { reqGetSearchInfo } from './api';
// reqCategoryList();
reqGetSearchInfo({})//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
//引入MockServer.js ---mock数据
import '@/mock/mockServe';
//引用swiper样式
import 'swiper/css/swiper.css';
//引入vee-valadiate插件
import VeeValidate from 'vee-validate'
//引入进来的是vee-valadiate提供信息提示【中文的】
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//使用插件
Vue.use(VeeValidate)
//给VeeValidate插件提供【中文提示功能】
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
  },
  //注册：有五个字段：phone、code、password、password1、agree【将来用中文显示，别用英文】
  attributes: { // 给校验的 field 属性名映射中文名称
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议'
  }
})


//这个是vee-valadiate自定义校验规则-->同意复选框先关的
VeeValidate.Validator.extend('agree', {
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})

new Vue({
  render: h => h(App),
  //注册路由：底下写法KV一致省略V
  router,
  //注册仓库：组件实例的身上会多了一个属性$store
  store,
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    //把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取
    //请求函数只需要注册一次，可以在组件当中使用。
    Vue.prototype.$API = API;
  }
}).$mount('#app')
