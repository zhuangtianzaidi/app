<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="index">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "Carsouel",
  props: ["list"],
  watch: {
    //监听bannerList数据的变化：因为这条数据发生过变化---由空数组变为里面有四个元素
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        //现在通过watch监听bannerList属性的属性值得变化
        //如果执行handler方法，代表组件实例身上这个属性的属性已有了数组的四个元素
        //当前这个函数执行，只能保证bannerList数据已经有了，但你没办法保证v-for已经结束了
        //nextTick将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // loopAdditionalSlides: 3,

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
            autoplay: {
              delay: 2000, //1秒切换一次
              disableOnInteraction: false,
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped></style>