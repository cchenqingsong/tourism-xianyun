<template>
  <div class="charmber">
    <!-- 表头 -->
    <div class="title">
      <el-row>
        <el-col :span="8">
          <div>房型</div>
        </el-col>
        <el-col :span="2">
          <div>床型</div>
        </el-col>
        <el-col :span="3">
          <div>早餐</div>
        </el-col>
        <el-col :span="3">
          <div>入住人数</div>
        </el-col>
        <el-col :span="3">
          <div>政策</div>
        </el-col>
        <el-col :span="5">
          <div>房价</div>
        </el-col>
      </el-row>
    </div>
    <!-- 房型列表 -->
    <div class="hotel_type_list">
      <div class="hotel_type_item">
        <el-row v-for="(item,index) in data.products" :key="index">
          <el-col :span="8">
            <div class="clearfix">
              <img src="../../static/hotel/hotel2.jpg" alt class="hotel_type_img" />
              <div class="info">
                <div>{{item.bestType}}</div>
                <div class="roomInfo">30㎡ 1张1.8m大床 有窗 可住2人</div>
              </div>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="margin-top: 34px;">大床</div>
          </el-col>
          <el-col :span="3">
            <div style="margin-top: 34px;">无餐食</div>
          </el-col>
          <el-col :span="3">
            <div>
              <i class="el-icon-user-solid" style="color: #616161;margin-top: 34px;"></i>
              <i class="el-icon-user-solid" style="color: #616161;margin-top: 34px;"></i>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="normal">30分钟内免费取消</div>
          </el-col>
          <el-col :span="2">
            <div class="price">
              ¥
              <span>{{item.price}}</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="btn">
              <p class="btn_item">
                预订·
                <span class="type">在线付</span>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 接收数据
  props: {
    data: {
      type: Object,
      // default: {}
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang='less' scoped>
.charmber {
  .title {
    padding: 10px;
    margin-top: 10px;
    background-color: #f7f7f7;
    color: #9e9e9e;
    font-size: 12px;
  }
  // 房型列表
  .hotel_type_list {
    .hotel_type_item {
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      .hotel_type_img {
        float: left;
        width: 140px;
        margin-left: 5px;
        border-radius: 5px;
      }
      .info {
        float: left;
        width: 126px;
        margin-left: 10px;
        margin-top: 15px;
        line-height: 22px;
        .roomInfo {
          font-size: 12px;
          color: #9e9e9e;
        }
      }
      .normal {
        width: 100px;
        margin-top: 30px;
        margin-left: -10px;
        padding-bottom: 3px;
        color: rgb(45, 150, 164);
        border-bottom: 1px dashed rgb(45, 150, 164);
      }
      .price {
        margin-top: 34px;
        color: #ff704a;
        span {
          font-size: 24px;
        }
      }
      .btn_item {
        width: 110px;
        height: 36px;
        margin-top: 34px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        border-radius: 18px;
        background: #ff714a;
        cursor: pointer;
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