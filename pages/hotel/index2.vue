<template>
  <el-row type="flex" class="herder">
    <el-row type="flex">
      <!-- 导航 -->
      <el-row class="row-bg" justify="start" align="middle">
        <el-breadcrumb separator="/" style="    padding: 20px 0;">
          <el-breadcrumb-item>酒店</el-breadcrumb-item>
          <el-breadcrumb-item>广州市酒店预订</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form">
          <el-autocomplete
            :fetch-suggestions="queryDepartSearch"
            placeholder="目的地"
            @select="handleDepartSelect"
            class="el-autocomplete"
            @blur="moren"
            v-model="mudi"
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
          <!-- </el-form-item>   -->
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
            v-for="(item, index) in jingdian"
            :key="index"
            >{{ item.name }}</nuxt-link
          >
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
 <el-row class="right" id="ditu">
      <p id="info"></p>
    </el-row> -->
  </el-row>
    <el-row class="herder" :gutter="24">
      <el-col :span="6" class="price">
        <el-row type="flex" justify="space-between">
          <span>价格</span>
          <span>0-{{ jindu * 40 }}</span>
        </el-row>
        <el-slider v-model="jindu"> </el-slider>
      </el-col>
      <el-col :span="18" class="four">
        <el-row type="flex" class="ret">
          <el-col :span="6" class="pad">
            <span>住宿等级</span>
            <el-row type="flex" justify="space-between" class="pac">
              <el-dropdown>
                <span class="el-dropdown-link" style="padding-right:70px">
                  不限
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in data.levels"
                    :key="index"
                  >
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                    >
                      <el-checkbox :label="item.name">{{
                        item.name
                      }}</el-checkbox>
                    </el-checkbox-group>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <i class="el-icon-arrow-down "></i>
            </el-row>
          </el-col>
          <el-col :span="6" class="pad">
            <span>酒店类型</span>
            <el-row type="flex" justify="space-between" class="pac">
              <el-dropdown>
                <span class="el-dropdown-link" style=" padding-right:70px;">
                  不限
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in data.types"
                    :key="index"
                  >
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                    >
                      <el-checkbox :label="item.name">{{
                        item.name
                      }}</el-checkbox>
                    </el-checkbox-group>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <i class="el-icon-arrow-down "></i>
            </el-row>
          </el-col>
          <el-col :span="6" class="pad">
            <span>酒店设施</span>
            <el-row type="flex" justify="space-between" class="pac">
              <el-dropdown>
                <span class="el-dropdown-link" style=" padding-right:70px">
                  不限
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in data.assets"
                    :key="index"
                  >
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                    >
                      <el-checkbox :label="item.name">{{
                        item.name
                      }}</el-checkbox>
                    </el-checkbox-group>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <i class="el-icon-arrow-down "></i>
            </el-row>
          </el-col>
          <el-col :span="6" class="pad">
            <span>酒店品牌</span>
            <el-row type="flex" justify="space-between" class="pac">
              <el-dropdown>
                <span class="el-dropdown-link" style="padding-right:70px">
                  {{ moren }}
                </span>

                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in data.brands"
                    :key="index"
                  >
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                      size="medium"
                      indeterminate:true
                    >
                      <el-checkbox fill="#cccccc" :label="item.name">{{
                        item.name
                      }}</el-checkbox>
                    </el-checkbox-group>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <i class="el-icon-arrow-down "></i>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="div">
      <el-row
        type=" flex"
        class="herder "
        v-for="(item, index) in cityHoutesList.data"
        :key="index"
      >
        <el-col :span="8" class="el-1">
          <nuxt-link to="#"> <img :src="item.photos" alt=""/></nuxt-link>
        </el-col>
        <el-col :span="10" class="el-2">
          <h4>{{ item.name }}</h4>
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
    </el-row>  -->
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      value6: "",
      //住房人数
      zhufang: [1, 2, 3, 4, 5, 6, 7],
      isshow: false,
      mudi: "",
      sousuoCity: [],
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
    queryDepartSearch(item, cb) {
      if (!item) {
        this.sousuoCity = [];
        cb([]);
        return;
      }
      this.mudi = item;
      this.$axios({
        url: "/cities",
        params: {
          name: item
        }
      }).then(res => {
        this.sousuoCity = res.data.data;
        const newData = this.sousuoCity.map(v => {
          v.value = v.name;
          return v;
        });

        cb(newData);
      });
    },
    handleDepartSelect(value) {
      console.log(value);

      // this.$emit("searchCity", value);
    },
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
.herder {
  height: 96px;
  flex-direction: column;
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
  z-index: 99;
}
</style>
