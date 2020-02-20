<template>
  <div>
    <el-row type="flex" class="herder">
      <Search />
      <Area />
      <HotelSearch />
      <Hotels/>
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
