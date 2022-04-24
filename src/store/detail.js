import { reqGetDetailInfo, reqAddOrUpdateShopCart } from '@/api'
const state = {
    xiangqing: {}
};
const mutations = {
    GETDETAIL(state, xiangqing) {
        state.xiangqing = xiangqing
    }
};
const actions = {
    async getDetail({ commit }, skuId) {
        let result = await reqGetDetailInfo(skuId);
        if (result.code == 200) {
            commit('GETDETAIL', result.data)
        }

    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return '成功'
        } else {
            return Promise.reject(new Error("faile"));
        }
    }
};
const getters = {
    categoryView(state) {
        return state.xiangqing.categoryView || {}
    },
    skuInfo(state) {
        return state.xiangqing.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.xiangqing.spuSaleAttrList || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters,
}