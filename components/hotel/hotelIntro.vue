<template>
  <!-- 酒店简介 -->
  <div class="hotel_intro">
    <!-- Breadcrumb 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>广州酒店</el-breadcrumb-item>
      <el-breadcrumb-item>如家快捷酒店(天河方舟园店)</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 酒店信息 -->
    <div class="hotel">
      <div class="w">
        <div class="top">
          <div class="title">
            <h2>如家快捷酒店(天河方舟园店)</h2>
            <!-- 等级 -->
            <span class="level"></span>
          </div>
          <!-- 地址 -->
          <div class="address">
            <i class="el-icon-location"></i>
            高淳县淳溪镇镇兴路118号(高淳县委党校对面)
          </div>
        </div>
        <div class="content clearfix">
          <!-- 轮播图 -->
          <div class="slider">
            <!-- 大图 -->
            <div class="left">
              <!-- <el-carousel height="410px" :interval="5000">

                <el-carousel-item v-for="(item,index) in imgData" :key="index">
                  <img :src="item" alt class="big_img" />
                </el-carousel-item>
              </el-carousel>-->
              <span class="prev" @click="previous">
                <i class="el-icon-arrow-left"></i>
              </span>
              <span class="next" @click="next">
                <i class="el-icon-arrow-right"></i>
              </span>
              <ul>
                <li v-for="(item,index) in imgData" :key="index">
                  <img :src="item" alt class="big_img" />
                </li>
              </ul>
            </div>
            <!-- 小图 -->
            <div class="right">
              <ul>
                <li
                  v-for="(item,index) in imgData"
                  :key="index"
                  @click="handleClick(index)"
                  :class="{addBorder:current===index}"
                >
                  <img :src="item" alt />
                </li>
              </ul>
            </div>
          </div>
          <!-- 酒店评分 -->
          <div class="intro">
            <!-- 进度条 -->
            <div class="progress">
              <!-- Progress 进度条 -->
              <el-progress
                type="circle"
                :percentage="4.7*20"
                :width="85"
                color="rgb(255, 153, 0)"
                :show-text="false"
              ></el-progress>
              <!-- 分数 -->
              <p class="grade">
                4.7
                <span>分</span>
              </p>
              <p class="comment">
                已有
                <span class="comment_num">1</span> 人点评
              </p>
            </div>
            <!-- 最新评论 -->
            <div class="new_comment">
              <div class="nickname">来自 <span>地球发动机</span> 的最新评论</div>
              <div
                class="desc"
              >适合带6岁以上小朋友 室外室内幼儿游戏活动区域都不多 室外公共游泳池很大 但这个季节也很晒 花园很美 大唐装修也很适合中老年的审美 适合带父母出游 中餐厅东西做的不错 量也很大 房间内部设施简约大气 厚重中又带有现代化气息 床垫软硬适中 大床1.95 总的来说 是一趟不错的旅行 还会再来</div>
            </div>
            <!-- 其他 -->
            <div class="order">
              <ul class="clearfix">
                <li>
                  <span>收藏</span>
                </li>
                <li>
                  <span>2018年装修</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 酒店照片展示数据
      imgData: [
        require("@/static/hotel/hotel1.jpg"),
        require("@/static/hotel/hotel2.jpg"),
        require("@/static/hotel/hotel3.jpg"),
        require("@/static/hotel/hotel4.jpg"),
        require("@/static/hotel/hotel5.jpg"),
        require("@/static/hotel/hotel6.jpg"),
        require("@/static/hotel/hotel7.jpg"),
        require("@/static/hotel/hotel8.jpg")
      ],
      current: 0
    };
  },
  methods: {
    // 点击小图列表给当前小图添加样式
    handleClick(index) {
      this.current = index;
      document.querySelector(".big_img").src = this.imgData[index];
    },
    // 上一张图片
    previous() {
      this.current--;
      if (this.current < 0) {
        this.current = 0;
      }
      document.querySelector(".big_img").src = this.imgData[this.current];
    },
    // 下一张图片
    next() {
      this.current++;
      if (this.current > this.imgData.length - 1) {
        this.current = 0;
      }
      document.querySelector(".big_img").src = this.imgData[this.current];
    }
  }
};
</script>

<style lang='less' scoped>
.hotel_intro {
  // 面包屑导航部分的样式
  .el-breadcrumb {
    width: 1000px;
    margin: 20px auto;
  }
  // 酒店信息部分的样式
  .hotel {
    background-color: #f5f5f5;
    padding-bottom: 10px;
    .w {
      width: 1000px;
      margin: 0 auto;
      padding-top: 10px;
    }
    // 酒店名称和地址
    .top {
      .title {
        margin-bottom: 10px;
      }
      .address {
        font-size: 16px;
      }
    }
    .content {
      margin-top: 10px;
      background-color: #fff;
      box-shadow: 0 1px 8px 0 #ddd;
      // 图片轮播部分
      .slider {
        float: left;
        padding: 15px 10px 5px;
        // 大图部分的样式
        .left {
          float: left;
          width: 540px;
          height: 402px;
          overflow: hidden;
          // /deep/.el-carousel__indicators {
          //   display: none;
          // }
          position: relative;
          img {
            width: 100%;
          }
          span {
            position: absolute;
            width: 50px;
            height: 60px;
            top: 50%;
            display: none;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.4);
            text-align: center;
            i {
              color: #eee;
              font-size: 30px;
              font-weight: 700;
              line-height: 60px;
            }
            &.prev {
              left: 0;
            }
            &.next {
              right: 0;
            }
            &:hover {
              background: rgba(0, 0, 0, 0.7);
            }
          }
          &:hover span {
            display: block;
          }
        }
        // 小图列表部分的样式
        .right {
          float: left;
          ul {
            width: 230px;
          }
          li {
            float: left;
            margin: 0 0 10px 10px;
            width: 102px;
            height: 93px;
            box-sizing: border-box;

            img {
              width: 100%;
              height: 100%;
              cursor: pointer;
            }
          }
          // 小图列表动态添加边框的样式
          .addBorder {
            border: 2px solid #409eff;
          }
        }
      }
      // 酒店评分
      .intro {
        float: left;
        margin-top: 50px;
        // 进度条的样式
        .progress {
          position: relative;
          width: 200px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
          .grade {
            width: 85px;
            text-align: center;
            font-size: 20px;
            color: rgb(255, 153, 0);
            position: absolute;
            top: 29px;
            left: 2px;
            span {
              color: #333;
              font-size: 18px;
            }
          }
          .comment {
            position: absolute;
            top: 35px;
            right: 10px;
            font-size: 14px;
            .comment_num {
              color: rgb(255, 153, 0);
            }
          }
        }
        // 最新评论部分
        .new_comment{
          font-size: 12px;
          color: #333;
          margin-top: 20px;
          padding-bottom: 15px;
          line-height: 24px;
          border-bottom: 1px solid #eee;
          span{
            color: rgb(255, 153, 0);
          }
          .desc{
            width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp:3;
            -webkit-box-orient: vertical;
          }
        }
        .order {
          margin-top: 20px;
          li {
            float: left;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            font-size: 12px;
            color: #666;
            text-align: center;
            &:first-child {
              background: url("../../static/hotel/love.png") no-repeat #f5f5f5
                center 18px;
            }
            &:last-child {
              background: url("../../static/hotel/zx.png") no-repeat #f5f5f5
                center 18px;
              margin-left: 25px;
            }
            span {
              display: inline-block;
              margin-top: 50px;
            }
          }
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