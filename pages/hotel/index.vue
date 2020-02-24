<template>
  <div>
    <el-row type="flex" class="herder">
      <Search @searchCity="searchCity" />
      <Area />
      <!-- @cityID="gethotel" -->
      <HotelSearch :data="data" @getSearchs="getSearchs" />
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
      total1: 50,
      cityId: 0,
      nextStart: null,
      nextStart1: null,
      //每次返回条数
      tiao: 10,
      //搜索城市的id
      sousuoCityId: 0,
      // 坐标
      zuobiao: [],
      //用于筛选的路径
      parameters: "",
      // 酒店列表
      hotelList: []
    };
  },
  mounted() {
    //请求筛选数组
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      // console.log(res);
      this.data.levels = res.data.data.levels;
      this.data.levels.map(v => {
        v.names = "levels";
      });
      this.data.types = res.data.data.types;
      this.data.assets = res.data.data.assets;
      this.data.brands = res.data.data.brands;
    });
    let { city } = this.$route.query;
    this.cityId = city;
    console.log(this.cityId);

    this.$axios({
      url: `/hotels`,
      params: this.$route.query
    }).then(res => {
      this.cityHoutesList = res.data;
      console.log(this.cityHoutesList);
      
      this.cityHoutesList.data.forEach(e => {});
      this.total = this.cityHoutesList.total;
      this.nextStart = res.data.nextStart;
    });
  },

  methods: {
    gethotel(cityID) {
      this.cityId = cityID;
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
          // this.zuobiao.push(e.location);
        });
        this.total = this.cityHoutesList.total;
        this.nextStart = res.data.nextStart;
      });
    },
    searchCity(value) {
      this.$store.commit("houtel/setCityjingdian", value.scenics);
      console.log(value);
      this.getCity(value.id);
      this.sousuoCityId = value.id;
    },

    getSearchs(data) {
      let sss = true;
      let parameter = `city=${this.cityId}`;
      for (let key in data) {
        if (key === "price_lt") {
          parameter += `&${key}=${data[key]}`;
        } else if (data[key].length !== 0) {
          data[key].forEach(v => {
            parameter += `&${key}=${v}`;
          });
        }
      }
      this.$axios({
        url: `/hotels?${parameter}`
      }).then(res => {
        this.cityHoutesList = [];
        this.cityHoutesList = res.data;
        this.total = this.cityHoutesList.total;
        this.nextStart1 = res.data.nextStart;
        // console.log(this.nextStart1);

        // console.log(this.cityHoutesList);
      });
      //保存用于上下页请求
      this.parameters = parameter;
      return !sss;
    },

    //每次点击上下页触发

    shang(value) {
      // this.cityHoutesList = [];
      if (this.getSearchs() == false) {
        let start1 = this.nextStart1 * value - this.nextStart1;
        this.$axios({
          url: `/hotels?${this.parameters}&_start=${start1}`
        }).then(res => {
          this.cityHoutesList = res.data;
          this.total = this.cityHoutesList.total;
        });
      } else if (this.sousuoCityId === 0) {
        this.$axios({
          url: "/hotels",
          params: {
            city: this.cityId,
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
          this.total = this.cityHoutesList.total;
        });
      } //如果大于零 证明这个是从搜索城市进来的
      else if (this.sousuoCityId > 0 && !this.getSearchs()) {
        this.$axios({
          url: "/hotels",
          params: {
            city: this.sousuoCityId,
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
          this.total = this.cityHoutesList.total;
        });
      } //如果这个返回的是true,那么证明这个函数被执行过 所有要用到的请求数据不同
    },

    xia(value) {
      // this.cityHoutesList = [];
      if (this.getSearchs()) {
        console.log(1);

        let start = this.nextStart1 * value - this.nextStart1;
        this.$axios({
          url: `/hotels?${this.parameters}&_start=${start}`
        }).then(res => {
          this.cityHoutesList = res.data;
          this.total = this.cityHoutesList.total;
        });
      } else if (this.sousuoCityId == 0) {
        console.log(2);

        this.$axios({
          url: "/hotels",
          params: {
            city: this.cityId,
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
          this.total = this.cityHoutesList.total;
        });
      } else {
        console.log(3);
        this.$axios({
          url: "/hotels",
          params: {
            city: this.sousuoCityId,
            _start: this.nextStart * value - this.nextStart
          }
        }).then(res => {
          this.cityHoutesList = res.data;
          this.total = this.cityHoutesList.total;
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
