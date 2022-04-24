import { reqCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
const state = {
    phonenumber: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
}
const mutations = {
    VERIFICATION(state, phonenumber) {
        state.phonenumber = phonenumber
    },
    TOKENN(state, token) {
        state.token = token
    },
    //存储用户信息
    GETUSERINGO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //退出登录情况全部用户信息
    USERLOGOUT(state) {
        state.token = '';
        state.userInfo = {};
        //本地存储数据【token】
        localStorage.removeItem('TOKEN');
    }
}
const actions = {
    //获取验证码
    async verification({ commit }, { phone }) {
        let result = await reqCode(phone)
        //前端工程师：没有能力把验证码发到用户手机上的功能
        //务必、一定是是后台人员实现的
        if (result.code == 200) {
            commit('VERIFICATION', result.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('faiile'))
        }

    },
    //用户注册
    async registration({ commit }, { phone, code, password }) {
        let result = await reqRegister(phone, code, password)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faiile'))
        }
    },
    //登录业务
    async Signin({ commit }, { phone, password }) {
        let result = await reqLogin(phone, password)
        if (result.code == 200) {
            commit("TOKENN", result.data.token)
            localStorage.setItem('TOKEN', result.data.token)
        } else {
            return Promise.reject(new Error('faiile'))
        }
    },
    //获取用户信息:只要出发这个action，就可以获取用户信息
    async getUserInfo({ commit }) {
        //为什么用户已经登录：但是获取不到用户信息，因为获取用户信息需要携带token
        //这样服务器才知道你是谁，才会返回相应的用户额信息
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GETUSERINGO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //发请求通知服务器销毁token
        let result = await reqLogout();
        if (result.code == 200) {
            commit("USERLOGOUT");
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}