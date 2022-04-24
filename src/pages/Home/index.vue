<template>
  <div>
    <!-- 三级联动全局组件：三级联动已经注册为全局组件，因此不需要在引用 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Fllor v-for="floor in floorList.floor" :key="floor.id" :list="floor" />
    <Branl />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Fllor from "@/pages/Home/Fllor";
import Branl from "@/pages/Home/Branl";

import { mapState } from "vuex";

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Fllor,
    Branl,
  },
  mounted() {
    //派发action，获取floor组件数据
    this.$store.dispatch("getFloorList");
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>