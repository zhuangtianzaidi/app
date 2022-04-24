//当前这个模块：API进行统一管理
//引入二次封装的axios
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动接口
///api/product/getBaseCategoryList GET 无参数
//发请求:axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
// return requests({ url: '/product/getBaseCategoryList', method: 'get' });
//
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });
//获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });
//获取搜索模块数据 地址：/api/list 请求方式：post 参数：需要带参数
//当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });

// 获取商品详情
export const reqGetDetailInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });
// export const reqDetailList = (skuId)=>request({url:`/item/${skuId}`,method:'get'});
//加入购物车 /api/cart/addToCart/{ skuId }/{ skuNum }  注意别加{}
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
//获取购物车的数据
export const reqShopCartList = () => requests({ url: '/cart/cartList', method: 'get' })
//删除购物车某一个产品的接口
///api/cart/deleteCart/{skuId}  delete 
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
// /api/cart/addToCart/{ skuId }/{ skuNum }
//修改某一个产品的选中状态接口
//api/cart/checkCart/{skuId}/{isChecked}  get 
//需要注意：从文档拷贝过来路径skuId小写的
export const reqUpdateCartChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });


//用户获取到验证码的接口
///api/user/passport/sendCode/{phone}  get 
export const reqCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册用户接口
//api/user/passport/register  post  phone code password
export const reqRegister = (phone, code, password) => requests({ url: '/user/passport/register', data: { phone, code, password }, method: "post" })
//登录接口
///api/user/passport/login  post phone password
export const reqLogin = (phone, password) => requests({ url: `/user/passport/login`, method: 'post', data: { phone, password } });
//获取用户信息的接口
//api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });
//退出登录的接口【通知服务器销毁当前token身份】
///api/user/passport/logout  get 
export const reqLogout = () => requests({ url: `/user/passport/logout`, method: 'get' });

//获取用户地址信息
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });

//获取购物清单
export const reqShopCartInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

//提交订单的接口
///api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });


//获取支付信息
///api/payment/weixin/createNative/{orderId}  get
export const reqOrderPay = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });



//判断用户是否支付成功
///api/payment/weixin/queryPayStatus/{orderId}  get
export const reqOrderStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });



//获取用户订单列表数据
///api/order/auth/{page}/{limit}   get
//page:代表当前第几页
//limit：代表的是每一页多少条数据

export const reqMyList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
