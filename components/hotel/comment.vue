<template>
  <div class="comment">
    <div class="comment_title clearfix">
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
        <p class="comment_num">
          共有
          <span class="num">1</span> 人点评
        </p>
      </div>
      <!-- 评论标签 -->
      <div class="comments-tags">
        <p>大家觉得</p>
        <!-- 所有评论 -->
        <span class="all_remarks">所有评论118</span>
        <!-- 非常好 -->
        <span class="very_good_remarks">非常好29</span>
        <!-- 好评 -->
        <span class="good_remarks">好评54</span>
        <!-- 差评 -->
        <span class="bad_remarks">差评5</span>
        <!-- 非常差 -->
        <span class="very_bad_remarks">非常差3</span>
      </div>
    </div>
    <div class="comment_info clearfix">
      <div class="user_info">
        <img src="../../static/hotel/hotel1.jpg" alt />
        <p class="username">地球火星网友</p>
      </div>
      <div
        class="comment_text"
      >适合带6岁以上小朋友 室外室内幼儿游戏活动区域都不多 室外公共游泳池很大 但这个季节也很晒 花园很美 大唐装修也很适合中老年的审美 适合带父母出游 中餐厅东西做的不错 量也很大 房间内部设施简约大气 厚重中又带有现代化气息 床垫软硬适中 大床1.95 总的来说 是一趟不错的旅行 还会再来</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.comment {
  padding-left: 20px;
  .comment_title {
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    // 进度条的样式
    .progress {
      position: relative;
      float: left;
      width: 120px;
      padding-bottom: 15px;
      margin-right: 20px;
      border-right: 1px dashed #eee;
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
      .comment_num {
        font-size: 14px;
        .num {
          color: rgb(255, 153, 0);
        }
      }
    }
    // 评论标签的样式
    .comments-tags {
      float: left;
      margin-top: 10px;
      width: 300px;
      p {
        color: #666;
        margin-bottom: 10px;
      }
      span {
        display: inline-block;
        margin: 0 10px 8px 0;
        padding: 4px 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        border-radius: 4px;
        &.all_remarks {
          border: 2px solid #ff7800;
          color: #ff7800;
        }
        &.very_good_remarks {
          border: 2px solid #e1251b;
          color: #e1251b;
        }
        &.good_remarks {
          border: 2px solid red;
          color: red;
        }
        &.bad_remarks {
          border: 2px solid #666;
          color: #666;
        }
        &.very_bad_remarks {
          border: 2px solid #999;
          color: #999;
        }
      }
    }
  }
  .comment_info {
    margin-top: 20px;
    padding-left: 15px;
    .user_info {
      float: left;
      margin-right: 40px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid pink;
      }
      .username {
        color: #666;
      }
    }
    .comment_text {
      float: left;
      width: 700px;
      font-size: 14px;
      color: #333;
      padding-top: 10px;
      line-height: 24px;
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