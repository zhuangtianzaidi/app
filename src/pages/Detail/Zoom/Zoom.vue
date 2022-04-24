<template>
  <div class="spec-preview">
    <img :src="skuImageLists.imgUrl" />
    <!-- 这是控制 -->
    <div class="event" @mousemove="yidong"></div>
    <!-- 这是放大图 -->
    <div class="big">
      <img :src="skuImageLists.imgUrl" ref="fd" />
      <!--  报错<img :src="skuImageLists[0].imgUrl" /> -->
    </div>
    <!-- 这是绿布 -->
    <div class="mask" ref="lm"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    skuImageLists() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    this.$bus.$on("xulei", (index) => {
      this.currentIndex = index;
      //console.log(index);
    });
  },
  methods: {
    yidong(event) {
      let lm = this.$refs.lm;
      let fd = this.$refs.fd;
      let l = event.offsetX - lm.offsetWidth / 2;
      let t = event.offsetY - lm.offsetHeight / 2;
      //约束left|top数值
      if (l <= 0) l = 0;
      if (l >= lm.offsetWidth) l = lm.offsetWidth;
      if (t <= 0) t = 0;
      if (t >= lm.offsetHeight) t = lm.offsetHeight;
      //动态修改遮罩层的l、t
      lm.style.left = l + "px";
      lm.style.top = t + "px";
      //修改大图的left|top
      fd.style.left = -2 * l + "px";
      fd.style.top = -2 * t + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0px;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>