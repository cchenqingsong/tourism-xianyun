<template>
  <div class="hotel_info">
    <h2>酒店信息</h2>
    <div class="facility-icon">
      <ul class="clearfix">
        <li
          v-for="(item,index) in ['免费WIFI','免费停车','接机服务','餐厅','会议室','行李寄存','健身房','游泳池']"
          :key="index"
        >
          <span class="icon-bg"></span>
          <span class="icon-text">{{item}}</span>
        </li>
      </ul>
    </div>
    <!-- 基本信息 -->
    <div class="detail clearfix">
      <div class="title">
        <span class="title-icon"></span>
        <span class="title-text">基本信息</span>
      </div>
      <ul>
        <li>{{data.creation_time}}</li>
        <li class="line"></li>
        <li>{{data.renovat_time}}</li>
        <li class="line"></li>
        <li>共{{data.roomCount}}间客房</li>
        <li class="line"></li>
        <li>酒店 {{data.phone}}</li>
        <li class="line"></li>
        <li>同程预订电话 95711</li>
      </ul>
    </div>
    <!-- 酒店设施 -->
    <div class="hotel-facility clearfix">
      <div class="title">
        <span class="title-icon"></span>
        <span class="title-text">酒店设施</span>
      </div>
      <div class="facility">
        <div v-for="(item,index) in facilityList" :key="index">
          <span class="facility_title">{{item.title}}</span>
          <span class="facility_item" v-for="(children,index) in item.children" :key="index">
            <i class="el-icon-check"></i>
            {{children}}
          </span>
          <!-- <el-row type="flex">
            <el-col :span="3"  v-for="(children,index) in item.children" :key="index">
              <span class="facility_item">
                <i class="el-icon-check"></i>
                {{children}}
              </span>
            </el-col>
          </el-row> -->
        </div>
      </div>
    </div>
    <!-- 酒店政策 -->
    <div class="hotelPolicy clearfix">
      <div class="title">
        <span class="title-icon"></span>
        <span class="title-text">酒店政策</span>
      </div>
      <div class="policy">
        <div class="notice">
          <span class="policy_title" style="height: 80px;">预定须知</span>
          <span
            class="policy_text"
          >为贯彻落实《广州市星级酒店全面推进减少酒店行业一次性用品专项行动方案》相关规定，推进生活垃圾源头减量， 2019年9月1日起，广州市旅游住宿业将不再主动提供牙刷、梳子、浴擦、剃须刀、指甲锉、鞋擦这些一次性日用品，酒店餐厅不主动提供一次性餐具。若住客需要可咨询酒店。;2019-10-16至2021-12-31,酒店实际入住人与预订信息需保持一致。</span>
        </div>
        <div class="time">
          <span class="policy_title">入离时间</span>
          <span style="margin-right:20px;">入住时间:14:00点以后</span>
          <span>离店时间:12:00点以前</span>
        </div>
      </div>
    </div>
    <!-- 酒店简介 -->
    <div class="hotel-introduce clearfix">
      <div class="title">
        <span class="title-icon"></span>
        <span class="title-text">酒店简介</span>
      </div>
      <div class="introduce_text" :class="{active:isShowAll}">
        公寓位于{{data.address}}。
        公寓拥有现在潮流设计统一精装修客房，便捷的交通。
        公寓提供高速宽带、无线WIFI覆盖、LED电视、独立洗手间、全天热水、舒适的睡床等，带中国风的装饰、服务设施一应俱全。
        公寓本着以人为本、宾客至上的服务宗旨。
        <i
          class="el-icon-arrow-down"
          @click="isShowAll=!isShowAll"
          v-if="!isShowAll"
        ></i>
        <i class="el-icon-arrow-up" @click="isShowAll=!isShowAll" v-if="isShowAll"></i>
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
      default: {}
    }
  },
  data() {
    return {
      isShowAll: false,
      facilityList: [
        {
          title: "网络设施",
          children: ["房间wifi", "宽带上网"]
        },
        {
          title: "房间设施",
          children: ["吹风机", "空调", "电热水壶"]
        },
        {
          title: "通用设施",
          children: ["电梯", "健身房", "游泳池", "无烟房", "免费停车"]
        },
        {
          title: "服务项目",
          children: ["婚姻服务", "看护小孩服务", "唤醒服务", "行李寄存"]
        }
      ]
    };
  }
};
</script>

<style lang='less' scoped>
.hotel_info {
  margin-top: 10px;
  margin-left: 20px;
  h2 {
    font-weight: normal;
  }
  .facility-icon {
    li {
      float: left;
      margin: 20px 25px 30px;
      text-align: center;
      &:nth-child(2) .icon-bg {
        background-position: -12px -172px;
      }
      &:nth-child(3) .icon-bg {
        background-position: -172px -332px;
      }
      &:nth-child(4) .icon-bg {
        background-position: -172px -12px;
      }
      &:nth-child(5) .icon-bg {
        background-position: -172px -252px;
      }
      &:nth-child(6) .icon-bg {
        background-position: -333px -12px;
      }
      &:nth-child(7) .icon-bg {
        background-position: -172px -172px;
      }
      &:nth-child(8) .icon-bg {
        background-position: -172px -412px;
      }
      .icon-bg {
        display: block;
        width: 56px;
        height: 56px;
        margin-bottom: 5px;
        background: url(../../static/hotel/hotel-info.png) no-repeat -12px -12px;
      }
      .icon-text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  // 基本信息
  .detail {
    width: 820px;
    padding-left: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #dcdcdc;
    ul {
      float: left;
      li {
        float: left;
        color: #666;
        font-size: 12px;
        &.line {
          height: 11px;
          width: 1px;
          margin: 3px 15px 0;
          background-color: #dcdcdc;
        }
      }
    }
  }
  .title {
    float: left;
    width: 120px;
    font-size: 12px;
    color: #999;
    line-height: 12px;
    .title-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      background: url(../../static/hotel/icon1.png) no-repeat 2px 0;
    }
  }
  // 酒店设施的样式
  .hotel-facility {
    width: 820px;
    padding: 15px 10px 8px;
    border-bottom: 1px dashed #dcdcdc;
    .title-icon {
      background-position: 2px -50px;
    }
    .title {
      height: 96px;
    }
    .facility {
      font-size: 12px;
      color: #666;
      .facility_title {
        display: inline-block;
        width: 74px;
      }
      .facility_item {
        display: inline-block;
        width: 120px;
        line-height: 24px;
        .el-icon-check {
          color: #50b400;
          font-weight: 700;
        }
      }
    }
  }
  // 酒店政策
  .hotelPolicy {
    width: 820px;
    padding: 15px 10px 8px;
    border-bottom: 1px dashed #dcdcdc;
    .title-icon {
      background: url(../../static/hotel/hpolicy.png) no-repeat;
    }
    .policy {
      font-size: 12px;
      color: #666;
      .notice,
      .time {
        padding-bottom: 10px;
        margin-left: 120px;
        border-bottom: 1px dashed #dcdcdc;
      }
      .policy_title {
        float: left;
        width: 74px;
      }
      .policy_text {
        line-height: 20px;
      }
      .time {
        padding-top: 10px;
        border-bottom: none;
      }
    }
  }
  // 酒店简介
  .hotel-introduce {
    position: relative;
    width: 820px;
    padding: 15px 10px 8px;
    border-bottom: 1px dashed #dcdcdc;
    .title-icon {
      background-position: 2px -144px;
    }
    .introduce_text {
      width: 650px;
      height: 20px;
      margin-left: 120px;
      font-size: 12px;
      color: #666;
      line-height: 20px;
      overflow: hidden;
      // text-overflow: ellipsis;
      // display: -webkit-box;
      // -webkit-line-clamp: 1;
      // -webkit-box-orient: vertical;
      .el-icon-arrow-down,
      .el-icon-arrow-up {
        position: absolute;
        top: 17px;
        right: 22px;
        font-size: 14px;
      }
    }
    .active {
      height: 64px;
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