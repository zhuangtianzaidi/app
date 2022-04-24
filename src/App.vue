<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home，Search是显示的，在登录，注册时是隐藏的 -->
    <!--简单写法 <Footer
      v-show="$route.path == '/home' || $route.path == '/search'"
    ></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("categoryList");
    // this.$store.dispatch("getUserInfo");
  },
};
</script>

<style>
</style>
