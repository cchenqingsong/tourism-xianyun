<template>
  <div>
    <!-- 三个图片的上下布局 -->
    <el-row v-for="(item,index) in data" :key="index">
      <el-row class="content" v-if="item.images.length >= 2 || item.images.length == 0">
        <nuxt-link :to="{path:'/post/detail',query:{id:item.id}}" >
          <h3>{{item.title}}</h3>
          <div class="text" v-html="item.summary"></div>
          <el-row type="flex" class="images">
            <img :src="item" alt v-for="(item,index) in item.images" :key="index" />
          </el-row>
        </nuxt-link>
        <el-row type="flex" justify="space-between" class="userInfo">
          <el-row class="left" type="flex" align="middle">
            <i class="el-icon-location-outline"></i>
            <span>{{item.cityName}}</span>&nbsp;
            <i>by</i>
            <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt />
            <span class="nickname">{{item.account.nickname}}</span>&nbsp;
            <i class="el-icon-view"></i>
            <span>{{item.watch}}</span>
          </el-row>
          <span class="like">{{item.like}}&nbsp;赞</span>
        </el-row>
      </el-row>

      <!-- 单个图片的左右布局 -->
      <el-row class="content1" type="flex" v-else>
        <nuxt-link :to="{path:'/post/detail',query:{id:item.id}}">
          <img :src="item" alt v-for="(item,index) in item.images" :key="index" />
        </nuxt-link>
        <div>
          <nuxt-link :to="{path:'/post/detail',query:{id:item.id}}">
            <h3>{{item.title}}</h3>
            <div class="text" v-html="item.summary"></div>
          </nuxt-link>
          <el-row type="flex" justify="space-between" class="userInfo">
            <el-row class="left" type="flex" align="middle">
              <i class="el-icon-location-outline"></i>
              <span>{{item.cityName}}</span>&nbsp;
              <i>by</i>
              <img :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt />
              <span class="nickname">{{item.account.nickname}}</span>&nbsp;
              <i class="el-icon-view"></i>
              <span>{{item.watch}}</span>
            </el-row>
            <span class="like">{{item.like}}&nbsp;赞</span>
          </el-row>
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 20px 0;
  overflow: hidden;
  h3 {
    font-weight: 400;
  }
  .text {
    margin: 15px 0;
    color: #666;
    font-size: 14px;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .images {
    img {
      width: 32%;
      &:nth-child(2) {
        margin: 0 15px;
      }
    }
  }
  .userInfo {
    margin-top: 15px;
    .left {
      font-size: 12px;
      color: #999;
      i {
        &:nth-of-type(n + 2) {
          padding: 0 5px;
        }
      }
      .nickname {
        color: #ffa500;
      }
      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
    .like {
      color: #ffa500;
    }
  }
}
.content1 {
  padding: 20px 0;
  h3 {
    font-weight: 400;
  }
  img {
    margin-right: 10px;
    width: 220px;
    height: 150px;
  }
  .text {
    margin: 15px 0;
    color: #666;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .userInfo {
    margin-top: 15px;
    .left {
      font-size: 12px;
      color: #999;
      i {
        &:nth-of-type(n + 2) {
          padding: 0 5px;
        }
      }
      .nickname {
        color: #ffa500;
      }
      img {
        width: 16px;
        height: 16px;
        border-radius: 50%;
      }
    }
    .like {
      color: #ffa500;
    }
  }
}
</style>