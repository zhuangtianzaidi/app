<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(sku, index) in skuImageList"
        :key="index"
        @click="chudi(index)"
      >
        <img :src="sku.imgUrl" :class="{ active: yclass == index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data() {
    return {
      yclass: 0,
    };
  },
  watch: {
    //保证数据更新完成，但不保证循环更新完成
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        var mySwiper = new Swiper(this.$refs.cur, {
          //".swiper-container"
          //  loop: true, // 循环模式选项
          //容器一次展示三张图
          slidesPerView: 3,
          //向左移动时3张图一起动
          slidesPerGroup: 3,
          //左边距离
          slidesOffsetBefore: 35,

          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
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
        });
      });
    },
  },
  methods: {
    chudi(index) {
      this.yclass = index;
      this.$bus.$emit("xulei", index);
      // console.log(this.yclass);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>