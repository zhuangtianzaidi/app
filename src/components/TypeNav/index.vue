<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <!-- 三级分类 -->
          <div class="sort" v-show="show">
            <!-- 利用事件委派和编程式导航实现路由的跳转域传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  //组件挂载完毕：可以向服务器发请求

  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      //简写
      //categoryList: (state) => state.home.categoryList,
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    /* changeIndex(index) {
      this.currentIndex = index;
      //正常情况下：鼠标进入，都会触发鼠标经过事件
      //非正常情况下(用户操作快)：只触发一部分鼠标经过事件
      // console.log("鼠标经过", index);
    }, */
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    leaveIndex() {
      this.currentIndex = -3;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      //最好的解决方法：编程式导航+事件委派是把全部子节点【h3,dt,dl,em】全部委派给父节点
      //利用事件委派存在的一些问题：1.你怎么知道点击的一定是a标签
      //2.如何获取参数【1.2.3级分类的产品名字·id】
      // this.$router.push("/search");

      //第一个问题：在子节点a标签上加上自定义属性data-categoryName，其余子节点没有
      let aaeve = event.target;
      // console.log(aaeve);
      //节点有一个属性dataset，可以获取节点的自定义属性与属性值
      // console.log(aaeve.dataset);
      //注意要小写
      let { categoryname, category1id, category2id, category3id } =
        aaeve.dataset;
      if (categoryname) {
        //整理路由转跳
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级，二级，三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //整理完参数
        // console.log(location);
        //路由跳转 判断：如果路由跳转的时候有东西，有params参数，捎带脚传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
          location.query = query;
          this.$router.push(location);
        }
      }
    },
    entershow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
  },
  mounted() {
    //每一个路由跳转的时候，进行一次判断，如果【不是home路由】即为search
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      cursor: pointer;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过度动画的样式
    //过度动画的开始状态（进入）
    .sort-enter {
      height: 0px;
      // transform: rotate(0deg);旋转
    }
    //过度动画的结束状态
    .sort-enter-to {
      height: 461px;
      // transform: rotate(360deg);
    }
    //过度动画的过程
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>