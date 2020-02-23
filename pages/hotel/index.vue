<template>
  <div>
    <el-row type="flex" class="herder">
      <Search @searchCity="searchCity" />
      <Area @cityID="gethotel" :hotelList="hotelList" />
      <HotelSearch :data="data" />
      <Hotels :cityHoutesList="cityHoutesList" />
      <!-- 分页 -->
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        prev-text="<上一页"
        next-text="下一页>"
        @prev-click="shang"
        @next-click="xia"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import Search from "../../components/hotel/search";
import Area from "../../components/hotel/area";
import HotelSearch from "../../components/hotel/hotelSearch";
import Hotels from "../../components/hotel/hotels";

export default {
  components: {
    Search,
    Area,
    HotelSearch,
    Hotels
  },
  data() {
    return {
      data: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      },
      //获取到当前城市酒店与条数
      cityHoutesList: [],
      total: 50,
      cityId: 0,
      nextStart: null,
      //每次返回条数
      tiao: 10,
      //搜索城市的id
      sousuoCityId: 0,
      // 坐标
      zuobiao: [],
      // 酒店列表
      hotelList: []
    };
  },
  mounted() {
    //请求筛选数组
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      this.data.levels = res.data.data.levels;
      this.data.types = res.data.data.types;
      this.data.assets = res.data.data.assets;
      this.data.brands = res.data.data.brands;
    });
  },
  methods: {
    gethotel(cityID) {
      this.cityId = cityID;

      //请求城市列表
      this.getCity(this.cityId);
    },

    getCity(value) {
      this.$axios({
        url: "/hotels",
        params: {
          city: value
        }
      }).then(res => {
        this.cityHoutesList = res.data;
        console.log(this.cityHoutesList);
        this.hotelList = res.data.data;

        this.cityHoutesList.data.forEach(e => {
          this.zuobiao.push(e.location);
        });
        this.total = this.cityHoutesList.total;
        this.nextStart = res.data.nextStart;
      });
    },
    searchCity(value) {
      this.$router.push({ name: "hotel", query: { cityName: value.value } });
      this.$store.commit("houtel/setCityjingdian", value.scenics);
      console.log(value);
      this.getCity(value.id);
      this.sousuoCityId = value.id;
    },

    //每次点击上下页触发

    shang(value) {
      if (this.sousuoCityId === 0) {
        this.$axios({
          url: "/hotels",
          params: {
            city: this.cityId,
            // _limit: this.tiao,
            // ,控制下次返回的条数 如果返回5条 就显示5条
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
        });
      } else {
        this.$axios({
          url: "/hotels",
          params: {
            city: this.sousuoCityId,
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
        });
      }
    },
    xia(value) {
      if (this.sousuoCityId == 0) {
        this.$axios({
          url: "/hotels",
          params: {
            city: this.cityId,
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
        });
      } else {
        this.$axios({
          url: "/hotels",
          params: {
            city: this.sousuoCityId,
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.herder {
  width: 1000px;
  margin: 0 auto;
  flex-wrap: wrap;
}
</style>
