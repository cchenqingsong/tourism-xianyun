<template>
  <el-row type="flex" class="herder" style=" margin-top: 20px;">
    <!-- 左边组件 -->
    <el-row class="left">
      <!-- 区域 -->
      <el-row>
        <el-col :span="3">区域：</el-col>
        <el-col :span="21" class="didan">
          <div :class="{ yichu: isShow }">
            <nuxt-link
              to="/#"
              class="jingdian"
              v-for="(item, index) in $store.state.hotel.cityjingdian"
              :key="index"
              >{{ item.name }}</nuxt-link
            >
          </div>
          <a href="#" @click="isShow = !isShow">
            <i
              class="el-icon-d-arrow-right"
              style="transform: rotate(90deg)"
            ></i>
            等多个地区
          </a>
        </el-col>
      </el-row>
      <!-- 均价 -->
      <el-row class="huangguan">
        <el-col :span="3">
          均价
          <el-badge class="mark" value="?" />:
        </el-col>
        <el-col :span="21">
          <el-tooltip
            class="item"
            effect="dark"
            content="哈哈哈哈哈哈"
            placement="bottom-start"
          >
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>￥332
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="哈哈哈哈哈哈"
            placement="bottom-start"
          >
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>￥532
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="哈哈哈哈哈哈"
            placement="bottom-start"
          >
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>￥882
            </span>
            <span>{{ mapData }}</span>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-row>

    <!-- 右边组件 -->
    <el-row class="right" id="ditu"></el-row>
    <p id="info"></p>
  </el-row>
</template>

<script>
export default {
  // props: ["zuobiao",'hotelList'],
  props: {
    hotelList: {
      type: Array,
      default: []
    }
  },
  watch: {},
  data() {
    return {
      isShow: true,
      ismap: "",
      //定位到的数据
      dingwei: {},
      cityName: "",
      cityId: "",
      //景点
      jingdian: []
    };
  },
  mounted() {
    // if (this.$route.query.city) {
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=bbe9a00c0951c9d7a8c5bc3c985f8799&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    window.onLoad = () => {
      var map = new AMap.Map("ditu", {
        resizeEnable: true
      });

      // this.init()
      // if(this.hotelList.length == 0) return

      AMap.plugin("AMap.CitySearch", () => {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity((status, result) => {
          // console.log(result);

          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            this.cityName = result.city;
            this.cityId = result.infocode;
            this.$emit("cityData");
            var citybounds = result.bounds;
            // document.getElementById("info").innerHTML =
            // "您当前所在城市：" + this.cityName;
            //地图显示当前城市
            map.setBounds(citybounds);
            // this.$router.push({
            //   name: "hotel",
            //   query: { cityName: result.city }
            // });

            //请求景点
            this.$axios({
              url: "/cities",
              params: {
                name: this.cityName
              }
            }).then(res => {
              this.jingdian = res.data.data[0].scenics;
              this.$store.commit(
                "hotel/setCityjingdian",
                res.data.data[0].scenics
              );
              this.$emit("cityID", this.jingdian[0].city);
              this.$router.push({
                name: "hotel",
                query: { city: this.jingdian[0].city, cityName: result.city }
              });
            });
          } else {
            document.getElementById("info").innerHTML = result.info;
          }
        });
      });
    };

    
  },
  // },
  methods: {},
  computed: {
    mapData() {
      if (this.hotelList.length == 0) return;
      let list = [];
      let arr = this.hotelList.map(v => {
        return {
          jing: v.location.longitude,
          wei: v.location.latitude, 
          name: v.name
        };
      });
      // console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        // // 创建一个 Icon
        // var startIcon = new AMap.Icon({
        //     // 图标尺寸
        //     size: new AMap.Size(25, 34),
        //     // 图标的取图地址
        //     image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        //     // 图标所用图片大小
        //     imageSize: new AMap.Size(135, 40),
        //     // 图标取图偏移量
        //     imageOffset: new AMap.Pixel(-9, -3)
        // });

        var marker = new AMap.Marker({
          position: new AMap.LngLat(arr[i].jing, arr[i].wei), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: arr[i].name
        });

        marker.setLabel({
          offset: new AMap.Pixel(0, 0), //设置文本标注偏移量
          content: "<div class='info'>" + arr[i].name + "</div>", //设置文本标注内容
          direction: "right" //设置文本标注方位
        });
        list.push(marker);
      }
      // console.log(arr[0].jing + ":" + arr[0].wei);
      var map = new AMap.Map("ditu", {
        resizeEnable: true
      });
      map.add(list);
      var newCenter = map.setFitView();
      return "";
    }
  }
};
</script>

<style scoped lang="less" lang="less">
.herder {
  color: #666;
  font-size: 14px;
  width: 1000px;
  .left {
    width: 590px;
    height: 100%;
    padding: 0 10px;
  }
  .right {
    width: 410px;
    height: 260px;
  }
}
.yichu {
  height: 42px;
  overflow: hidden;
}
/deep/.el-icon-question {
  margin-left: 10px;
}
/deep/.el-badge__content {
  position: relative;
  top: -5px;
  left: 0;
  background-color: #ccc;
}
/deep/.huangguan {
  margin-top: 15px;
  span {
    padding-right: 20px;
  }
  i {
    color: #ff9900;
  }
}

#info {
  // width: 200px;
  // height: 30px;
  background-color: #fcf9f2;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  border-bottom-right-radius: 100px;
}
.jingdian {
  padding-right: 4px;
  margin-right: 14px;
}
/deep/.amap-marker-label {
  border: 0;
  background-color: #fff;
}
</style>
