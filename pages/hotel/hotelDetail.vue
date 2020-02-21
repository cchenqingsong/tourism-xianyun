<template>
  <!-- 酒店详情 -->
  <div class="hotel_detail">
    <!-- 酒店简介 -->
    <HotelIntro />
    <!-- 酒店详细信息 -->
    <div class="detail">
      <!-- 表头信息 -->
      <div class="menu_title">
        <ul class="clearfix">
          <li
            v-for="(item, index) in [`房型`, `酒店信息`,`交通`,`点评(${commentNum})`]"
            :key="index"
            :class="{active:current===index}"
            @click="handleClick(index)"
          >{{item}}</li>
        </ul>
      </div>
      <!-- 房型信息 -->
      <Charmber v-if="current===0" />
      <!-- 酒店信息 -->
      <HotelInfo v-if="current===1"/>
      <!-- 交通信息 -->
      <Traffic v-if="current===2"/>
      <!-- 评论 -->
      <Comment v-if="current===3"/>
    </div>
  </div>
</template>

<script>
import HotelIntro from "@/components/hotel/hotelIntro.vue";
import Charmber from "@/components/hotel/charmber.vue";
import HotelInfo from "@/components/hotel/hotelInfo.vue";
import Traffic from "@/components/hotel/traffic.vue";
import Comment from "@/components/hotel/comment.vue";
export default {
  data() {
    return {
      // 评论数量
      commentNum: 200,
      current: 0
    };
  },
  // 注册
  components: {
    HotelIntro,
    Charmber,
    HotelInfo,
    Traffic,
    Comment
  },
  methods: {
    // 表头样式
    handleClick(index) {
      this.current = index;
    }
  }
};
</script>

<style lang='less' scoped>
.hotel_detail {
  .detail {
    width: 1000px;
    margin: 20px auto;
    .menu_title {
      border-bottom: 2px solid #4c5a65;
      li {
        float: left;
        // width: 76px;
        padding: 0 20px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        color: #4c5a65;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          background: #f0f0f0;
          color: #4c5a65;
        }
      }
      .active {
        background: #4c5a65;
        color: #fff;
        &:hover {
          background: #4c5a65;
          color: #fff;
        }
      }
    }
  }
}

/*清除浮动*/
.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}
.clearfix {
  *zoom: 1;
}
</style>