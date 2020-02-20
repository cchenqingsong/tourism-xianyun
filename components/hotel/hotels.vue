<template>
  <div class="div">
    <el-row type=" flex" class="herder">
      <el-col :span="8" class="el-1">
        <img
          src="https://p1.meituan.net/hotel/c48d045b9f5bf221c479f55c622c8782154904.jpg%40700w_700h_0e_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20"
          alt=""
        />
      </el-col>
      <el-col :span="10" class="el-2">
        <h4>帝豪酒店</h4>
        <span class="el-5">di hao jiu dian</span>
        <el-row type="flex" class="el-3">
          <el-col :span="10">
            <el-rate
              v-model="value5"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            >
              >
            </el-rate>
          </el-col>
          <el-col :span="7" style="padding:0 8px ">
            <span style="color: #f90">23</span>评价
          </el-col>
          <el-col :span="7" style="padding:0 8px ">
            <span style="color: #f90">23</span>游记
          </el-col>
        </el-row>
        <div class="el-4">
          <i class="el-icon-location"></i>
          <span>位置：剑川路165号(近龙吴路)</span>
        </div>
      </el-col>

      <el-col :span="6" style="margin-top: 20px;">
        <el-table :data="tableData" :show-header="false">
          <el-table-column prop="brand" label="品牌"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //评分
      value5: 3.1,
      tableData: [
        {
          price: "￥110起",
          brand: "携程"
        },

        { price: "￥110起", brand: "飞猪" },

        { price: "￥110起", brand: "艺龙" }
      ]
    };
  }
};
</script>

<style scoped lang="less">
.div {
  width: 1000px;
  // margin: 0 10px;
  margin: 0 -10px;
  height: 215px;
  padding: 25px 0px;
  .herder {
    .el-1 {
      img {
        width: 320px;
        height: 210px;
        padding: 0 10px;
      }
    }
    .el-2 {
      padding: 0 10px;
      h4 {
        font-weight: 400;
        font-size: x-large;
      }
    }
    .el-3 {
      margin: 8px 0;
    }
    .el-4 {
      font-size: 14px;
      color: #666;
    }
    .el-5 {
      color: rgb(170, 165, 165);
    }
  }
}
</style>
