<template>
  <el-row type="flex" class="herder"  style=" margin-top: 20px;">
    <!-- 左边组件 -->
    <el-row class="left">
      <!-- 区域 -->
      <el-row>
        <el-col :span="3">区域：</el-col>
        <el-col :span="21" class="didan">
          <div :class="{ yichu: isShow }">
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
            人民广场城桥镇奉贤区金山区建设镇三星镇新河镇通河/泗塘堡镇绿华镇南门向化镇陈家镇横沙乡博乐广场亭林
          </div>
          <a href="#" @click="isShow = !isShow"
            ><i
              class="el-icon-d-arrow-right"
              style="transform: rotate(90deg)"
            ></i>
            等多个地区</a
          >
        </el-col>
      </el-row>
      <!-- 均价 -->
      <el-row class="huangguan">
        <el-col :span="3">均价<el-badge class="mark" value="?" />:</el-col>
        <el-col :span="21">
          <el-tooltip
            class="item"
            effect="dark"
            content="哈哈哈哈哈哈"
            placement="bottom-start"
          >
            <span
              ><i class="iconfont iconhuangguan"></i
              ><i class="iconfont iconhuangguan"></i
              ><i class="iconfont iconhuangguan"></i>￥332</span
            >
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="哈哈哈哈哈哈"
            placement="bottom-start"
          >
            <span
              ><i class="iconfont iconhuangguan"></i
              ><i class="iconfont iconhuangguan"></i
              ><i class="iconfont iconhuangguan"></i>￥532</span
            >
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="哈哈哈哈哈哈"
            placement="bottom-start"
          >
            <span
              ><i class="iconfont iconhuangguan"></i
              ><i class="iconfont iconhuangguan"></i
              ><i class="iconfont iconhuangguan"></i>￥882</span
            >
          </el-tooltip>
        </el-col>
      </el-row>
    </el-row>

    <!-- 右边组件 -->
    <el-row class="right" id="ditu"> </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    };
  },
  mounted() {
  
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=bbe9a00c0951c9d7a8c5bc3c985f8799&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    this.init();
  },
  methods: {
      init(){
      window.onLoad = function() {
      var map = new AMap.Map("ditu",{
              zoom:11,//级别
      });
      console.log(map);
      
    };
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
</style>
