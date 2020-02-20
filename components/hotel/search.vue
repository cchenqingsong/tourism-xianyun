<template>
  <div class="herder">
  <el-row  type="flex" justify="center">
    <!-- 导航 -->
    <el-row  class="row-bg" justify="start" align="middle">
      <el-breadcrumb separator="/" style="    padding: 20px 0;">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>广州市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form ref="form">
        <!-- 目的地 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="目的地"
          @select="handleDepartSelect"
          class="el-autocomplete"
          @blur="moren"
        ></el-autocomplete>

        <!-- 时间选择器 -->

        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          @change="handleDate"
          :disabled="false"
        >
        </el-date-picker>

        <!-- 点击下拉 -->
        <el-input
          placeholder="人数未定"
          suffix-icon="el-icon-user"
          style="width:210px"
          @focus="isshow = !isshow"
          :value="form.zongrenshu"
        >
        </el-input>

        <!-- 查看价格 -->

        <el-button type="primary">查看价格</el-button>
      </el-form>
      <!-- 点击人数框显示 -->
      <el-card class="box-card" v-show="isshow">
        <div slot="header" class="clearfix">
          <span class="meijian">每间</span>
          <el-select 
            placeholder="请选择"
            v-model="form.ruzhurenshu"
            @change="chufa(form.ruzhurenshu)"
            style="width:100px;"
          >
            <el-option
              v-for="item in zhufang"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-select
            placeholder="请选择"
            v-model="form.ertong"
            @change="chufa1(form.ertong)"
            style="width:100px;"
          >
            <el-option
              v-for="item in zhufang"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="queren"
          >确认</el-button
        >
      </el-card>
    </el-row>
</el-row>
</div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      value6: "",
      //住房人数
      zhufang: [1, 2, 3, 4, 5, 6, 7],
      isshow: false,
      form: {
        //目的地
        mudidi: "",
        //选择的日期
        departDate: {
          jindian: "",
          lidian: ""
        },
        //每间入住人数
        ruzhurenshu: "2成人",
        ertong: "0儿童",
        //总人数
        zongrenshu: ""
      }
    };
  },
  methods: {
    // 出发城市下拉选择时
    queryDepartSearch(item) {},
    handleDepartSelect(value, cb) {},
    //失焦触发
    moren() {},
    //选日期
    handleDate(value) {
      this.form.departDate.jindian = moment(value[0]).format("YYYY-MM-DD");
      this.form.departDate.lidian = moment(value[1]).format("YYYY-MM-DD");
    },
    queren() {
      this.isshow = false;
      this.form.zongrenshu = this.form.ruzhurenshu + this.form.ertong;
    },
    chufa(v) {
      this.form.ruzhurenshu = v + "成人";
    },
    chufa1(v) {
      this.form.ertong = v + "儿童";
    }
  }
};
</script>

<style scoped lang="less">
.herder{
     height: 96px;
     flex-direction:column;  
}
  .row-bg {
    width: 1000px;
    height: 60px;
    margin: 0 auto;

  }


.els {
  margin-left: 50px;
}
/deep/.el-dropdown-menu__item {
  margin-bottom: 10px;
}
/deep/.el-autocomplete {
  margin-right: 20px;
}
.meijian {
  margin-right: 49px;
}
.box-card {
  width: 330px;
  height: 130px;
  position: absolute;
  top: 100px;
  right: 90px;
  font-size: 14px;
  z-index:99
}
</style>
