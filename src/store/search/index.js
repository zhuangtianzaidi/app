import { reqGetSearchInfo } from '@/api'
//search模块的小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
//获取search模块数据
const actions = {
    //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    async getsearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
//getters可以当成计算属性
//项目中getters主要作用是：简化仓库的数据（简化数据而生）
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
    goodsList(state) {
        return state.searchList.goodsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    },
    total(state) {
        return state.searchList.total || [];
    }
};

//对外暴露
export default {
    state,
    mutations,
    getters,
    actions,
}