//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css";
//引入Vuex仓库模块
import store from '@/store';
//start：进度条开始 done：进度条结束
// console.log(nprogress);

//1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
    //配置对象
    //基础路径，发送请求的时候，路径会出现api 
    baseURL: '/api',
    //代表请求超时的时间5s
    timeout: 5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事

requests.interceptors.request.use((config) => {
    //config:配置对象，对象里有一个属性很重要，header请求头
    //进度条开动
    nprogress.start();
    //通过上行请求的请求头，把用户临时身份带给服务器
    //请求头添加的属性名字不能瞎写，因为已经和后台人员商量好了
    //如果不叫做userTempid字段，服务器获取不到
    //config配置对象，这里面有请求头
    //config，请求拦截器的一个配置对象
    if (store.state.shopcart.userTempId) {
        config.headers.userTempId = store.state.shopcart.userTempId;
    }
    //用户身份token
    if (store.state.user.token) {
        //请求头的这个属性token，和后台老师商量好的了，不能叫做别的名字
        config.headers.token = store.state.user.token;
    }
    return config;
});

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new error('faile'))
})

//对外暴露
export default requests;