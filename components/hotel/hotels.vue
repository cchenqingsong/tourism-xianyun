<template>
  <el-row class="div">
    <el-row
      type=" flex"
      class="herder "
      v-for="(item, index) in cityHoutesList.data"
      :key="index"
    >
      <el-col :span="8" class="el-1">
        <nuxt-link
          :to="{ path: '/hotel/hotelDetail', query: { city: item.id } }"
        >
          <img :src="item.photos" alt=""
        /></nuxt-link>
      </el-col>
      <el-col :span="10" class="el-2">
        <nuxt-link
          :to="{ path: '/hotel/hotelDetail', query: { city: item.id } }"
        >
          <h4>{{ item.name }}</h4></nuxt-link
        >
        <span class="el-5">{{ item.alias }}</span>
        <el-row type="flex" class="el-3">
          <el-col :span="10">
            <el-rate
              v-model="item.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            >
              >
            </el-rate>
          </el-col>
          <el-col :span="7" style="padding:0 8px ">
            <span style="color: #f90">{{ item.visits_week }}</span
            >评价
          </el-col>
          <el-col :span="7" style="padding:0 8px ">
            <span style="color: #f90">23</span>游记
          </el-col>
        </el-row>
        <div class="el-4">
          <i class="el-icon-location"></i>
          <span>位置：{{ item.address }}</span>
        </div>
      </el-col>

      <el-col :span="6" style="margin-top: 20px;">
        <ul>
          <li v-for="(it, index) in item.products" :key="index" class="lili">
            <span class="name">
              {{ it.name }}
            </span>
            <span class="spsp">￥{{ it.price }} <i class="ii">起</i> </span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
export default {
  props: ["cityHoutesList"],
  data() {
    return {};
  }
};
</script>

<style scoped lang="less">
.div {
  width: 1000px;
  margin: 0 -10px;

  padding: 25px 0px;
  .herder {
    padding-top: 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid #ccc;
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
.lili {
  display: flex;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  position: relative;
  border-radius: 20px;
  &:hover {
    background-color: #f2f4f7;
  }
  .name {
    color: #666;
    padding-left: 40px;
  }
  .spsp {
    position: absolute;
    top: 0;
    right: 0;
    color: #f90;
    padding-right: 30px;
    i {
      color: #666;
    }
  }
}
</style>
