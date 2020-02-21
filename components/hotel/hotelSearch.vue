<template>
  <!-- 酒店筛选栏 -->
  <div>
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
                  <el-dropdown-item v-for="item in list" :key="item">
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                    >
                      <el-checkbox :label="item">{{ item }}</el-checkbox>
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
                  <el-dropdown-item v-for="item in list" :key="item">
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                    >
                      <el-checkbox :label="item">{{ item }}</el-checkbox>
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
                  <el-dropdown-item v-for="item in list" :key="item">
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                    >
                      <el-checkbox :label="item">{{ item }}</el-checkbox>
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
                  <el-dropdown-item v-for="item in list" :key="item">
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="duoxuan"
                      size="medium"
                      indeterminate:true
                    >
                      <el-checkbox fill="#cccccc" :label="item">{{
                        item
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      jindu: [0, 100],
      list: ["复选框 A", "单选2", "单选3"],
      checkedCities: [],
      moren: "不限"
    };
  },
  methods: {
    duoxuan(value) {
      let length = value.length;
      this.moren = "已选" + length + "项";
    }
  }
};
</script>

<style scoped lang="less">
.herder {
  margin-top: 20px;
  width: 1000px;
  border: 1px solid #ccc;
  font-size: 14px;
  height: 75px;

  align-items: center;
  color: #666;
}
.price {
  padding: 5px 8px;
}

.four {
  .pad {
    padding: 5px 20px;
    border-left: 1px solid #ccc;
  }
  .pac {
    display: block;
    // text-align: center;

    padding-top: 5px;
    height: 38px;
    line-height: 38px;
  }
}
.el-slider {
  padding: 0 10px;
}
/deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266;
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-radius: 10px;
  background-color: rgb(206, 203, 203);
  border-color: #cecbcb;
}
/deep/.el-checkbox__inner {
  border-radius: 10px;
  border-color: #ccc;
}
</style>
