//先引入mockjs模块
import Mock from 'mockjs'
//把JSON数据格式引进来[JSON数据格式根本没有带外暴露，但是可以引进]
//webpack默认对外暴露的：图片和JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

//mock数据:第一个参数请求地址 第二个参数：请求数据
Mock.mock('/mock/banner', {    //模拟首页大的轮播图的数据
    code: 200, data() {
        return {
            banner
        }
    },
})
Mock.mock('/mock/floor', {
    code: 200, data() {
        return {
            floor
        }
    },
})