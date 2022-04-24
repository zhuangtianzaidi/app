<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('huidiao', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="continuesye.start > 1"
      :class="{ active: pageNo == 1 }"
      @click="$emit('huidiao', 1)"
    >
      1
    </button>
    <button v-if="continuesye.start > 3">···</button>

    <span v-for="(Middle, index) in continuesye.end" :key="index">
      <button
        v-if="Middle >= continuesye.start"
        :class="{ active: pageNo == Middle }"
        @click="$emit('huidiao', Middle)"
      >
        {{ Middle }}
      </button>
    </span>

    <button v-if="continuesye.end < zongye - 1">···</button>
    <button
      v-if="continuesye.end < zongye"
      :class="{ active: pageNo == zongye }"
      @click="$emit('huidiao', zongye)"
    >
      {{ zongye }}
    </button>
    <button :disabled="pageNo == zongye" @click="$emit('huidiao', pageNo + 1)">
      下一页
    </button>
    <!-- <div>开始页：{{ continuesye.start }} 结束页：{{ continuesye.end }}</div> -->

    <button style="margin-left: 30px">共 {{ todal }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  //当前第几页 ，每一条展示多少条数据，总共有多少条数据，中心也是5
  props: ["pageNo", "pageSize", "todal", "continues"],
  computed: {
    //计算总共有多少页
    zongye() {
      return Math.ceil(this.todal / this.pageSize);
    },
    continuesye() {
      let start = "3",
        end = "7";
      let updown = parseInt(this.continues / 2);
      start = this.pageNo - updown;
      end = this.pageNo + updown;
      if (start < 1) {
        start = 1;
        end = this.continues;
      }
      if (end > this.zongye) {
        start = this.zongye - this.continues + 1;
        end = this.zongye;
      }
      return { start, end };
    },
  },
};
</script>

<style lang ='less' scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>