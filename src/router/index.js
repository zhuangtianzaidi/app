//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
//引用路由组件
import Home from '@/pages/Home'
//import Search from '@/pages/Search' //使用了路由懒加载
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
//import ShopCart from '@/pages/ShopCart'//使用了路由懒加载
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"

import store from '@/store'

//解决方法  需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;

//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产地第二个参数|第三个参数
        originPush.call(this, location, () => { }, () => { });
    }
}
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
//配置路由
const router = new VueRouter({
    //始终滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { top: 0 };
    },
    routes: [
        {
            path: '/home',
            component: Home,
            meta: { show: true }//路由元信息，路由需要配置自定义对象时，他的key不能乱写
        },
        {
            //路由传递参数： 1. 2.字符串形式 path: '/search/:keyword',
            path: '/search/:keyword?',
            component: () => import('@/pages/Search'), //路由懒加载
            meta: { show: true },
            //第三种对象写法
            name: 'search'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/detail/:skuId',
            component: Detail,
        },
        {
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: { show: true },//路由元信息，路由需要配置自定义对象时，他的key不能乱写
            name: 'AddCartSuccess'
        },
        {
            path: '/shopcart',
            component: () => import('@/pages/ShopCart'),
            meta: { show: true },//路由元信息，路由需要配置自定义对象时，他的key不能乱写
        },
        {
            path: '/trade',
            component: Trade,
            beforeEnter: (to, from, next) => {
                //to：去哪个路由
                //from：从哪个路由而来
                //next：放行函数
                //代表的用户从购物车跳转到交易页面，才放行
                if (from.path == "/shopcart") {
                    next();
                } else {
                    //用户并非从购物车而来  
                    //next(false): 中断当前的导航。
                    //如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                    next(false);
                }
            }
        },
        {
            path: '/pay',
            component: Pay,
            beforeEnter: (to, from, next) => {
                //进入支付页面，必须从交易页面而来
                if (from.path == '/trade') {
                    next();
                } else {
                    next(false);
                }
            }

        },
        {
            path: '/paysuccess',
            component: PaySuccess,

        },
        {
            path: '/center',
            component: Center,
            Center,
            children: [
                //我的订单二级路由
                {
                    path: "myorder",
                    component: () => import('@/pages/Center/myOrder'),
                }
                ,
                {
                    path: 'grouporder',
                    component: () => import('@/pages/Center/groupOrder')
                }
                ,
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        /*  {
             path: '/detail/:skuId',
             component: () => import('@/pages/Detail'),
             meta: { show: true },
         }, */
        //重定向，在项目跑起来时，访问/,立马定向到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
//全局守卫使用:全局守卫它router【VueRouter类的一个实例】的一个方法
//全局守卫【前置守卫:在路由跳转之前会执行一次】
router.beforeEach(async (to, from, next) => {
    //to:要去哪里【路由信息】
    //from:从哪里来【路由信息】
    //next:是一个函数，放行函数
    //1:next()执行不传递参数【放行：该去哪里去哪里】 2:next(path):放行，放行到准确的某一个路由当中   
    //获取仓库中的token,因为如果用户登录了，仓库中一定是有token，用户没有登录，没有token
    let token = store.state.user.token;
    //获取用户信息，通过用户信息有没有进行判断，进行方式
    let name = store.state.user.userInfo.name;
    //用户已经输入用户名+密码登录成---【token】
    if (token) {
        //用户登陆了，且想去登录页的分支
        if (to.path == "/login") {
            next("/home");
            //用户登录了，且想去的不是login的分支  
        } else {
            //代表用户登录了（且去的不是login），而且还有用户信息
            if (name) {
                //next代表该去哪里就去哪里 
                next();
            } else {
                //代表用户登录了，且没有用户信息
                try {
                    //代表用户登录了，但是没有用户信息，发请求让仓库存储用户信息，在进行路由跳转 
                    await store.dispatch('getUserInfo');
                    //该去哪里去哪里
                    next();
                } catch (error) {
                    //token过期失效了:清除本地的token（过期的）
                    await store.dispatch('userLogout');
                    //清除本地数据之后，让用户回到登录页，重新登录、获取新的token
                    next('/login')
                }
            }
        }

    } else {
        //未登录的判断
        //如果用户未登录：去交易页面trade、去支付页面pay、支付成功页面paysuccess、个人中心 center/myorder  center/grouporder
        //用户未登录应该去登录页
        //获取用户未登录想去的路由的路径
        let toPath = to.path;
        //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
        if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
            //判断未登录：去trade、去支付、去支付成功、去个人中心【我的订单、团购订单】
            //跳转到登录页
            next('/login?redirect=' + toPath);
        } else {
            //去的并非上面这些路由,放行
            next();
        }

    }


});



export default router