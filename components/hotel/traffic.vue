<template>
  <div class="traffic clearfix">
    <!-- 使用高德地图的步骤 -->
    <!-- 1. 在页面添加 JS API 的入口脚本标签 -->
    <!-- 方法一：标签导入 -->
    <!-- <script
      type="text/javascript"
      src="https://webapi.amap.com/maps?v=1.4.15&key=40c52026fcf82bf72dfe640c74a82e97"
    ></script>-->
    <!-- 2.添加div标签作为地图容器，同时为该div指定id属性 -->
    <div id="container"></div>
    <!-- 地图右侧内容 -->
    <div class="map_right">
      <!-- 搜索框 -->
      <div class="path_search">
        <i class="revert-icon"></i>
        <!-- router-search-icon.png -->
        <!-- 起点 -->
        <div class="start">
          <span class="start_text">起</span>
          <input type="text" placeholder="请输入起点" id="start_site" />
        </div>
        <!-- 终点 -->
        <div class="end">
          <span class="end_text">终</span>
          <input type="text" placeholder="请输入终点" id="end_site" />
        </div>
        <!-- 查询按钮 -->
        <button class="search-btn" @click="handleSearch">查 询</button>
      </div>
      <!-- 查询结果展示容器 -->
      <div class="show_container">
        <ul>
          <li
            v-for="(item, index) in [`导航`,`交通`,`景点`,`美食`]"
            :key="index"
            :class="{active:current===index}"
            @click="handleClick(index)"
          >
            <i class="tab_icon"></i>
            <p>{{item}}</p>
          </li>
        </ul>
        <!-- 导航的展示部分 -->
        <div class="omnirange" v-show="current===0">
          <ul>
            <li
              v-for="(item, index) in [`驾车`,`公交`,`步行`]"
              :key="index"
              :class="{omnirange_active:omnirangeCurrent===index}"
              @click="handleOmnirange(index)"
            >{{item}}</li>
          </ul>
          <!-- 驾车 -->
          <div id="car_panel" v-show="omnirangeCurrent===0"></div>
          <!-- 公交 -->
          <div id="bus_panel" v-show="omnirangeCurrent===1"></div>
          <!-- 步行 -->
          <div id="walk_panel" v-show="omnirangeCurrent===2"></div>
        </div>
        <!-- 附近交通的展示部分 -->
        <div class="nearby_traffic">
          <div id="traffic_panel" v-show="current===1"></div>
        </div>
        <!-- 附近的景点的展示部分 -->
        <div class="scenery">
          <div id="scenery_panel" v-show="current===2"></div>
        </div>
        <!-- 附近的美食展示部分 -->
        <div class="cate">
          <div id="cate_panel" v-show="current===3"></div>
        </div>
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
  },
  data() {
    return {
      // 地图实例
      map: "",
      // 当前的tab栏
      current: 1,
      // 导航的tab栏
      omnirangeCurrent: 0
    };
  },
  mounted() {
    // 4. 创建一个地图，构造参数中的container为准备阶段添加的地图容器的id
    // var map = new AMap.Map('container');
    // 方法二：异步加载 JS API
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=40c52026fcf82bf72dfe640c74a82e97&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    window.onLoad = () => {
      var map = new AMap.Map("container");

      // 搜索提示功能
      AMap.plugin("AMap.Autocomplete", () => {
        // 实例化Autocomplete
        // 绑定起点输入框
        var autoOptions_start = {
          // input 为绑定输入提示功能的input的DOM ID
          input: "start_site", // 绑定起点输入框
          city: this.data.real_city // 限定搜索的范围
        };
        // 绑定终点输入框
        var autoOptions_end = {
          input: "end_site", // 绑定终点输入框
          city: this.data.real_city // 限定搜索的范围
        };
        var autoComplete = new AMap.Autocomplete(autoOptions_start);
        var autoComplete = new AMap.Autocomplete(autoOptions_end);
        // 无需再手动执行search方法，autoComplete会根据传入input对应的DOM动态触发search
      });

      // 搜周边
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: "交通设施服务", // 兴趣点类别
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: this.data.real_city, // 兴趣点城市
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          panel: "traffic_panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        var cpoint = [
          this.data.location.longitude,
          this.data.location.latitude
        ]; //中心点坐标
        placeSearch.searchNearBy("", cpoint, 2000, function(status, result) {});
      });
    };

    // 将酒店填入终点输入框
    setTimeout(() => {
      document.querySelector("#end_site").value = this.data.name;
    }, 0);
  },
  methods: {
    // 当点击查询按钮时触发
    handleSearch() {
      this.current = 0;

      // 获取文本框的内容
      let start = document.querySelector("#start_site").value;
      let end = document.querySelector("#end_site").value;

      // 根据地图的容器生成地图
      this.map = new AMap.Map("container", {
        resizeEnable: true
      });

      if (this.omnirangeCurrent === 0) {
        // 导入驾车插件
        AMap.plugin("AMap.Driving", () => {
          // 创建一个路线的实例
          var driving = new AMap.Driving({
            // 路线要展示的地图容器
            map: this.map,
            // 展示详细信息
            panel: "car_panel",
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME
          });

          var points = [
            { keyword: start, city: this.data.real_city },
            { keyword: end, city: this.data.real_city }
          ];

          driving.search(points, function(status, result) {
            // 未出错时，result即是对应的路线规划方案
          });
        });
      }
    },

    // tab栏切换
    handleClick(index) {
      this.current = index;
      // 根据地图的容器生成地图
      var map = new AMap.Map("container");
      if (this.current === 1) {
        // 搜周边——交通
        AMap.service(["AMap.PlaceSearch"], () => {
          //构造地点查询类
          var placeSearch = new AMap.PlaceSearch({
            type: "交通设施服务", // 兴趣点类别
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: this.data.real_city, // 兴趣点城市
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "traffic_panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });

          var cpoint = [
            this.data.location.longitude,
            this.data.location.latitude
          ]; //中心点坐标
          placeSearch.searchNearBy("", cpoint, 2000, function(
            status,
            result
          ) {});
        });
      } else if (this.current === 2) {
        // 搜周边——景点
        AMap.service(["AMap.PlaceSearch"], () => {
          //构造地点查询类
          var placeSearch = new AMap.PlaceSearch({
            type: "风景名胜", // 兴趣点类别
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: this.data.real_city, // 兴趣点城市
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "scenery_panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });

          var cpoint = [
            this.data.location.longitude,
            this.data.location.latitude
          ]; //中心点坐标
          placeSearch.searchNearBy("", cpoint, 2000, function(
            status,
            result
          ) {});
        });
      } else if (this.current === 3) {
        // 搜周边——美食
        AMap.service(["AMap.PlaceSearch"], () => {
          //构造地点查询类
          var placeSearch = new AMap.PlaceSearch({
            type: "餐饮服务", // 兴趣点类别
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
            city: this.data.real_city, // 兴趣点城市
            citylimit: true, //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "cate_panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });

          var cpoint = [
            this.data.location.longitude,
            this.data.location.latitude
          ]; //中心点坐标
          placeSearch.searchNearBy("", cpoint, 2000, function(
            status,
            result
          ) {});
        });
      }
    },
    // 导航tab栏切换
    handleOmnirange(index) {
      this.omnirangeCurrent = index;

      // 获取文本框的内容
      let start = document.querySelector("#start_site").value;
      let end = document.querySelector("#end_site").value;

      // 根据地图的容器生成地图
      this.map = new AMap.Map("container", {
        resizeEnable: true
      });

      if (this.omnirangeCurrent === 0) {
        // 导入驾车插件
        AMap.plugin("AMap.Driving", () => {
          // 创建一个路线的实例
          var driving = new AMap.Driving({
            // 路线要展示的地图容器
            map: this.map,
            // 展示详细信息
            panel: "car_panel",
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.DrivingPolicy.LEAST_TIME
          });

          var points = [
            { keyword: start, city: this.data.real_city },
            { keyword: end, city: this.data.real_city }
          ];

          driving.search(points, function(status, result) {
            // 未出错时，result即是对应的路线规划方案
          });
        });
      } else if (this.omnirangeCurrent === 1) {
        // 导入公交车插件
        AMap.plugin("AMap.Transfer", () => {
          // 创建一个路线的实例
          var transfer = new AMap.Transfer({
            // 路线要展示的地图容器
            map: this.map,
            // 展示详细信息
            panel: "bus_panel",
            // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
            policy: AMap.TransferPolicy.LEAST_TIME
          });

          var points = [
            { keyword: start, city: this.data.real_city },
            { keyword: end, city: this.data.real_city }
          ];

          transfer.search(points, function(status, result) {
            // 未出错时，result即是对应的路线规划方案
          });
        });
      } else if (this.omnirangeCurrent === 2) {
        // 导入公交车插件
        AMap.plugin("AMap.Walking", () => {
          // 创建一个路线的实例
          var walking = new AMap.Walking({
            // 路线要展示的地图容器
            map: this.map,
            // 展示详细信息
            panel: "walk_panel"
          });

          var points = [
            { keyword: start, city: this.data.real_city },
            { keyword: end, city: this.data.real_city }
          ];

          walking.search(points, function(status, result) {
            // 未出错时，result即是对应的路线规划方案
          });
        });
      }
    }
  }
};
</script>

<style lang='less' scoped>
.traffic {
  background-color: #f5f5f5;

  /* 3. 为地图容器指定高度、宽度 */
  #container {
    float: left;
    margin-right: 10px;
    width: 620px;
    height: 538px;
  }

  // 地图右侧内容
  .map_right {
    margin-top: 20px;
    float: left;
    // 搜索框
    .path_search {
      position: relative;
      padding: 10px 10px 10px 50px;
      width: 360px;
      background-color: #fff;
      .revert-icon {
        position: absolute;
        top: 30px;
        left: 24px;
        display: inline-block;
        width: 20px;
        height: 42px;
        background: url(../../static/hotel/router-search-icon.png) no-repeat 0 -244px;
        &:hover {
          background-position: 0 -152px;
        }
      }
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
        &.start_text {
          background-color: #50b400;
        }
        &.end_text {
          background-color: #ff6633;
        }
      }
      input {
        outline: none;
        border: none;
      }
      // 起点,终点
      .start,
      .end {
        padding: 10px 0;
        border-bottom: 1px solid #dfdfdf;
      }
      // 按钮
      .search-btn {
        width: 80px;
        height: 28px;
        margin-top: 15px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        border: none;
        border-radius: 5px;
        background-color: #5eba14;
        cursor: pointer;
      }
    }
    .show_container {
      width: 360px;
      height: 360px;
      margin-top: 10px;
      background-color: #fff;
      > ul {
        float: left;
        li {
          width: 60px;
          height: 60px;
          padding-top: 8px;
          border-bottom: 1px solid #e8e8e8;
          border-right: 1px solid #e8e8e8;
          border-left: 2px solid #fff;
          text-align: center;
          color: #666;
          font-size: 12px;
          cursor: pointer;
          i {
            display: inline-block;
            width: 25px;
            height: 25px;
            background: url(../../static/hotel/near_icon3.png) no-repeat 0 0;
          }
          &:nth-child(1) i {
            background: url(../../static/hotel/nav_icon.png) no-repeat;
          }
          &:nth-child(2) i {
            background-position: 0 -30px;
          }
          &:nth-child(3) i {
            background-position: -60px -30px;
          }
          &:nth-child(4) i {
            background-position: -92px -30px;
          }
        }
      }
      // 导航显示的样式
      .omnirange {
        float: left;
        li {
          float: left;
          width: 60px;
          font-size: 14px;
          padding: 10px 0 5px;
          margin: 0 20px;
          text-align: center;
          cursor: pointer;
        }
        #car_panel,
        #bus_panel,
        #walk_panel {
          width: 300px;
          height: 300px;
          overflow: auto;
        }
        // 修改导航的样式
        /deep/.amap-call {
          color: blue;
          background-color: #fff !important;
        }
        /deep/.amap-lib-driving {
          border: none !important;
        }
      }
      // 附近交通的样式
      .nearby_traffic {
        float: left;
      }
      #traffic_panel,
      #cate_panel,
      #scenery_panel {
        width: 300px;
        height: 360px;
        overflow: auto;
        /deep/.amap_lib_placeSearch {
          border: none;
        }
      }

      // tab栏切换的样式
      .active {
        border-left: 2px solid #50b400;
      }
      .omnirange_active {
        border-bottom: 2px solid #50b400;
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